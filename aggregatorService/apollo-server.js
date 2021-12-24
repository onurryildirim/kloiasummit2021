const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const config = require('./config');

const server = new ApolloServer({
  schema,
  cors: config.corsOptions,
});

module.exports = server;
