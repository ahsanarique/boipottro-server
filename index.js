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
const dbBookCollection = process.env.DB_COLLECTION_INVENTORY;
const dbOrderCollection = process.env.DB_COLLECTION_ORDERS;

const uri = `mongodb+srv://${userName}:${pass}@cluster0.twaro.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const bookCollection = client.db(dbName).collection(dbBookCollection);
  const orderCollection = client.db(dbName).collection(dbOrderCollection);

  app.get("/books", (req, res) => {
    bookCollection.find().toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/book/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    bookCollection.find({ _id: id }).toArray((err, documents) => {
      res.send(documents[0]);
    });
  });

  app.get("/orders", (req, res) => {
    orderCollection.find().toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/addBook", (req, res) => {
    const newBook = req.body;
    bookCollection.insertOne(newBook).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/placeOrder", (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    bookCollection
      .findOneAndDelete({ _id: id })
      .then((documents) => res.send(documents.value));
  });

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
