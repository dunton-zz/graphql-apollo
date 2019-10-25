const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true // means development environment
  })
);

app.listen(4000, () => {
  console.log("Let's rock on Port 4000");
});
