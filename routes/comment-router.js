const commentRouter = require("express").Router();
const {
  getAllComment,
  getCommentId,
  updateCommentVote,
  deleteCommentId
} = require("../controller/Comment");
commentRouter.route("/").get(getAllComment);
commentRouter.route("/:comment_id").get(getCommentId);
commentRouter.route("/:comment_id").patch(updateCommentVote);
commentRouter.route("/:comment_id").delete(deleteCommentId);

module.exports = commentRouter;
