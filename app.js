const { sequelize, User, Post } = require("./models");
const express = require('express');
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.debug("error:", error);
    res.status(500).json(error);
  }
});

app.get("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: ["posts"],
    });
    res.json(user);
  } catch (error) {
    // erros should be in one place
    console.debug("error:", error);
    res.status(500).json(error);
  }
});

app.post("/users", async (req, res) => {
  const {name, email, role} = req.body;
  try {
    const user = await User.create({name, email, role})
    res.json(user)
  } catch (error) {
    console.debug('error:', error)
    res.status(500).json(error);
  }
  
})

app.put("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({where: { uuid }});

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    res.json(user);
  } catch (error) {
    // erros should be in one place
    console.debug("error:", error);
    res.status(500).json(error);
  }
});

app.delete("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();

    res.json({id: user.id, message: "user deleted"});
  } catch (error) {
    // erros should be in one place
    console.debug("error:", error);
    res.status(500).json(error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user"]
    });
    res.json(posts);
  } catch (error) {
    console.debug("error:", error);
    res.status(500).json(error);
  }
});

app.post("/posts", async (req, res) => {
  const {body, userUuid} = req.body
  console.debug('userUuid:', userUuid)
  try {
    const user = await User.findOne({where: {uuid: userUuid}});
    const post = await Post.create({
      body,
      userId: user.id
    });
    res.json(post);
  } catch (error) {
    console.debug('error:', error)
    res.status(500).json(error);
  }
  
})

app.listen(3000, async() => {
  console.log("Server is running on port 3000");
  // sequelize.sync this is not for production
  // but is usefull for developement the first version of the app
  // before any migration is lunched
  await sequelize.authenticate();
  console.log("Db is connected");
});