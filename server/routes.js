import path from 'path';

export default (app) => {
  // app.use('/api/shows', require('./api/shows'));
  // app.use('/api/episodes', require('./api/episodes'));
  // app.use('/api/tracks', require('./api/tracks'));
  app.use('/api/user', require('./api/user'));

  app.use('/api/sample', require('./api/sample'));

  app.route('/*').get((req, res) => {
    res.sendFile(path.resolve('./server/views/index.html'));
  });
};
