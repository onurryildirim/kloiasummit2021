
const Student = `
  type Student {
    id: ID!,
    name: String!,
    age: Int!,
    email: String!,
    classroomId: Int!
  }

  extend type Query {
    getStudents: [Student],
  }

  extend type Mutation {
    addStudents(name: String!): Student
  }
`;

module.exports = Student;
