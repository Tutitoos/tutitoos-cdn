import FileManager from "../lib/managers/FileManager.js";
import routes from "../utils/routes.js";
import { generalError } from "./middlewares/errors.js";
import flagRouter from "./routers/flagRouter.js";
import flagsRouter from "./routers/flagsRouter.js";
import generalRouter from "./routers/generalRouter.js";
import express from "express";
import hbs from "express-handlebars";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(FileManager.__dirPublic));

app.engine(
  ".hbs",
  hbs.create({
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");
app.set("views", FileManager.__dirViews);

app.use(routes.flag.root, flagRouter);
app.use(routes.flags.root, flagsRouter);
app.use(routes.general.root, generalRouter);

app.use(generalError);

export default app;
