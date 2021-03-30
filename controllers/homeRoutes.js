const router = require("express").Router();
const { Post, User } = require("../models");

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

        res.render("home", { posts });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

router.get("/dashboard", (req, res) =>
{
    //Can only go here if logged in. Must pass username to the template.
});

router.get("/login", (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect("/");
    }
    
    res.render("loginorregister", { newUser: true });
});

router.get("/*", (req, res) =>
{
    res.status(404).json({ message: "Wrong route." });
});

module.exports = router;
