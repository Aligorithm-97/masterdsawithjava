export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export type ApiFetchOptions = RequestInit & {
  json?: unknown;
};

export async function apiFetch(
  inputPath: string,
  options: ApiFetchOptions = {}
) {
  const url = `${API_BASE_URL}${inputPath}`;
  const { json, headers, ...rest } = options;
  const init: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...rest,
  };
  if (json !== undefined) {
    init.body = JSON.stringify(json);
    init.method = init.method || "POST";
  }
  const response = await fetch(url, init);
  return response;
}
