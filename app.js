
require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const connectDB = require('./db/connectDB');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const app = express();


app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 *24, httpOnly: true},
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

app.use(flash());

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.get('/', (req,res) => {
    res.redirect('places');
});

app.get('/login-page', (req, res) => {
    res.render('login-page', {errors: req.flash('errors')});
});

app.use('/auth', authRouter);
app.use('/places', mainRouter);


const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        })
    } catch(error) {
        console.log(error)
    }
}
  
start();
