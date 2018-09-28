const topicRouter = require("express").Router();
const {
  getAllTopic,
  getTopicArticle,
  addTopicArticle
} = require("../controller/Topic");

topicRouter.route("/").get(getAllTopic);
topicRouter.route("/:topic_slug/articles").get(getTopicArticle);
topicRouter.route("/:topic_slug/articles").post(addTopicArticle);

module.exports = topicRouter;
