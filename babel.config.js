module.exports = function(api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".jsx", ".android.js", ".ios.js", ".web.js"],
        },
      ],
    ],
  };
};
