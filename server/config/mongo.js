const env = process.env.NODE_ENV;

const mongo = {
  server: (env === 'production') ? 'localhost:39000': 'localhost:39000',
};

export default mongo;
