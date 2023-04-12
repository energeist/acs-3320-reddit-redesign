const User = require('../models/user');

module.exports = (app) => {

    // Root path
    app.get('/', (req, res) => {
      res.render('home');
    })
  
    // New user
    app.get('/users/new', (req, res) => {
      res.render('users-new');
    })
  
    // Create a user
    app.post('/users/new', (req, res) => {
      // INSTANTIATE INSTANCE OF USER MODEL
      const user = new User(req.body);
      // SAVE INSTANCE OF user MODEL TO DB AND REDIRECT TO THE ROOT
      // console.log(user)
      user.save()
        .then(() => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    });
  };
