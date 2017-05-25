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

export default mongoose;
