const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const { initialiseDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");

app.use(express.json());

initialiseDatabase();

//Route to create a book entry.
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saveBook = await book.save();
    if (!saveBook)
      res
        .status(404)
        .json({
          error:
            "Error occurred in saving new book. Please check data format and try again.",
        });
    else
      res
        .status(200)
        .json({
          message: "Book entry created successfully.",
          "Book-Data": saveBook,
        });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occured with the request while creating new book in the DB. Please try again.",
    });
  }
});

//Route to fetch all book from DB.
app.get("/books", async (req, res) => {
  try {
    const bookData = await Book.find();
    if(!bookData)
        res.status(404).json({ error: "Either some error occured or there is no entry present in the DB." });
    else 
        res.status(200).json({ message: "Fetched all Book data from db.", "Book-List-Data": bookData });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Some error occurred with the request while fetching all the books from DB. Please try again.",
      });
  }
});

//Fetch book details by title of book
app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookData = await Book.findOne({ title: req.params.bookTitle });
    if(!bookData)
      res.status(404).json({ error: "Either the book is not present or some other error occurred. Please try again." });
    else 
      res.status(200).json({ message: "Book fetched successfully from the DB.", "Book-Data": bookData });
  } catch (error) {
    res.status(505).json({ error: "Some error occuredd with the request while fetching book. Please try again." });
  }
})

app.listen(PORT, () => {
  console.log("Server is Running on PORT:", PORT);
});
