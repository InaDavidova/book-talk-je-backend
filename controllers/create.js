const { createBook } = require("../services/book");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("create", { title: "Create Post" });
  },
  async post(req, res) {
    let { title, author, image, review, genre, stars } = req.body;
    const userId = req.session.user.id;

    title = title.trim();
    author = author.trim();
    image = image.trim();
    review = review.trim();
    genre = genre.trim();
    stars = stars.trim();

    const book = {
      title,
      author,
      image,
      review,
      genre,
      stars: Number(stars),
      owner: userId,
    };

    try {
      await createBook(book);
      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("create", { title: "Create Post", error: errors[0], book });
    }
  },
};
