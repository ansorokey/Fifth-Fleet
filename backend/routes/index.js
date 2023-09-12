const express = require('express');

// Initialize express router
const router = express.Router();

// Define express route (path, middleware, f(e, r, r, n){})
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// export router
export default router;
