const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!index.html'],
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  /* devtool: 'inline-source-map', */
  entry: {
    polyfill: 'babel-polyfill',
    main: './src/app.js',
  },
  output: {
    filename: '[name].bundle.main.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
