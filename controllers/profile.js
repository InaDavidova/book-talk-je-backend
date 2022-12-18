const { getUserWishBooks } = require("../services/book");

module.exports = {
  async profile(req, res) {
    const userId = req.session.user.id;
    const books = await getUserWishBooks(userId);
    res.render("profile", {
      books,
      title: "My Wishlist",
      email: req.session.user.email,
    });
  },
};
