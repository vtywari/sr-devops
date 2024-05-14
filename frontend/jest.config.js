module.exports = {
  transformIgnorePatterns: ["node_modules/(?!@babel/)"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
