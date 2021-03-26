/* Imports */

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/* Constructor */

class Comment extends Model
{}

/* Initializing */

Comment.init(
    {
        id :
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author_id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:
            {
                model: "user",
                key: "id"
            }
        },
        parent_id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:
            {
                model: "post",
                key: "id"
            }
        }
    },
    {
        sequelize
    }
);

/* Exports */

module.exports = Comment;