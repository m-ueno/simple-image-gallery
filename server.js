const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const debug = true;

// ES2015で書かれたwebpack.configを読み込むためにbabel-nodeを入れる
// memo: babel-register
import webpackConfig from './webpack.config.babel.js';

if (debug) {

  // THIS MIDDLEWARE SHOULD ONLY USED FOR DEVELOPMENT!
  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: path.resolve(webpackConfig.output.publicPath)
  }));

}

// コンテンツ配信＋α
// GET /public/.../list.json が来たら、そのディレクトリの中身をjson配列で返す

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const baseDir = './public/images';
const baseUrl = '/public/images';

// GET /public/images <= ./public/images
app.use('/public', express.static(__dirname + '/public'));

app.use('/assets', express.static(__dirname + '/assets'));

// GET / <= ./index.html
app.use(/^\/$/, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// @return false if the filename is broken
function canRead (file) {
  try {
    fs.statSync(file);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

function listDirSync(dir) {
  const items = fs.readdirSync(dir);
  return items.map((f) => {
    const localPath = [dir, f].join('/');
    const relPath = localPath.replace(baseDir, '');
    let type;
    let count;

    if (!canRead(localPath)) {
      return null;
    }

    if (fs.statSync(localPath).isDirectory()) {
      type = 'd';
      count = fs.readdirSync(localPath).length;
    } else {
      type = 'f';
    }

    return {
      id: relPath,
      mtime: fs.statSync([dir, f].join('/')).mtime,
      relPath: relPath,
      count: count,
      type: type,
    }
  }).filter(e => e);
}

function listHandler (req, res) {
  const relPath = decodeURI(req.path).replace(baseUrl, '').replace('/list.json', '');

  // relPathが/で始まるので、/ はちょうど1つ
  const targetDir = baseDir + relPath;

  const listResult = listDirSync(targetDir);

  res.send(listResult);
}

app.get(/\/list.json$/, listHandler);

const port = 9292;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

