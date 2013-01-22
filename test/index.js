var reporter;

try {
  reporter = require("nodeunit").reporters.default;
} catch(err) {
  console.error("Cannot find nodeunit package.");
  console.error("Please ensure this project's dependencies have been " +
    "satisfied by running `npm install`.");
  process.exit();
}

reporter.run(["test/tests.js"]);
