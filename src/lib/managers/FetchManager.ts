import type { ResponseType } from "../../types/fetchTypes";

class FetchManager {
  async get(url: string, options: RequestInit, responseType: ResponseType) {
    return this.customFetch(url, { ...options, method: "GET" }, responseType);
  }

  async post(url: string, options: RequestInit, responseType: ResponseType) {
    return this.customFetch(url, { ...options, method: "POST" }, responseType);
  }

  async customFetch(url: string, options: RequestInit, responseType: ResponseType) {
    try {
      const response = await fetch(url, options);

      const responseData = (await response[responseType ?? "arrayBuffer"]()) as
        | ArrayBuffer
        | Blob
        | FormData
        | string
        | undefined;

      return responseData;
    } catch (error: unknown) {
      console.error("[FetchManager]: Error fetch", (error as Error).message);

      return undefined;
    }
  }
}

export default new FetchManager();
