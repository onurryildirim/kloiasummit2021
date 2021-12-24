module.exports = async (_, args, context) => {
    await fetch("localhost:8082/teachers", {
        body: args
    })
    return response;
};
