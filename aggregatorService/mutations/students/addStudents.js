module.exports = async (_, args, context) => {
    await fetch("localhost:8080/students", {
        body: args
    })
    return response;
};
