const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    client: {
      overlay: {
        warnings: false,
      },
    },
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
