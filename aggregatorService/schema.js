const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const teachersQueries = require('./queries/teachers');
const studentQueries = require('./queries/students');
const classroomQueries = require('./queries/classrooms');

const teachersMutations = require('./mutations/teachers');
const studentMutations = require('./mutations/students');
const classroomMutations = require('./mutations/classrooms');

const Teacher = require('./types/Teacher');
const Classroom = require('./types/Classroom');
const Student = require('./types/Student');

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
  teachersQueries,
  studentQueries,
  classroomQueries,
  // mutations
  teachersMutations,
  studentMutations,
  classroomMutations,
);


const schema = makeExecutableSchema({
  typeDefs: [
    Root,
    Teacher,
    Classroom,
    Student
  ],
  resolvers
});

module.exports = schema;
