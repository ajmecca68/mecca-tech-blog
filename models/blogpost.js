const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as necessary

class Blogpost extends Model {}

Blogpost.init({
  // Model attributes
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
}, {
  sequelize,
  modelName: 'Blogpost',
  timestamps: false 
});

module.exports = Blogpost;
