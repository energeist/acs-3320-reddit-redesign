const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    try {
      userId = req.user._id;
      const user = await User.findById(userId);
      const comment = await new Comment(req.body);
      comment.author = req.user._id;
      const savedComment = await comment.save();
      const post = await Post.findById(req.params.postId);
      post.comments.unshift(comment);
      const savedPost = await post.save();
      user.comments.unshift(comment);
      const savedUser = await user.save();
      return res.redirect('/');
    } catch(err) {
      console.log(err);
    }
  });
};