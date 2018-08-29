/* eslint-env node */

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(process.cwd(), 'src/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'static'),
    filename: 'app.js'
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'static'),
    watchContentBase: true,
    host: '0.0.0.0',
    port: 3000
  }
};
