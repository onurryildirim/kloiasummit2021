const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./config/winston');

// Express Config
const app = express();

// Cors Setting
// app.use(cors(config.corsOptions));

app.use(helmet());
app.use(morgan('combined', { stream: logger.stream })); // Logger stream from winston

app.use('/api', (req, res, next) => {
  console.log('Time:', Date.now())
  next()
})


// Catch all for error messages.
app.use((err, req, res, next) => {
  if (err) {
    if (err.status == null) {
      logger.error(err.stack, 'Internal unexpected error from');
      res.status(500);
      res.json({
        message: err.message,
        type: err.code,
        stack: err.stack,
      });
    } else {
      res.status(err.status);
      res.json({
        message: err.message,
        type: err.code,
        stack: err.stack,
      });
    }
  } else {
    next();
  }
});

module.exports = app;
