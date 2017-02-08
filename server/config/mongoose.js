var mongoose = require('mongoose');
var log      = require('./log')(module);

// mongoose.connect('mongodb://moddi3:vittmasterkey@ds017070.mlab.com:17070/vitt');
mongoose.connect('mongodb://localhost/vitt');

var db = mongoose.connection;

db.on('error', function(err) {
  log.error('connection error:', err.message);
});
db.once('open', function callback() {
  log.info("Connected to DB!");
});

var Schema = mongoose.Schema;


var TodoSchema = new Schema({
  content:  { type: String, default:  '', required: true, trim: true},
  state:    { type: Boolean, default: false },
  modified: { type: Date, default:    Date.now }
},{ versionKey: false});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports.Todo = Todo;
