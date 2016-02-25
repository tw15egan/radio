import 'babel-polyfill';
import webpack from 'webpack';
import config from './webpack.config';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const compiler = webpack(config);

// Express middleware

// Body parser adds the {body} object to the
// request object - req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

routes(app);

// Spin up the server itself
app.listen(3000, 'localhost', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at http://localhost:3000');
  }
});
