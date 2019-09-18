const auth = require('./auth');
const users = require('./users');
const notes = require('./notes');
const logs = require('./logs');

module.exports = app => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/notes', notes);
  app.use('/api/logs', logs);
};