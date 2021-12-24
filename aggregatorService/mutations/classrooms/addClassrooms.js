module.exports = async (_, args, context) => {
    await fetch("localhost:8081/classrooms", {
        body: args
    })
    return response;
};
