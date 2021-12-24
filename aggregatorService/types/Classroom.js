
const Classroom = `
  type Classroom {
    id: ID!,
    name: String!,
    code: String!,
    teacherId: Int!
  }

  extend type Query {
    getClassrooms: [Classroom],
  }

  extend type Mutation {
    addClassrooms(name: String!): Classroom
  }
`;

module.exports = Classroom;
