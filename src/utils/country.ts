import fs from "fs";

export const getCountryDirs = () =>
  fs.readdirSync("public/cdn/flags").map((data) => ({
    name: data,
    path: `flags/${data}`,
  }));

export const getCountryFiles = (dirPath: string) =>
  fs.readdirSync(`public/cdn/flags/${dirPath}`).map((data) => {
    const [name, format] = data.split(".");

    return {
      name,
      format,
      path: `cdn/flags/${dirPath}/${data}`,
    };
  });
