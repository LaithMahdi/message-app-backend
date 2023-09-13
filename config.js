const Sequelize = require('sequelize');

const sequelize = new Sequelize('message app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
