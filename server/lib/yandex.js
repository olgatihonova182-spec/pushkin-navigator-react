/* YandexGPT through Yandex AI Studio: one completion that must return JSON.
   The key and the folder id come from .env on the server and never reach the browser. */
const ENDPOINT = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

/* The model answers JSON (jsonObject: true); a stray code fence or text around it is cut off. */
export function parseJson(text) {
  const t = String(text || '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
  try {
    return JSON.parse(t);
  } catch {
    const a = t.indexOf('{');
    const b = t.lastIndexOf('}');
    if (a !== -1 && b > a) return JSON.parse(t.slice(a, b + 1));
    throw new Error('the model did not return JSON');
  }
}

export function makeComplete({ apiKey, folderId, fetchImpl = globalThis.fetch, timeoutMs = 60000 }) {
  return async function complete(messages, { temperature = 0.3, maxTokens = 2000 } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetchImpl(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Api-Key ${apiKey}`, 'x-folder-id': folderId },
        body: JSON.stringify({
          modelUri: `gpt://${folderId}/yandexgpt/latest`,
          completionOptions: { stream: false, temperature, maxTokens: String(maxTokens) },
          messages,
          jsonObject: true,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`YandexGPT answered ${res.status}`);
      const data = await res.json();
      return parseJson(data?.result?.alternatives?.[0]?.message?.text);
    } finally {
      clearTimeout(timer);
    }
  };
}
