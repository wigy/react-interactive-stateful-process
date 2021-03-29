const path = require("path");

module.exports = {
  // Source files
  src: path.resolve(__dirname, "../sample"),

  // Production build files
  build: path.resolve(__dirname, "../sample-dist"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, "../sample/public"),
};