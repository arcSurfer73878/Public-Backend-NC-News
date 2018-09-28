const Topic = require("../models/Topic");
const Article = require("../models/Article");

exports.getAllTopic = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getTopicArticle = (req, res, next) => {
  Article.find({ belongs_to: req.params.topic_slug })
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

exports.addTopicArticle = (req, res, next) => {
  req.body.belongs_to = req.params.topic_slug;
  Article.create(req.body)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};
