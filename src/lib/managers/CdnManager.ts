import cdnsJson from "../../data/cdns.json" assert { type: "json" };
import type { Cdn, CdnFormats, Cdns } from "../../types/cdnTypes";

const cdnsList = cdnsJson as Cdns;

class CdnManager {
  getAll(format: CdnFormats): Cdns {
    return cdnsList.filter((data) => data.formats.includes(format)).map((data) => this.get(data.name, format)) as Cdns;
  }

  get(cdn: string, format: CdnFormats): Cdn | undefined {
    const cdnData = cdnsList.find((data) => data.name === cdn || data.url.includes(cdn));
    if (!cdnData) return undefined;

    const formatData = cdnData.formats.includes(format) ? format : cdnData.formats[0];

    return {
      ...cdnData,
      urlWithCode: (language: string): string => `${cdnData.url}/${language}.${formatData}`,
    };
  }
}

export default new CdnManager();
