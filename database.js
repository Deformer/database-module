const Sequelize = require('sequelize');

const {
  username,
  database,
  password,
  host,
  port,
  dialect,
} = require('./config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

module.exports = {
  sequelize,
};
