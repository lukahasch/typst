const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    clean: true,
  },
  target: "electron-renderer", // Changed target to web and electron-renderer
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            return `data:application/wasm;base64,${Buffer.from(content).toString("base64")}`;
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm"],
    alias: {
      compiler: path.resolve(__dirname, "compiler/pkg"),
    },
  },
  externals: {
    obsidian: "commonjs2 obsidian",
    electron: "commonjs2 electron",
    "@codemirror/autocomplete": "commonjs2 @codemirror/autocomplete",
    "@codemirror/collab": "commonjs2 @codemirror/collab",
    "@codemirror/commands": "commonjs2 @codemirror/commands",
    "@codemirror/language": "commonjs2 @codemirror/language",
    "@codemirror/lint": "commonjs2 @codemirror/lint",
    "@codemirror/search": "commonjs2 @codemirror/search",
    "@codemirror/state": "commonjs2 @codemirror/state",
    "@codemirror/view": "commonjs2 @codemirror/view",
    "@lezer/common": "commonjs2 @lezer/common",
    "@lezer/highlight": "commonjs2 @lezer/highlight",
    "@lezer/lr": "commonjs2 @lezer/lr",
  },
  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
};
