const Post = require('../models/post');

module.exports = (app) => {

  // Root path
  app.get('/', (req, res) => {
    res.render('home');
  })

  // New post
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  })

  // Create a post
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    // console.log(post)
    post.save()
      .then(() => {
        res.redirect('/')
      })
      .catch(err => console.log(err))
  });
};