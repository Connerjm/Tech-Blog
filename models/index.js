/* Imports */

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

/* Relationships */

//User and Post
User.hasMany(Post, {
    foreignKey: "author_id",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "author_id"
});

//Post and Comment
Post.hasMany(Comment, {
    foreignKey: "parent_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: "parent_id"
});

//User and Comment
User.hasMany(Comment, {
    foreignKey: "author_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "author_id"
});

/* Exports */

module.exports = { User, Post, Comment };