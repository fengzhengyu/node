const express = require('express');
const router = express.Router();


module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.redirect('/posts')
});
router.get('/about', (req, res, next) => {
 
    res.render('blog/index', {
      title: 'about me',
      //  articles: articles
    });

})
router.get('/contact', (req, res, next) => {
 
  res.render('blog/index', {
    title: 'contact me',
    //  articles: articles
  });

})