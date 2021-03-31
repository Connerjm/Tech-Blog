-- Clear and remake the database to start from zero. --
DROP DATABASE IF EXISTS tech_blog_db;

-- Make the database. --
CREATE DATABASE tech_blog_db;

-- For testing. --
USE tech_blog_db;

SELECT * FROM user;

SELECT * FROM post;

SELECT * FROM comment;

-- Basic select for users with posts. --
SELECT username, title AS Title, content AS Body, post.createdAt AS Date FROM user JOIN post ON user.id = post.author_id;