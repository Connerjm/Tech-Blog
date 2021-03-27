const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");

async function seedData()
{
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData,
    {
        individualHooks: true,
        returning: true
    });

    //It wouldn't always create entries in the order of the json data so I use this to make the entries line up correctly.
    for (const post of postData)
    {
        let id;
        if (post.title === "Why explosion magic is the best.")
            id = users.find(user => user.username === "Megumin").id;
        else if (post.title === "I shouldn't even be here!")
            id = users.find(user => user.username === "Aqua").id;
        
        await Post.create({
            ...post,
            author_id: id
        });
    }

    process.exit(0);
}

seedData();
