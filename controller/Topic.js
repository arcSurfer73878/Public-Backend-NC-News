const Topic = require("../models/Topic");
const Article = require("../models/Article");
const Comment = require("../models/Comment");

exports.getAllTopic = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getTopicArticle = (req, res, next) => {
  Promise.all([
    Article.find({ belongs_to: req.params.topic_slug })
      .populate("created_by")
      .lean(),
    Comment.find()
  ])
    .then(([articles, comments]) => {
      articles.map(article => {
        article.comment_count = comments.filter(
          element => element.belongs_to._id == `${article._id}`
        ).length;
      });
      res.send({ articles });
    })
    .catch(next);
};

exports.addTopicArticle = (req, res, next) => {
  req.body.belongs_to = req.params.topic_slug;
  Article.create(req.body)
    .then(articles => {
      const article = {
        ...articles._doc,
        comment_count: 0
      };
      res.status(201).send(article);
    })
    .catch(next);
};
