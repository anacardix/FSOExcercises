const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1 });
  response.json(users.map((user) => user.toJSON()));
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
  });
  response.json(user.toJSON());
});

userRouter.post("/", async (request, response) => {
  const { username, name, password, notes } = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)`,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
    notes,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.put("/:id", async (request, response) => {
  const result = await User.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
  });
  response.status(201).json(result);
});

module.exports = userRouter;
