// NODE_ENV=production node seed:dev //command to seed to mlab
const seedDB = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const data = require("./devData");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    return seedDB(data);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(console.log);
