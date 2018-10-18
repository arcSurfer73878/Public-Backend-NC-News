const Comment = require("../models/Comment");

exports.getAllComment = (req, res, next) => {
  Comment.find()
    .populate("created_by")
    .populate("belongs_to")
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.getCommentId = (req, res, next) => {
  Comment.findOne({ _id: req.params.comment_id })
    .populate("created_by")
    .populate("belongs_to")
    .then(comments => {
      if (!comments) throw { status: 404, message: "bad request" };
      res.send({ comments });
    })
    .catch(next);
};

exports.updateCommentVote = (req, res, next) => {
  if (req.query.vote === "up") {
    Comment.find({ _id: req.params.comment_id })
      .update({ $inc: { votes: 1 } })
      .then(comments => {
        res.send({ comments });
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Comment.find({ _id: req.params.comment_id })
      .update({ $inc: { votes: -1 } })
      .then(comments => {
        res.send({ comments });
      })
      .catch(next);
  }
};

exports.deleteCommentId = (req, res, next) => {
  Comment.remove({ _id: req.params.comment_id })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};
