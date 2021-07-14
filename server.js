const express = require('express')
const hbs = require('express-handlebars')
require('dotenv').config()
const port = process.env.port || 3000

const app = express()

// setup handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// routes
app.use('/email', require('./routes/email.route'))
app.get('/', (req, res) => {
  res.render('home.hbs')
})

app.listen(port, () => console.log(`App running on localhost:${port}`))
