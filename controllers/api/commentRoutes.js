const router = require('express').Router();
const { Comment } = require('../../models');

//Create
router.post("/:postId", async (req, res) =>
{
    try
    {
        const commentData = await Comment.create({
            ...req.body,
            author_id: req.session.userId,
            parent_id: req.params.postId
        });
        res.status(200).json(commentData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Edit
router.patch("/:commentId", async (req, res) =>
{
    try
    {
        const commentData = await Comment.findByPk(req.params.commentId);
        commentData.content = req.body.content;
        await commentData.save();

        if (!commentData)
        {
            res.status(404).json({ message: "No comment found with that id." });
        }

        res.status(200).json(commentData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Delete
router.delete("/:commentId", async (req, res) =>
{
    try
    {
        const commentData = await Comment.destroy({
            where: { id: req.params.commentId }
        });

        if (!commentData)
        {
            res.status(404).json({ message: "No comment found with that id." });
        }

        res.status(200).json(commentData);
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

module.exports = router;