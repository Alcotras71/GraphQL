const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const PORT = 3005;

const LOGIN = "alcotras71";
const PASS = "Hdsufg8v";
const DBNAME = "GraphQL";
const CLUSTER = "alcotras";

const URI = `mongodb+srv://${LOGIN}:${PASS}@${CLUSTER}.hjzdr.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started!");
});
