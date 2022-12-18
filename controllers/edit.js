const { getBookById, updateBook } = require("../services/book");
const mapErrors = require("../util/mapErrors");

module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const book = await getBookById(id);
    res.render("edit", { title: "Edit Post", book });
  },
  async post(req, res) {
    let { title, author, image, review, genre, stars } = req.body;

    title = title.trim();
    author = author.trim();
    image = image.trim();
    review = review.trim();
    genre = genre.trim();
    stars = stars.trim();

    const id = req.params.id;

    const book = {
      title,
      author,
      image,
      review,
      genre,
      stars: Number(stars),
    };

    try {
      await updateBook(id, book);
      res.redirect(`/details/${id}`);
    } catch (err) {
      const errors = mapErrors(err);
      res.render("edit", {
        title: "Edit Post",
        error: errors[0],
        book: { ...book, _id: id },
      });
    }
  },
};
