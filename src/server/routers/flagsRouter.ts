import { getCountryDirs, getCountryFiles } from "../../utils/country.js";
import routes from "../../utils/routes.js";
import { Router } from "express";

const flagsRouter = Router();

flagsRouter.get(routes.flags.countries, (req, res) => {
  res.render("countries", {
    countries: getCountryDirs(),
  });
});

flagsRouter.get(routes.flags.country, (req, res) => {
  const { dirPath } = req.params;

  res.render("flags", { countryName: dirPath, flags: getCountryFiles(dirPath) });
});

export default flagsRouter;
