const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const { initialiseDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");

app.use(express.json());

initialiseDatabase();

app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saveBook = await book.save();
    if(!saveBook)
        res.status(404).json({ error: "Error occurred in saving new book. Please check data format and try again." });
    else 
        res.status(200).json({ message: "Book entry created successfully.", "Book-Data": saveBook });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Some error occured with the request while creating new book in the DB. Please try again.",
      });
  }
});

app.listen(PORT, () => {
  console.log("Server is Running on PORT:", PORT);
});
