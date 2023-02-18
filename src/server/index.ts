import app from "./app.js";

import Logger from "../lib/Logger.js";

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      Logger.info(`Listening http://localhost:${port}`);

      resolve(server);
    });

    server.on("error", (error: Error) => {
      if (error.message.includes("EADDRINUSE")) {
        Logger.error(`There was an error in server, port ${port} is already in use`);
        return;
      }

      Logger.error(`There was an error in server ${error.message}`);

      reject(error);
    });
  });

export default startServer;
