const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;

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
      title: req.body.title,
      authors: req.body.authors,
      image: req.body.image,
    });
    res.send({ created: true });
  } else {
    res.status(400).send({ created: false });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
