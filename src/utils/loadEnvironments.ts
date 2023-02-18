import type { Environments } from "../types/environmentsTypes";
import dotenv from "dotenv";
dotenv.config();

const { PORT: port } = process.env;

const environments: Environments = {
  port: +port! || 3002,
};

export default environments;
