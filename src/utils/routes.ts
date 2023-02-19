const routes = {
  general: {
    root: "/",
    categories: "/",
    all: "*",
  },
  flags: {
    root: "/flags",
    countries: "/",
    country: "/:dirPath",
  },
  flag: {
    root: "/cdn/flag",
    flag: "/:dirPath/:filePath",
  },
};

export default routes;
