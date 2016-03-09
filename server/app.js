import 'babel-polyfill';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import socket from './socket';
import config from './config/server';
import mongoose from 'mongoose';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import passport from 'passport';

const app = express();
const compiler = webpack(webpackConfig);

// Express middleware

// Body parser adds the {body} object to the
// request object - req.body

// connect to mongodb
mongoose.connect(`mongodb://${config.mongo}/radio`);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());


routes(app);

// Spin up the server itself
const server = app.listen(3000, 'localhost', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at http://localhost:3000');
  }
});

// Spin up socket.io server
socket(server);
