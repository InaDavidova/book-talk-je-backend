module.exports = {
  logout(req, res) {
    delete req.session.user;
    res.redirect("/");
  },
};
