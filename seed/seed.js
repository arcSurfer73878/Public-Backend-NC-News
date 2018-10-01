const mongoose = require("mongoose");
const { Topic, User, Article, Comment } = require("../models");
const {
  createTopic,
  createUser,
  createArticle,
  createComment
} = require("../utils");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(createTopic(topicData)),
        User.insertMany(createUser(userData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        Article.insertMany(createArticle(articleData, topicDocs, userDocs))
      ]);
    })
    .then(([topicDocs, userDocs, articleDocs]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        articleDocs,
        Comment.insertMany(
          createComment(commentData, topicDocs, userDocs, articleDocs)
        )
      ]);
    });
};

module.exports = seedDB;
