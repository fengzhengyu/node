const express = require('express');
const router = express.Router();
module.exports = (app) => {
  app.use('/admin',router);
};

router.get('/', (req, res, next) => {
  res.redirect('/admin/posts')
});