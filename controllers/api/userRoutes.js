const router = require('express').Router();
const { User } = require('../../models');
const auth = require("../utils/auth");

//Create
router.post("/", async (req, res) =>
{
    try
    {
        const userData = await User.create(req.body);

        req.session.save(() =>
        {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Login
router.post("/login", async (req, res) =>
{
    try
    {
        const userData = await User.findOne({ where: { username: req.body.username } });

        console.log(userData);

        if (!userData)
        {
            res.status(400).json({ message: "Incorrect username or password." });
        }

        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword)
        {
            res.status(400).json({ message: "Incorrect username or password." });
        }

        req.session.save(() =>
        {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Logout
router.post("/logout", auth, (req, res) =>
{
    if (req.session.loggedIn)
    {
        req.session.destroy(() =>
        {
            res.status(204).end();
        });
    }
    else
    {
        res.status(404).end();
    }
});

module.exports = router;