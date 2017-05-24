import mongoose from 'mongoose';
import log from 'winston';

// mongoose.connect('mongodb://moddi3:vittmasterkey@ds017070.mlab.com:17070/vitt');
mongoose.connect('mongodb://localhost/vitt');

const db = mongoose.connection;

db.on('error', (err) => {
  log.error('connection error:', err.message);
});
db.once('open', () => {
  log.info('Connected to DB!');
});

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: { type: String, default: '', required: true, trim: true },
  state: { type: Boolean, default: false },
  modified: { type: Date, default: Date.now },
}, { versionKey: false });

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
