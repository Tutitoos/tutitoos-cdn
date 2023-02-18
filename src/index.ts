import environments from "./utils/loadEnvironments.js";

import startServer from "./server/index.js";
import manager from "./utils/manager.js";

const { port } = environments;

(async () => {
  await startServer(port);
  manager({
    format: "png",
  }).catch((error: unknown) => {
    console.error("Error with start manager", (error as Error).message);
  });
})();
