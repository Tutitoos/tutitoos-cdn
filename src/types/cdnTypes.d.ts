export type CdnFormats = "png" | "svg" | "webp" | "jpg" | "jpeg";
export type Cdns = Cdn[];

export interface Cdn {
  name: string;
  url: string;
  urlWithCode: (language: string) => string;
  formats: CdnFormats[];
}
