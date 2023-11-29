const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Blogpost = sequelize.define('Blogpost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Blogpost;