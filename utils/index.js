exports.createTopic = topicData => {
  return topicData.map(topic => {
    return {
      ...topic
    };
  });
};

exports.createUser = userData => {
  return userData.map(user => {
    return {
      ...user
    };
  });
};

exports.createArticle = (articleData, topicDocs, userDocs) => {
  return articleData.map(article => {
    return {
      title: article.title,
      body: article.body,
      votes: 0,
      created_at: article.created_at,
      belongs_to: topicDocs.find(topic => topic.slug === article.topic).slug,
      created_by: userDocs.find(user => user.username === article.created_by)
        ._id
    };
  });
};

exports.createComment = (commentData, topicDocs, userDocs, articleDocs) => {
  return commentData.map(comment => {
    return {
      body: comment.body,
      votes: comment.votes,
      created_at: comment.created_at,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )._id,
      created_by: userDocs.find(user => user.username === comment.created_by)
        ._id
    };
  });
};
