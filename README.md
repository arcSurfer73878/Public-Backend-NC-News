## Northcoders News API

This is an API which will be displaying content from a MongoDB database. Users will be able to retrieve some articles, add some, comment and upvote the best ones.

### Getting Started

Clone this repository:

```
$ git clone https://github.com/arcSurfer73878/Public-Backend-NC-News
```

### Prerequisites

You will need:

- [Node Js](https://nodejs.org/en/)
- [Mongo](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

### Installation

Essential Node modules:

```
express
cors,
body-parser,
db,
mongoose,
promises
```

Make sure you've navigated into the folder and install all dependencies using:

```
npm i
```

### Config

To access the development database, create a config file like this:

```
const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  test: {
    DB_URL: "mongodb://localhost:27017/northcoders_news_test"
  },
  development: {
    DB_URL: "mongodb://localhost:27017/northcoders_news"
  },
  production: {
    DB_URL:
      "mongodb://<dbuser>:<dbpassword>@ds115543.mlab.com:15543/nc_news"
  }
};

module.exports = config[NODE_ENV];
```

### Running the tests

You also have access to an npm script to run tests.
The test folder is located at /spec/app.spec.js

```
npm run test
```

### Built With

- [Visual Code Studio](https://code.visualstudio.com/)
- [Mlab](https://mlab.com)
- [Heroku](https://dashboard.heroku.com)

### Deployement

- [Live App](https://nc-news-kaiming.herokuapp.com/)

### Authors

- **Kaiming Shen** [ArcSurfer73838](https://github.com/arcSurfer73878)
