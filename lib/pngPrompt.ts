/**
 * Parse PNG file metadata (tEXt / iTXt chunks) to extract prompt and negative prompt.
 * Supports Stable Diffusion WebUI (A1111) "parameters" tEXt chunk and separate Prompt/Negative prompt keys.
 */

const PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function isPng(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < PNG_SIGNATURE.length) return false;
  const view = new Uint8Array(buffer, 0, PNG_SIGNATURE.length);
  return PNG_SIGNATURE.every((b, i) => view[i] === b);
}

/** Read big-endian uint32 at offset */
function readU32(buffer: ArrayBuffer, offset: number): number {
  const view = new DataView(buffer);
  return view.getUint32(offset, false);
}

/** Decode Latin-1 bytes to string */
function latin1Decode(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
}

/** Parse tEXt chunk: keyword (null-term) + value */
function parseTextChunk(data: Uint8Array): { key: string; value: string } | null {
  const nullIdx = data.indexOf(0);
  if (nullIdx < 0) return null;
  const key = latin1Decode(data.subarray(0, nullIdx)).trim();
  const value = latin1Decode(data.subarray(nullIdx + 1)).trim();
  return key ? { key, value } : null;
}

/** Parse iTXt: keyword, null, compression(1), method(1), lang(null-term), trans_keyword(null-term), text */
function parseITxtChunk(data: Uint8Array): { key: string; value: string } | null {
  const null1 = data.indexOf(0);
  if (null1 < 0) return null;
  const key = latin1Decode(data.subarray(0, null1)).trim();
  if (!key) return null;
  const compressed = data[null1 + 1] !== 0;
  if (compressed) return null; // skip compressed iTXt for simplicity
  let off = null1 + 3; // compression + method
  const null2 = data.indexOf(0, off);
  if (null2 < 0) off = data.length;
  else off = null2 + 1;
  const null3 = data.indexOf(0, off);
  if (null3 < 0) {
    return { key, value: latin1Decode(data.subarray(off)).trim() };
  }
  return { key, value: latin1Decode(data.subarray(off, null3)).trim() };
}

export interface PngPromptResult {
  prompt: string;
  negativePrompt: string;
}

/**
 * Parse PNG buffer and extract prompt / negative prompt from metadata.
 * - Looks for tEXt/iTXt with key "parameters" (A1111 style: "prompt\nNegative prompt: neg\nSteps:...")
 * - Or separate keys "Prompt" / "Negative prompt" (or "parameters" split by "Negative prompt:")
 */
export function parsePngPrompt(buffer: ArrayBuffer): PngPromptResult | null {
  if (!isPng(buffer)) return null;

  let offset = PNG_SIGNATURE.length;
  let parameters: string | null = null;
  let promptOnly: string | null = null;
  let negativeOnly: string | null = null;

  while (offset + 12 <= buffer.byteLength) {
    const length = readU32(buffer, offset);
    const type = latin1Decode(new Uint8Array(buffer, offset + 4, 4));
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd > buffer.byteLength) break;

    const data = new Uint8Array(buffer, dataStart, length);

    if (type === "tEXt") {
      const parsed = parseTextChunk(data);
      if (parsed) {
        if (parsed.key === "parameters") parameters = parsed.value;
        else if (parsed.key.toLowerCase() === "prompt") promptOnly = parsed.value;
        else if (
          parsed.key.toLowerCase() === "negative prompt" ||
          parsed.key.toLowerCase() === "negative_prompt" ||
          parsed.key === "Negative prompt"
        )
          negativeOnly = parsed.value;
      }
    } else if (type === "iTXt") {
      const parsed = parseITxtChunk(data);
      if (parsed) {
        if (parsed.key === "parameters") parameters = parsed.value;
        else if (parsed.key.toLowerCase() === "prompt") promptOnly = parsed.value;
        else if (
          parsed.key.toLowerCase() === "negative prompt" ||
          parsed.key.toLowerCase() === "negative_prompt" ||
          parsed.key === "Negative prompt"
        )
          negativeOnly = parsed.value;
      }
    }

    offset = dataEnd + 4; // skip CRC
  }

  // Prefer separate Prompt / Negative prompt keys
  if (promptOnly != null || negativeOnly != null) {
    return {
      prompt: promptOnly ?? "",
      negativePrompt: negativeOnly ?? "",
    };
  }

  // Else parse "parameters" (A1111: "prompt\nNegative prompt: neg\nSteps: ...")
  if (parameters == null || parameters === "") return null;

  const normalized = parameters.replace(/\r\n/g, "\n");
  const markers = [
    "\nNegative prompt:",
    "\nNegative Prompt:",
    "\nnegative prompt:",
    "\r\nNegative prompt:",
    "Negative prompt:",
    "negative prompt:",
  ];
  let negMarker: string | null = null;
  let idx = -1;
  for (const m of markers) {
    const i = normalized.indexOf(m);
    if (i >= 0) {
      negMarker = m;
      idx = i;
      break;
    }
  }
  if (negMarker != null && idx >= 0) {
    const prompt = normalized.slice(0, idx).trim();
    let after = normalized.slice(idx + negMarker.length).trimStart();
    const paramLine = /^(Steps|Sampler|Size|Model|CFG scale|Seed|Clip skip|Denoising|ENSD|Hires|Batch|Face restoration)/i;
    const lines = after.split("\n");
    const negativeLines: string[] = [];
    for (const line of lines) {
      if (paramLine.test(line.trim())) break;
      negativeLines.push(line);
    }
    let negativePrompt = negativeLines.join("\n").trim();
    const stepsMatch = negativePrompt.match(/,?\s*Steps:\s*\d/i);
    if (stepsMatch && stepsMatch.index != null) {
      negativePrompt = negativePrompt.slice(0, stepsMatch.index).trim();
    }
    return { prompt, negativePrompt };
  }

  return { prompt: normalized, negativePrompt: "" };
}
