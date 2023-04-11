// require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.use(express.static('public'));

const hbs = handlebars.create({
    helpers: {}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    return "Hello World!"
})

app.listen(3000, () => {
  console.log('Reddit Clone listening on port localhost:3000!');
});