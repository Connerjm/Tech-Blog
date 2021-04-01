const router = require("express").Router();
const { Post, User } = require("../models");
const auth = require("../utils/auth");

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
            }]
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
            }
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    }
    catch (err)
    {
        res.status(500).json(err);
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

//Anything else
router.get("/*", (req, res) =>
{
    res.status(404).json({ message: "Wrong route." });
});

module.exports = router;
