process.env.NODE_ENV = "test";
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed");
const data = require("../seed/testData");

describe("/api", function() {
  let topicDocs, userDocs, articleDocs, commentDocs;
  beforeEach(() => {
    return seedDB(data).then(docs => {
      topicDocs = docs[0];
      userDocs = docs[1];
      articleDocs = docs[2];
      commentDocs = docs[3];
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/articles", () => {
    describe("/", () => {
      it("GET return 200 and an array of articles", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.an("array");
            expect(articles[0]._id).to.equal(`${articleDocs[0]._id}`);
            expect(articles[0].title).to.equal(articleDocs[0].title);
            expect(articles[0]).to.have.keys([
              "_id",
              "body",
              "comment_count",
              "title",
              "created_by",
              "created_at",
              "belongs_to",
              "votes",
              "__v"
            ]);
          });
      });
      describe("/:article_id", () => {
        it("GET returns 200 and an article object", () => {
          return request
            .get(`/api/articles/${articleDocs[0]._id}`)
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article._id).to.equal(`${articleDocs[0]._id}`);
            });
        });
        it("GET returns a 400 for an invalid id", () => {
          return request
            .get(`/api/articles/paul`)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("GET returns a 404 for a article that does not exist", () => {
          return request
            .get(`/api/articles/${commentDocs[0]._id}`)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Page not found");
            });
        });
        it("PATCH /api/articles/:article_id up", () => {
          const expected = { n: 1, nModified: 1, ok: 1 };
          return request
            .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.have.all.keys(expected);
              expect(articles).to.eql(expected);
            });
        });
        it("PATCH /api/articles/:article_id down", () => {
          const expected = { n: 1, nModified: 1, ok: 1 };
          return request
            .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.have.all.keys(expected);
              expect(articles).to.eql(expected);
            });
        });
        describe("/comments", () => {
          it("GET returns 200 and a comments array by article", () => {
            return request
              .get(`/api/articles/${articleDocs[0]._id}/comments`)
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments[0]).to.have.keys([
                  "votes",
                  "_id",
                  "body",
                  "created_at",
                  "belongs_to",
                  "created_by",
                  "__v"
                ]);
              });
          });
          it("POST a new comment on one specific article", () => {
            const newComment = {
              body: "This is a tessttt",
              created_by: "5bae077cefed5193122a1730"
            };
            return request
              .post(`/api/articles/${articleDocs[0]._id}/comments`)
              .send(newComment)
              .expect(201)
              .then(({ body: { comments } }) => {
                expect(comments).to.have.all.keys([
                  "votes",
                  "_id",
                  "body",
                  "created_at",
                  "belongs_to",
                  "created_by",
                  "__v"
                ]);
                expect(comments).to.be.an("object");
                expect(comments.created_by).to.equal(newComment.created_by);
                expect(comments.body).to.equal(newComment.body);
              });
          });
        });
      });
    });
  });
  describe("/topics", () => {
    describe("/", () => {
      it("GET return 200 and an array of topics", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.be.an("array");
            expect(topics[0]._id).to.equal(`${topicDocs[0]._id}`);
            expect(topics[0].title).to.equal(topicDocs[0].title);
            expect(topics[0]).to.have.keys(["_id", "title", "slug", "__v"]);
          });
      });
    });
    describe("/:topic_slug/articles", () => {
      it("GET return 200 and an array of articles by topic", () => {
        return request
          .get("/api/topics/mitch/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.an("array");
            expect(articles[0]._id).to.equal(`${articleDocs[0]._id}`);
            expect(articles[0].title).to.equal(articleDocs[0].title);
            expect(articles[0]).to.have.keys([
              "votes",
              "_id",
              "title",
              "body",
              "comment_count",
              "created_at",
              "belongs_to",
              "created_by",
              "__v"
            ]);
          });
      });
      it("POST a new article on one specific topic slug", () => {
        const newArticle = {
          title: "Test",
          body: "I find this test challenging",
          created_by: "5bb14990930403c7356a708c"
        };
        return request
          .post("/api/topics/mitch/articles")
          .send(newArticle)
          .expect(201)
          .then(({ body: article }) => {
            expect(article).to.have.all.keys([
              "votes",
              "_id",
              "title",
              "body",
              "comment_count",
              "created_at",
              "belongs_to",
              "created_by",
              "__v"
            ]);
            expect(article).to.be.an("object");
            expect(article.title).to.equal(newArticle.title);
            expect(article.body).to.equal(newArticle.body);
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/", () => {
      it("GET return 200 and an array of comments", () => {
        return request
          .get("/api/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.an("array");
            expect(comments[0]._id).to.equal(`${commentDocs[0]._id}`);
            expect(comments[0].body).to.equal(commentDocs[0].body);
            expect(comments[0]).to.have.keys([
              "_id",
              "body",
              "created_by",
              "created_at",
              "belongs_to",
              "votes",
              "__v"
            ]);
          });
      });
      describe("/:comment_id", () => {
        it("GET returns 200 and a comment object", () => {
          return request
            .get(`/api/comments/${commentDocs[0]._id}`)
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments._id).to.equal(`${commentDocs[0]._id}`);
            });
        });
        it("GET returns a 400 for an invalid id", () => {
          return request
            .get(`/api/comments/paul`)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("GET returns a 404 for a comment that does not exist", () => {
          return request
            .get(`/api/comments/${topicDocs[0]._id}`)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Page not found");
            });
        });
        it("PATCH /api/comments/:comment_id vote up", () => {
          const expected = { n: 1, nModified: 1, ok: 1 };
          return request
            .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.have.all.keys(expected);
              expect(comments).to.eql(expected);
            });
        });
        it("PATCH /api/comments/:comment_id vote down", () => {
          const expected = { n: 1, nModified: 1, ok: 1 };
          return request
            .patch(`/api/comments/${commentDocs[0]._id}?vote=down`)
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.have.all.keys(expected);
              expect(comments).to.eql(expected);
            });
        });
        it("DELETE a comment by comment_id", () => {
          const expected = {
            n: 1,
            ok: 1
          };
          return request
            .delete(`/api/comments/${commentDocs[0]._id}`)
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.have.all.keys(expected);
              expect(comments).to.eql(expected);
            });
        });
      });
    });
  });
  describe("/users", () => {
    describe("/", () => {
      it("GET return 200 and an array of users", () => {
        return request
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users).to.be.an("array");
            expect(users[0]._id).to.equal(`${userDocs[0]._id}`);
            expect(users[0].username).to.equal(userDocs[0].username);
            expect(users[0]).to.have.keys([
              "_id",
              "username",
              "name",
              "avatar_url",
              "__v"
            ]);
          });
      });
      describe("/:username", () => {
        it("GET returns 200 and an user object", () => {
          return request
            .get(`/api/users/${userDocs[0].username}`)
            .expect(200)
            .then(({ body: { users } }) => {
              expect(users.username).to.equal(`${userDocs[0].username}`);
            });
        });
        it("GET returns a 404 for a username that does not exist", () => {
          return request
            .get(`/api/users/supercoder93830`)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Page not found");
            });
        });
      });
    });
  });
});
