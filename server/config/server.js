const env = process.env.NODE_ENV;

export default {
  secret: 'thecakeisalie',
  mongo: (env === 'production') ? 'localhost:39000' : 'localhost:27017',
};
