const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "create",
                },
              ],
            ],
          },
        },
      },
      // {
      //   test: /\.view$/,
      //   use: {
      //     loader: require.resolve('./loader.js'),
      //   },
      // },
      // {
      //   test: /\.css$/,
      //   use: {
      //     loader: require.resolve('./css-loader.js'),
      //   },
      // },
    ],
  },
  devServer: {
    port: 8000,
    compress: true,
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
};
