const Sequelize = require('sequelize');

const { sequelize } = require('./');

const Room = require('./room');
const User = require('./user');

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: Sequelize.TEXT,
});

Message.belongsTo(Room);
Message.belongsTo(User);

module.exports = Message;
