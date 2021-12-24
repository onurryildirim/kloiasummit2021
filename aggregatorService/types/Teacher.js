
const Teacher = `
  type Teacher {
    id: ID!,
    name: String!,
  }

  extend type Query {
    getTeacher(name: String!): Teacher,
  }
`;

module.exports = Teacher;
