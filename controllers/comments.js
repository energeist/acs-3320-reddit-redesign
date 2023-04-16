const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
app.post('/posts/:postId/comments', async (req, res) => {
  // INSTANTIATE INSTANCE OF MODEL
  try {
    const comment = await new Comment(req.body);
    comment.save()
    return res.redirect('/')
  } catch(err) {
    console.log(err);
  }
  // SAVE INSTANCE OF Comment MODEL TO DB
  // comment.save()
  //   // REDIRECT TO THE ROOT
  //   .then(() => res.redirect('/'))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  });
};