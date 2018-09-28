const articleRouter = require("express").Router();

const {
  getAllArticle,
  getArticleId,
  getCommentsByArticleId,
  addCommentsByArticleId,
  updateArticleVote
} = require("../controller/Article");

articleRouter.route("/").get(getAllArticle);

articleRouter.route("/:article_id").get(getArticleId);
// articleRouter.route("/:article_id").patch(getArticleId);

articleRouter.route("/:article_id/comments").get(getCommentsByArticleId);

articleRouter.route("/:article_id/comments").post(addCommentsByArticleId);

articleRouter.route("/:article_id").patch(updateArticleVote);

module.exports = articleRouter;
