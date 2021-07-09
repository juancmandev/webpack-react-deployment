const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = requiere("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { cleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
    }),
    new cleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
