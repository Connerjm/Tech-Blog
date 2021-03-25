const router = require('express').Router();

router.get("/", (req, res) =>
{
    res.status(200).json({message: "Hey look! It works!"});
});

module.exports = router;