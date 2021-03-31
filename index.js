const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const app = express();
app.use(express.json());
app.use(cors());

const userName = process.env.DB_USER;
const pass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

const uri = `mongodb+srv://${userName}:${pass}@cluster0.twaro.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const collection = client.db(dbName).collection(dbCollection);

  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("Successfully connected to database");
  }
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Boipottro Server running on port ${port}`);
});

app.listen(port);
