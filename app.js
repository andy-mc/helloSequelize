const { sequelize, User } = require("./models");
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
    const user = await User.findOne({where: {uuid}});
    res.json(user);
  } catch (error) {
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

app.listen(3000, async() => {
  console.log("Server is running on port 3000");
  // sequelize.sync this is not for production
  // but is usefull for developement the first version of the app
  // before any migration is lunched
  await sequelize.authenticate();
  console.log("Db is connected");
});