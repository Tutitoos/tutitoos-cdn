import { Router } from "express";

const generalRouter = Router();

generalRouter.get("/", (req, res) => {
  res.render("home", { title: "List of categories", categories: ["flags"] });
});

generalRouter.use("*", (req, res) => {
  res.render("error", {
    title: "Not Found Page",
    code: 404,
    path: req.url,
    message: "This path is no found",
  });
});

export default generalRouter;
