import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';

import log from 'winston';
import logger from 'morgan'; // http requests

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.babel';

import main from './routes/app';
import api from './routes/api';

const compiler = webpack(config);
const app = express();
const port = process.env.PORT || 3000;

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
app.use(methodOverride());

app.use(logger('dev'));

app.use('/', main);
app.use('/api', api);

app.use((req, res) => {
  res.status(404);
  log.debug('Not found URL: %s', req.url);
  res.send({ error: 'Not found' });
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  res.send({ error: err.message });
});

app.listen(port, (err) => {
  if (err) log.error(err);
  else log.info(`==> 🌎  Magic happens on port ${port}`);
});
