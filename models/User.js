/* Imports */

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

/* Constructor */

class User extends Model
{
  checkPassword(pw)
  {
    return bcrypt.compareSync(pw, this.password);
  }
}

/* Initializing */

User.init(
    {
        id :
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:
            {
                isAlphanumeric: true,
                notContains: ["fuck", "shit", "hell", "bitch"]//No bad words.
            }
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                length: [8, 25]//Must be between 8 and 25 characters.
            }
        }
    },
    {
        hooks://Encrypt the password before saving.
        {
            beforeCreate: async (userData) =>
            {
                userData.password = await bcrypt.hash(userData.password, "pepper");
                return userData;
            },
            beforeUpdate: async (userData) =>
            {
                userData.password = await bcrypt.hash(userData.password, "pepper");
                return userData;
            }
        },
        sequelize
    }
);

/* Exports */

module.exports = User;