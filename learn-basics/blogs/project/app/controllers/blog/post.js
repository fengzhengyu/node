const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const category = mongoose.model('Category');
module.exports = (app) => {
  app.use('/posts', router);
};
// 文章列表
router.get('/', (req, res, next) => {
  Post.find({published:true})
  .sort('created')
  .populate('author')
  .populate('category')
  .exec((err, posts) => {
    // return res.json(posts);
    if (err) return next(err);

    var pageNum = Math.abs(parseInt(req.query.page,10)) ||1;
    var pageSize = 10;
    var totalCout =  posts.length;
    var pageCount= Math.ceil(totalCout/pageSize);
    if(pageNum > pageCount){
      pageNum = pageCount
    }

    res.render('blog/index', {
      title: '文章列表',
      posts: posts.slice((pageNum-1)*pageSize,pageNum*pageSize), //截取当前页的数据 page为1 从（0 ，10）page为2 （10,20）
      pageNum: pageNum,
      pageCount: pageCount
    });
  });
});
// 文章分类
router.get('/category/:name', (req, res, next) => {
  category.findOne({name:req.params.name}).exec((err,category)=>{
    if(err){
      return next(err);
    }

    Post.find({category:category,published:true})
      .sort('created')
      .exec((err,posts)=>{
        if(err){
          return next(err);
        }
        res.render('blog/category', {
          title: '文章分类',
          posts: posts,
          category: category
         
        });
      })
  })
 
})

router.get('/view', (req, res, next) => {
 
})
router.get('/comment', (req, res, next) => {
 

})
router.get('/favoutite', (req, res, next) => {
 

})