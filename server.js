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
  res.send(lists);
});

app.post("/save", (req, res) => {
  console.log(req.body);
  if (req.body.lists && req.body.lists.books && req.body.lists.wishlist) {
    lists = req.body.lists;
    res.send(lists);
  } else {
    res.status(400).send({ error: "Cannot save" });
  }
});

// app.delete("/:bookId", (req, res) => {
//   console.log(req.params);
//   books = books.filter((book) => book.id !== Number(req.params.bookId));
//   res.send({ deleted: true });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
