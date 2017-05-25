import mongoose from '../config/mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: { type: String, required: true, trim: true },
  state: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
}, { versionKey: false });

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
