const { getAllBooks } = require("../services/book");

module.exports = {
  async catalog(req, res) {
    const books = await getAllBooks();
    res.render("catalog", { books, title: "All Books" });
  },
};
