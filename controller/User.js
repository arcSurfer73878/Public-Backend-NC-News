const User = require("../models/User");

exports.getAllUser = (req, res, next) => {
  User.find()
    .then(users => {
      res.send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(users => {
      if (!users) throw { status: 404, message: "Page not found" };
      res.send({ users });
    })
    .catch(next);
};
