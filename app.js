
require('dotenv').config();

const express = require('express');
const path = require('path'); 
const authRouter = require('./routes/auth');
const connectDB = require('./db/connectDB');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const PlaceModel = require('./models/placeModel');
const flash = require('connect-flash');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.resolve(__dirname, './public', 'images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const uploadFile = multer({storage: storage})

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


app.get('/', (req, res) => {
    if (req.session.user) {
        const {user} = req.session;
        PlaceModel
            .find({creator: user.id})
            .then(places => {
                res.render('index', {user, places})
            })
            .catch( error => console.log(error));
    } else {
        res.render('hello-page', {regErrors: req.flash('regErrors')});
    }
    
});

app.get('/login-page', (req, res) => {
    res.render('login-page', {errors: req.flash('errors')});
})

app.use('/auth', authRouter);

app.post('/create_post', uploadFile.single('picture'), (req, res) => {
    let placeBody = {...req.body};
    placeBody['creator'] = req.session.user.id;
    placeBody['picture'] = req.file.filename;

    const placeObj = new PlaceModel(placeBody);

    placeObj
        .save()
        .then(place => {
            res.json(place)
        })
        .catch(error => {
            console.log(error)
        })

});


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
