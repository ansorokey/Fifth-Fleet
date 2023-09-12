const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Routers
const indexRouter = require('./routes');

// Reads the environment from config
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize express application
const app = express();

// Middleware for logging info about request and response
app.use(morgan('dev'));

// Middleware for cookies and parsing JSON requst bodies
app.use(cookieParser());
app.use(express.json());

// Only use CORS in dev since everything comes
// from the same source in production
if (!isProduction) {
    app.use(cors());
}

// Middleware that sets additional headers for security
// Allows images with urls to render in deployment
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Sets the csurf token and creates the req.csrfToken method
// The csrf cookie set is http readable only
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

// Use router
app.use(indexRouter);

module.exports = app;
