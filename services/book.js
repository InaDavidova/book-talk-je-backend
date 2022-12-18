const Book = require("../models/Book");

async function createBook(book) {
  const result = new Book(book);
  await result.save();
}

async function getAllBooks() {
  const books = await Book.find({}).lean();
  return books;
}

async function getBookById(id) {
  const post = await Book.findById(id)
    .populate("owner")
    .populate("wishinglist")
    .lean();
  return post;
}

async function deleteBook(id) {
  await Book.findByIdAndDelete(id);
}

async function updateBook(id, book) {
  await Book.findByIdAndUpdate(id, book, { runValidators: true });
}

async function getUserWishBooks(userId) {
  const books = await Book.find({ wishinglist: userId })
    .populate("owner")
    .lean();
  return books;
}

async function wish(bookId, userId) {
  const book = await Book.findById(bookId);

  if (book.wishinglist.includes(userId)) {
    throw new Error("User has already has this book in his wishlist!");
  }

  book.wishinglist.push(userId);

  await book.save();
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  getUserWishBooks,
  wish,
};
