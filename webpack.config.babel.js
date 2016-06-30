import path from 'path';
// import webpack from 'webpack';

const js = {
  entry: './src/index.jsx',
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve('src'),
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
        include: path.resolve('src'),
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};

export default js;
