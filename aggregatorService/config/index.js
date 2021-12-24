
const {
  NODE_ENV
} = process.env;

exports.corsOptions = {
  origin: NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://localhost',
  credentials: true,
};

