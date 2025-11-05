const path = require('path');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: false // Disable code splitting
  }
};
