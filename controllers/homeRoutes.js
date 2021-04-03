const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/auth.js");

//Home
router.get("/", async (req, res) =>
{
    try
    {
        const postData = await Post.findAll({
            include:
            [{
                model: User,
                attributes: ["username"]
            }],
            order: [["createdAt", "DESC"]]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("home", { posts, loggedIn: req.session.loggedIn });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

//Dashboard
router.get("/dashboard", auth, async (req, res) =>
{
    try
    {
        const postData = await Post.findAll({
            include:
            [{
                model: User,
                attributes: ["username"]
            }],
            where:
            {
                author_id: req.session.userId
            },
            order: [["createdAt", "DESC"]]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

//Single post
router.get("/post/:postId", auth, async (req, res) =>
{
    try
    {
        const postData = await Post.findByPk(req.params.postId, {
            include: {
                model: User
            }
        });

        const post = postData.get({ plain: true });

        const commentData = await Comment.findAll({
            include: { model: User},
            where: { parent_id: post.id }
        });

        const comments = commentData.map(comment => comment.get({ plain: true }));
        
        console.log(post);
        console.log(comments);
        console.log(req.session.loggedIn);

        res.render("post", { post, comments, loggedIn: req.session.loggedIn});
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Login
router.get("/login", (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect("/");
    }
    
    res.render("loginorregister", { newUser: false });
});

//Register
router.get("/register", (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect("/");
    }
    
    res.render("loginorregister", { newUser: true });
});

//New post
router.get("/new-post", auth, (req, res) =>
{
    res.render("new-post", { loggedIn: req.session.loggedIn });
});

//Anything else
router.get("/*", (req, res) =>
{
    res.status(404).json({ message: "Wrong route." });
});

module.exports = router;
