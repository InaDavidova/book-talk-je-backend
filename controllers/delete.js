const { deleteBook, getBookById} = require("../services/book");

module.exports = {
  async delBook(req, res) {
    const id = req.params.id;
    const post = await getBookById(id);
    
    let isOwner = false;

    if (req.session.user && req.session.user.id == post.owner._id) {
      isOwner = true;
    }

    if (isOwner) {
      await deleteBook(id);
      res.redirect("/catalog");
    } else {
      res.redirect(`/details/${id}`);
    }
  },
};
