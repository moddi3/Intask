var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app  = express();
var port = process.env.PORT || 3000;
// loggers
var logger     = require('morgan');
var log        = require('./config/log')(module);
// webpack config
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require ('../webpack.config');

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler));

// routes

var main = require('./routes/app');
var api  = require('./routes/api');

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(methodOverride());

app.use(logger('dev'));

app.use('/', main);
app.use('/api', api);
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// });

// handling errors
app.use(function(req, res){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(port, function(err) {
  if (err) console.error(err);
  else log.info('==> 🌎  Magic happens on port ' + port);
});
