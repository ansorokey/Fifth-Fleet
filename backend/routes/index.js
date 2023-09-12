const express = require('express');

// Initialize express router
const router = express.Router();

// Define express route (path, middleware, f(e, r, r, n){})
// Hello World test route
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// re-sets and responds with a new XRSF token
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
});

// export router
module.exports = router;
