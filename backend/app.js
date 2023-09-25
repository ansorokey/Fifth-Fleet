const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const path = require('path');
const { createServer } = require('http');
// import guildmessage
// WS - WORKS
// const WebSocket = require('ws');

// backendserver port listens on Render's default port
// the websocket port will listen to a different port
// const port = process.env.WSPORT || 5000;

// Routers
const indexRouter = require('./routes');

// Reads the environment from config
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize express application
const app = express();

// Middleware for logging info about request and response
app.use(morgan('dev'));

// WS
// returns the matchig static file
// app.use(express.static(path.join(__dirname, '../frontend/public')));

// WS
// returns the index if the static file isnt found
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
// });

// WS - WORKS
// create a server for websockets
// const server = createServer(app);

// WS - WORKS
// const wss = new WebSocket.Server({server});

// WS - WORKS
// wss.on('connection', (ws) => {
//   // message recieved
//   ws.on('message', (jsonMsg) => {
//     const parsed = JSON.parse(jsonMsg);
//     const id = `${parsed.session} + ${parsed.id}`;
//     ws.id = id;

//     if (parsed.type === 'chat') {
//       const newMsg = JSON.stringify({
//         content: parsed.content,
//         username: parsed.username
//       });

//       wss.clients.forEach(client => {
//         // possible ready states are CONNECTING, OPEN, CLOSING, CLOSED
//         if (client.id === id) {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(newMsg);
//           }
//         }
//       })

//     }



//   });

//   // close recieved
//   ws.on('close', (e) => {
//     // ...
//   });
// });

// WS - WORKS
// server.listen(port, () => console.log(`WS listening for messages on ${port}`));

// Middleware for cookies and parsing JSON requst bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // line to use AWS
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

// Error handling
// Middleware that creates a 404 error if no matching route is found
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Middleware to catch Validation errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Final error handler
// Returns a formatted error message in JSON
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
