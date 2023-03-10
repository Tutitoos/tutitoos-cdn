import fs from "fs";
import path from "path";
import url from "url";

class FileManager {
  __filename = url.fileURLToPath(import.meta.url);
  __dirname = path.dirname(this.__filename);
  __dirPublic = path.join(this.__dirname, "../../../public");
  __dirCdn = path.join(this.__dirname, "../../../public/cdn");
  __dirViews = path.join(this.__dirname, "../../../views");

  checkExist(dirPath: string): boolean {
    return fs.existsSync(dirPath);
  }

  createDir(dirPath: string): void {
    if (!this.checkExist(dirPath)) {
      try {
        fs.mkdirSync(dirPath);
      } catch (error: unknown) {
        console.error("[FileManager]: Could not create directory", (error as Error).message);
      }
    }
  }

  createFile(dirPath: string, fileName: string, data: Buffer): Buffer | undefined {
    try {
      const newPath = `${dirPath}/${fileName}`;

      this.createDir(dirPath);

      if (this.checkExist(newPath)) {
        return this.getFile(newPath);
      }

      fs.writeFileSync(newPath, data);

      return data;
    } catch (error: unknown) {
      console.error("[FileManager]: Error create file", (error as Error).message);

      return undefined;
    }
  }

  getFile(dirPath: string): Buffer | undefined {
    try {
      return fs.readFileSync(dirPath);
    } catch (error: unknown) {
      console.error("[FileManager]: Error get file", (error as Error).message);

      return undefined;
    }
  }
}

export default new FileManager();
