const client = {
  enviroment: process.env.enviroment as
    | "DEVELOPMENT"
    | "PRODUCTION"
    | "TESTING",

  organizationId: "nutrillacta",
  celular: process.env.celular,
  llampukaq:
    process.env.enviroment == "DEVELOPMENT"
      ? "https://devapi.llampukaq.com"
      : "https://api.llampukaq.com",
  llampukaqPro: "https://api.llampukaq.com",
};

export default client;
