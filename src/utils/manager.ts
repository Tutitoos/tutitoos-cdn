import Logger from "../lib/Logger.js";
import BufferManager from "../lib/managers/BufferManager.js";
import CdnManager from "../lib/managers/CdnManager.js";
import CountryManager from "../lib/managers/CountryManager.js";
import FetchManager from "../lib/managers/FetchManager.js";
import FileManager from "../lib/managers/FileManager.js";
import type { CdnFormats } from "../types/cdnTypes.js";

interface ManagerProps {
  format: CdnFormats;
}

const sleep = async (ms = 10) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const clearCharacters = (word: string): string => {
  word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  word = word.replace(/[^\w\s]/gi, "");
  word = word.replace(/\s+/g, "-").toLowerCase();

  return word;
};

const manager = async ({ format }: ManagerProps) => {
  const countries = CountryManager.getAll();
  const cdns = CdnManager.getAll(format);

  FileManager.createDir("./public/flags/");

  countries.forEach(async (country) => {
    FileManager.createDir(`./public/flags/${clearCharacters(country.origin)}`);

    country.codes.forEach(async (countryCode) => {
      const fileExist = FileManager.checkExist(`./public/flags/${clearCharacters(country.origin)}/${countryCode}.${format}`);
      if (fileExist) return;

      cdns.forEach(async (cdn) => {
        const response = await FetchManager.get(cdn.urlWithCode(countryCode), {}, "arrayBuffer");
        if (!response) return;

        const bufferData = BufferManager.convertToBase64(response as string);
        if (!bufferData) return;

        const fileData = FileManager.createFile(
          `./public/flags/${clearCharacters(country.origin)}`,
          `${countryCode}.${format}`,
          bufferData
        );
        if (!fileData) return;

        Logger.info(`The flag (${countryCode}) of the country (${country.origin}) has been added from the cdn (${cdn.name}).`);
      });
      await sleep(1000);
    });

    await sleep(1000);
  });
};

export default manager;
