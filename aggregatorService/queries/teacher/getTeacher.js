module.exports = async (...args) => {
    const [, params, context, ] = args;
    client.once("ready", () => {
        client.variation("your.flag.key", {"key": "user@test.com"}, false,
          (err, showFeature) => {
            if (showFeature) {
              // application code to show the feature
              return {
                    id: "1",
                    name: "Test 2"
                }
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