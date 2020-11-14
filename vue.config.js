module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/currency-converter/" : "/",
  transpileDependencies: ["vuetify"],
};
