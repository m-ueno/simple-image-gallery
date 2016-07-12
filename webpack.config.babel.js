import path from 'path';
import webpack from 'webpack';

const js = {
  plugins: [
    new webpack.EnvironmentPlugin([
      'IMAGE_API_HOST',     // example: http://example.com:4567
    ]),
  ],
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '', // 間違えやすい。webpack-dev-server --content-baseで指定するので、ここでは変えない
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.jsx$/,
        // include: path.resolve('src'),
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};

export default js;
