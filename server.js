const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;

let id = 0;

let books = [];

const app = express();

app.use(bodyParser.json());

// middleware to allow any website to request data (CORS)
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send(books);
});

app.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.authors) {
    books.push({
      id: ++id,
      title: req.body.title,
      authors: req.body.authors,
      image: req.body.image,
      description: req.body.description,
    });
    res.send({ created: true });
  } else {
    res.status(400).send({ created: false });
  }
});

app.delete("/:bookId", (req, res) => {
  console.log(req.params);
  books = books.filter((book) => book.id !== Number(req.params.bookId));
  res.send({ deleted: true });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
