const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public_client','dist'),
    filename: 'main.js',
  },
  mode: 'production'
};