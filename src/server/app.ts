import { generalError } from "./middlewares/errors.js";
import flagsRouter from "./routers/flagsRouter.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());

app.use("/cdn/flags", flagsRouter);
app.use("*", (req, res) => {
  res.status(307).redirect("/cdn/flags");
});

app.use(generalError);

export default app;
