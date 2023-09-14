const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRouter = require('./routes/home');
const cartRouter = require('./routes/cart');
const coursesRouter = require('./routes/courses')
const addRouter = require('./routes/add')

const app = express()

const hbs = exphbs.create(
    {
        defaultLayout: 'main',
        extname: 'hbs'
    }
)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRouter);

app.use('/courses', coursesRouter)

app.use('/add', addRouter)

app.use('/cart', cartRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})