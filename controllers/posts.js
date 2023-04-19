const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  // Index posts
  app.get('/', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({}).lean().populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  })

  // New post
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', { currentUser });
  })

  // Create a post
  app.post('/posts/new', async (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    if (req.user) {
      try {
        const userId = req.user._id;
        const currentUser = req.user;
        subredditArray = req.body.subreddits.replaceAll(' ','').split(',');
        req.body.subreddits = subredditArray;
        const post = new Post(req.body);
        post.author = userId;
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
        return res.redirect('/');
      } catch(err) {
        console.log(err.message);
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // Show a post with :id
  app.get('/posts/:id', async (req, res) => {
    try {
      const currentUser = req.user;
      const post = await Post.findById(req.params.id).populate('comments').lean();
      return res.render('posts-show', { post, currentUser });
    } catch(err) {
      console.log(err.message);
    }   
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const currentUser = req.user;
      let posts = await Post.find({ subreddits: req.params.subreddit }).lean();
      return res.render('posts-index', { posts, currentUser });
    } catch(err) {
      console.log(err.message);
    }
  });
  
}; //This close bracket is for the module.exports above and should always be last line