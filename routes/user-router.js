const userRouter = require("express").Router();
const { getAllUser, getUserByUsername } = require("../controller/User");
userRouter.route("/").get(getAllUser);
userRouter.route("/:username").get(getUserByUsername);

module.exports = userRouter;
