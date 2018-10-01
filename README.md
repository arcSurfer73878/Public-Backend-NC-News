## Northcoders News API

This is an API which will be displaying content from a MongoDB database.

### Getting Started

### Prerequisites

- [Node Js](https://nodejs.org/en/)
- [Mongo](https://www.mongodb.com/)

### Installation

Essential Node modules:

```
express
mocha
chai
mongoose
supertest
body-parser
```

To install them, use:

```
npm i <Node module>
```

### Config

To access the development database, set a config file like this:

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

To run the test folder located at /spec/app.spec.js, use:

```
npm run t
```

### Built With

- [Visual Code Studio](https://code.visualstudio.com/)
- [Mlab](https://mlab.com)
- [Heroku](https://dashboard.heroku.com)

### Authors

- **Kaiming Shen**[ArcSurfer73838](https://github.com/arcSurfer73878)
