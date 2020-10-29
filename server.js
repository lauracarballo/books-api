const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;

let lists = {
  books: [],
  wishlist: [],
};

const app = express();

app.use(bodyParser.json());

// middleware to allow any website to request data (CORS)
app.use(cors());
app.options("*", cors());

app.get("/lists", (req, res) => {
  console.log("/lists", lists);
  res.send(lists);
});

app.post("/save", (req, res) => {
  if (req.body.lists && req.body.lists.books && req.body.lists.wishlist) {
    lists = req.body.lists;
    console.log("/save", lists);
    res.send(lists);
  } else {
    res.status(400).send({ error: "Cannot save" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
