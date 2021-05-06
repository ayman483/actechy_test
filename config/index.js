require("dotenv").config();
(() => {
  const { NODE_ENV } = process.env;
  switch (NODE_ENV) {
    case "production":
      process.env = { ...process.env, ...require("./production") };
      break;

    case "development":
      process.env = { ...process.env, ...require("./development") };
      break;

    case "testing":
      process.env = { ...process.env, ...require("./testing") };
      break;
  }
})();
