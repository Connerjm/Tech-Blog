const router = require('express').Router();
const { Post } = require('../../models');

//Create
router.post("/", async (req, res) =>
{
    try
    {
        const postData = await Post.create({
            ...req.body,
            author_id: req.session.userId
        });
        res.status(200).json(postData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Edit
router.patch("/:postId", async (req, res) =>
{
    try
    {
        const postData = await Post.findByPk(req.params.postId);
        postData.content = req.body.content;
        await postData.save();

        if (!postData)
        {
            res.status(404).json({ message: "No post with that id." });
            return;
        }

        res.status(200).json(postData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Delete
router.delete("/:postId", async (req, res) =>
{
    try
    {
        const postData = await Post.destroy({
            where: { id: req.params.postId }
        });

        if (!postData)
        {
            res.status(404).json({ message: "No post with that id." });
        }

        res.status(200).json(postData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

module.exports = router;