const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncriment: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4]
    }
  },
}, 
  {
  hooks: {
    beforeCreate: async (newUserData) => {
        newuserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
    }
    beforeUpdate async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'User'
  }
);

module.exports = User;
