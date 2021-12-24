
module.exports = async (...args) => {
    const [, params, context, ] = args;
    client.once("ready", () => {
        client.variation("your.flag.key", {"key": "user@test.com"}, false,
          async (err, showFeature) => {
            if (showFeature) {
              // application code to show the feature
              const response = await fetch("localhost:8080/students");
              return response.json();
            } else {
              // the code to run if the feature is off
              return {
                    id: "1",
                    name: "Test"
                }
            }
          });
      });
};