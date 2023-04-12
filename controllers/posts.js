const Post = require('../models/post');

module.exports = (app) => {

  // Index posts
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
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
