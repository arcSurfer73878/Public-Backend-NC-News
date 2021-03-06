const Article = require("../models/Article");
const Comment = require("../models/Comment");

exports.getAllArticle = (req, res, next) => {
  Promise.all([
    Article.find()
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

exports.getArticleId = (req, res, next) => {
  Promise.all([
    Article.findOne({ _id: req.params.article_id }).populate("created_by"),
    Comment.find({
      belongs_to: req.params.article_id
    })
  ])
    .then(([articles, comments]) => {
      if (!articles) throw { status: 404 };
      const article = {
        ...articles._doc,
        comment_count: comments.length
      };
      res.send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id })
    .populate("created_by")
    .populate("belongs_to")
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.addCommentsByArticleId = (req, res, next) => {
  Comment.create({
    body: req.body.body,
    belongs_to: req.params.article_id,
    created_by: req.body.created_by
  })
    .then(comment => {
      return Comment.findById(comment._id).populate("created_by");
    })
    .then(comment => {
      console.log(comment);
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateArticleVote = (req, res, next) => {
  if (req.query.vote === "up") {
    Article.find({ _id: req.params.article_id })
      .update({ $inc: { votes: 1 } })
      .then(articles => {
        res.send({ articles });
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Article.find({ _id: req.params.article_id })
      .update({ $inc: { votes: -1 } })
      .then(articles => {
        res.send({ articles });
      })
      .catch(next);
  }
};
