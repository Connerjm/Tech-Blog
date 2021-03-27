-- Clear and remake the database to start from zero. --
DROP DATABASE IF EXISTS tech_blog_db;

-- Make the database. --
CREATE DATABASE tech_blog_db;

USE tech_blog_db;

SELECT * FROM user;

SELECT * FROM post;

SELECT * FROM comment;