const Sequelize = require('sequelize');

const { sequelize } = require('../database');
const { compare } = require('../helpers');
const { BadRequestHttpException } = require('errors-list/http-errors');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
  passwordSalt: Sequelize.STRING,
  login: {
    type: Sequelize.STRING,
    unique: true,
  },
});


User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.passwordHash;
  delete values.passwordSalt;
  delete values.createdAt;
  delete values.updatedAt;

  return values;
};

User.login = ({ login, password }) => User.findOne({ where: { login } }).then((user) => {
  if (!user) {
    throw new BadRequestHttpException('Wrong login or password');
  }
  const isPasswordCorrect = compare(password, user.passwordHash, user.passwordSalt);
  if (isPasswordCorrect) {
    return user;
  }
  throw new BadRequestHttpException('Wrong login or password');
});

module.exports = User;
