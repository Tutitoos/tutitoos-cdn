import { Router } from "express";
import fs from "fs";
import path from "path";
import url from "url";

const flagsRouter = Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dir = path.join(__dirname, "../../../public");

const getDirData = (dirPath?: string) =>
  fs.readdirSync(`public/flags/${dirPath ?? ""}`).map((data) => ({
    name: data,
    path: dirPath ? `cdn/flags/${dirPath}/${data}` : `cdn/flags/${data}`,
  }));

const createList = (dataList: Array<{ name: string; path: string }>) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDN Country Flags</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

  <style>
    * {
      box-sizing: border-box;
    }


    html,
    body {
      margin: 15px;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #1d2021;
    }

    h1 {
      color: #fff;
      font-size: 27px;
      text-align: center;
    }

    ul {
      list-style: none;
    }

    ul,
    li,
    a {
      margin: 0;
      padding: 0;
      text-decoration: none;
    }

    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
    }

    a {
      color: #fff;
      font-size: 14px;
    }

    @media (max-width: 1000px) {
      ul {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      h1 {
        font-size: 20px;
      }

      ul {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 500px) {
      ul {
        grid-template-columns: 1fr;
      }
    }

  </style>
</head>

<body>
  <div id="root">
    <h1>Available countries</h1>
    <ul>${dataList.map((data) => `<li><a href="/${data.path}">${data.name}</a></li>`).join("")}</ul>
  </div>
</body>

</html>`;

flagsRouter.get("/", (req, res) => {
  try {
    const dirData = getDirData();
    const list = createList(dirData);

    res.set("Content-Type", "text/html").status(200).send(list);
    return;
  } catch (error: unknown) {
    const { message } = error as Error;

    if (message.includes("no such file or directory")) {
      return res.status(404).send(`
      <h1>Not Found - La carpeta o archivo no ha sido encontrado</h1>
      <a href="/cdn">Volver</a>
      `);
    }

    return res.status(500).send("Internal error");
  }
});

flagsRouter.get("/:dirPath", (req, res) => {
  const { dirPath } = req.params;
  try {
    const dirData = getDirData(dirPath);
    const listData = createList(dirData);

    return res.status(200).send(listData);
  } catch (error: unknown) {
    const { message } = error as Error;

    if (message.includes("no such file or directory")) {
      return res.status(404).send(`
      <h1>Not Found - La carpeta o archivo no ha sido encontrado</h1>
      <a href="/cdn">Volver</a>
      `);
    }

    return res.status(500).send("Internal error");
  }
});

flagsRouter.get("/:dirPath/:filePath", (req, res) => {
  const { dirPath, filePath } = req.params;

  try {
    res.status(200).sendFile(`${__dir}/flags/${dirPath}/${filePath}`);
    return;
  } catch (error: unknown) {
    const { message } = error as Error;

    if (message.includes("no such file or directory")) {
      return res.status(404).send(`
      <h1>Not Found - La carpeta o archivo no ha sido encontrado</h1>
      <a href="/cdn">Volver</a>
      `);
    }

    return res.status(500).send("Internal error");
  }
});

export default flagsRouter;
