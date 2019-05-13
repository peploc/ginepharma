require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require("cors");

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
require('./passport/index');    


mongoose
  .connect(process.env.DB_REMOTE, {useNewUrlParser: true})
  .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`) })
  .catch(err => { console.error('Error connecting to mongo', err) });

// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// configuración CORS
const whiteList = ["http://localhost:3000", 'https://ginepharma.herokuapp.com/']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whiteList.includes(origin);
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// configuración sesión
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// middlewares sesión
app.use(passport.initialize());
app.use(passport.session());
      
app.use(express.static(path.join(__dirname, "public")));


const index = require('./routes/index');
app.use('/api', index);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

const pharmaRoutes = require('./routes/pharma-routes');
app.use('/api', pharmaRoutes);

app.use((req, res) => { res.sendFile(`${__dirname}/public/index.html`); })

module.exports = app;
