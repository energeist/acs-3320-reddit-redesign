const User = require('../models/user');

module.exports = (app) => {
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF USER MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF USER MODEL TO DB AND REDIRECT TO THE ROOT
    console.log(user)
    post.save(() => res.redirect('/'));
  });
};