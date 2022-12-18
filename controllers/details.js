const { getBookById } = require("../services/book");

module.exports = {
  async details(req, res) {
    const bookId = req.params.id;
    const user = req.session.user;

    const book = await getBookById(bookId);

    let isOwner = false;

    let userWishedToRead = false;

    if (user) {
      isOwner = user.id == book.owner._id;
      const match = book.wishinglist.find((el) => el._id == user.id);

      if (match || isOwner) {
        userWishedToRead = true;
      }
    }
    res.render("details", { book, isOwner, userWishedToRead });
  },
};
