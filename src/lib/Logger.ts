import "../utils/loadEnvironments.js";

import chalk from "chalk";
import debugCreator from "debug";

class Logger {
  private readonly debug = debugCreator("system:server");

  info(message: string) {
    this.debug(chalk.blueBright(message));
  }

  error(message: string) {
    this.debug(chalk.redBright(message));
  }
}

export default new Logger();
