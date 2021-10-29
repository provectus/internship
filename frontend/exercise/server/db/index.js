const mongoose = require('mongoose');

const connectionString = `mongodb://mongodb/${process.env.DB_NAME}`;

mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => {
  console.log('Server connected to MongoDB');
}).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
