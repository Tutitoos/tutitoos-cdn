import FileManager from "../../lib/managers/FileManager.js";
import routes from "../../utils/routes.js";
import { Router } from "express";

const flagsRouter = Router();

flagsRouter.get(routes.flag.flag, (req, res) => {
  const { dirPath, filePath } = req.params;

  res.status(200).sendFile(`${FileManager.__dirCdn}/flags/${dirPath}/${filePath}`);
});

export default flagsRouter;
