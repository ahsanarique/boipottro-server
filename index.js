const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const ObjectID = require("mongodb").ObjectID;

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Boipottro Server running on port ${port}`);
});

app.listen(port);
