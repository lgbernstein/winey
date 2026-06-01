import { readFile } from "node:fs/promises";

const defaultModel = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

function parseJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("The label scan did not return bottle details.");
  return JSON.parse(match[0]);
}

function clean(value, max = 180) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function scanBottleLabel({
  filePath,
  mediaType,
  apiKey = process.env.ANTHROPIC_API_KEY_WINEY || process.env.ANTHROPIC_API_KEY,
  model = defaultModel
}) {
  if (!apiKey) {
    throw new Error("Label scanning needs ANTHROPIC_API_KEY_WINEY or ANTHROPIC_API_KEY on the server.");
  }

  const image = await readFile(filePath);
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      temperature: 0,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: image.toString("base64")
            }
          },
          {
            type: "text",
            text: `Read this wine bottle label for a blind tasting check-in.
Return only JSON with these keys:
{"bottleName":"","producer":"","grape":"","region":"","vintage":"","confidence":"low|medium|high","notes":""}
Use only details visible on the label or obvious from the printed wine name. Leave uncertain string fields blank. Do not invent a grape when the label does not identify it. Keep notes short and mention uncertainty useful to the host.`
          }
        ]
      }]
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error?.message || "Label scan request failed.");
  }

  const text = payload.content?.filter((part) => part.type === "text").map((part) => part.text).join("\n") || "";
  const result = parseJson(text);
  return {
    bottleName: clean(result.bottleName),
    producer: clean(result.producer),
    grape: clean(result.grape),
    region: clean(result.region),
    vintage: clean(result.vintage, 20),
    confidence: ["low", "medium", "high"].includes(result.confidence) ? result.confidence : "low",
    notes: clean(result.notes, 320)
  };
}
