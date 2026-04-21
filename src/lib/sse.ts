export function parseSSE(text: string): string {
  const chunks: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const obj = JSON.parse(payload);
      if (typeof obj === "string") chunks.push(obj);
      else if (typeof obj?.content === "string") chunks.push(obj.content);
      else if (typeof obj?.delta === "string") chunks.push(obj.delta);
      else if (typeof obj?.text === "string") chunks.push(obj.text);
      else if (typeof obj?.response === "string") chunks.push(obj.response);
    } catch {
      chunks.push(payload);
    }
  }
  const joined = chunks.join("");
  // Normalize multiple spaces that can appear from token boundaries
  return joined.replace(/  +/g, " ").trim();
}
