
const Teacher = `
  type Teacher {
    id: ID!,
    firstName: String!,
    lastName: String!,
    classroomId: Int!
  }

  extend type Query {
    getTeachers: [Teacher],
  }
  
  extend type Mutation {
    addTeachers(name: String!): Teacher
  }
`;

module.exports = Teacher;
