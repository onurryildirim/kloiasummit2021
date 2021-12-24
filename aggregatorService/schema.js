const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const teacherQueries = require('./queries/teacher');
const Teacher = require('./types/Teacher');

const Root = `
  type Query {
    dummy: String
  },
  type Mutation {
    dummy: String
  },
  type Subscription {
    dummy: String
  },
  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription,
  }
`;

const resolvers = merge(
  {},
  // queries
  teacherQueries,
);


const schema = makeExecutableSchema({
  typeDefs: [
    Root,
    Teacher
  ],
  resolvers
});

module.exports = schema;
