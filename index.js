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
    res.status(500).json({ error: "Some error occuredd with the request while fetching book. Please try again." });
  }
});

//Fetch all books by a particular author.
app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookData = await Book.find({ author: req.params.authorName });
    if(!bookData)
      res.status(404).json({ error: "Either the book is not present or some other error occurred. Please try again." });
    else 
      res.status(200).json({ message: "Book fetched successfully from the DB.", "Book-Data": bookData });
  } catch (error) {
    res.status(500).json({ error: "Some error occuredd with the request while fetching book. Please try again." });
  }
});

//Fetch all books of a particular genre.
app.get("/books/genre/:genre", async (req, res) => {
  try {
    const bookData = await Book.find({ genre: req.params.genre });
    if(!bookData)
      res.status(404).json({ error: "Either the book is not present or some other error occurred. Please try again." });
    else 
      res.status(200).json({ message: "Book fetched successfully from the DB.", "Book-Data": bookData });
  } catch (error) {
    res.status(500).json({ error: "Some error occuredd with the request while fetching book. Please try again." });
  }
});

//Fetch all books of a particular year.
app.get("/books/year/:publishedYear", async (req, res) => {
  try {
    const bookData = await Book.find({ publishedYear: req.params.publishedYear });
    if(!bookData)
      res.status(404).json({ error: "Either the book is not present or some other error occurred. Please try again." });
    else 
      res.status(200).json({ message: "Book fetched successfully from the DB.", "Book-Data": bookData });
  } catch (error) {
    res.status(500).json({ error: "Some error occuredd with the request while fetching book. Please try again." });
  }
});

//Find the book by title then update the rating.
app.post("/books/update/title/:bookTitle", async(req, res) => {
  try {
    const bookData = await Book.findOneAndUpdate({ title: req.params.bookTitle }, req.body, {new: true});
    if(!bookData)
      res.status(404).json({ error: "Book does not exist. Please try again with different value." });
    else
      res.status(200).json({ message: "The book data is updated.", "New-Book-Data": bookData });
    
  } catch (error) {
    res.status(500).json({ error: "Some error occuredd with the request while updating book. Please try again." });
  }
});

//Find book by id and delete from DB.
app.delete("/books/delete/:bookId", async (req, res) => {
  try {
    const bookData = await Book.findOneAndDelete(req.params.bookId);
    if(!bookData)
      res.status(404).json({ error: "Book does not exist. Please try again with different ID value." });
    else 
      res.status(200).json({ message: "Book Deleted Successfully. "});
  } catch (error) {
    res.status(500).json({ error: "Some error occuredd with the request while deleting the book. Please try again." });
  }
});



app.listen(PORT, () => {
  console.log("Server is Running on PORT:", PORT);
});
