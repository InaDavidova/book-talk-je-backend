const { wish } = require("../services/book");

module.exports = {
  async wish(req, res) {
    const bookId = req.params.id;
    const userId = req.session.user.id;

    await wish(bookId, userId);
    res.redirect(`/details/${bookId}`);
  },
};
