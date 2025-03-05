ENDPOINTS -- 

Route to create a book entry -- (POST) -- "/books";
Route to fetch all book from DB -- (GET) -- "/books";
Fetch book details by title of book -- (GET) -- "/books/:bookTitle";
Fetch all books by a particular author -- (GET) -- "/books/author/:authorName";
Fetch all books of a particular genre -- (GET) -- "/books/genre/:genre";
Fetch all books of a particular year -- (GET) -- "/books/year/:publishedYear";
Find the book by title and update the rating -- (POST) -- "/books/update/title/:bookTitle";
Find book by id and delete from DB -- (DELETE) -- "/books/delete/:bookId";