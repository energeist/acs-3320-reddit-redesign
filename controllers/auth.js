const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));
  // SIGN UP POST ACTION
  app.post('/sign-up', async (req, res) => {
    try {
      // Create User
      const user = await new User(req.body);
      const savedUser = await user.save();
      const token = await jwt.sign(
        { _id: user._id }, 
        process.env.SECRET, 
        { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.redirect('/');
    } catch(err) {
      console.log(err.message);
      return res.status(400).send({ err });
    }
  });
};