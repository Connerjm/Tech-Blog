/* Imports */

const { Model, DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/connection");

/* Constructor */

class Post extends Model
{}

/* Initializing */

Post.init(
    {
        id :
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:
        {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: "post"
    }
);

/* Exports */

module.exports = Post;