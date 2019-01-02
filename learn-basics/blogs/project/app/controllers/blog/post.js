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
// 文章详情

router.get('/view/:id', (req, res, next) => {
  if(!req.params.id){
    return next(new Error('no post id provided'))
  }
  Post.findOne({_id:req.params.id})
  .populate('author')
  .populate('category')
  .exec((err,post)=>{
    if(err){
      return next(err);
    }
    res.render('blog/view',{
      post:post
    })
  })
 
})
// 评论提交
router.post('/comment/:id', (req, res, next) => {
  if(!req.body.email){
    return next(new Error('no email provided for commenter'))
  }
  if(!req.body.content){
    return next(new Error('no content provided for commenter'))
  }
  Post.findOne({_id:req.params.id})
  .exec((err,post)=>{
    if(err){
      return next(err);
    }
    var comment = {
      email: req.body.email,
      content: req.body.content,
      created: new Date()
    }

    post.comments.unshift(comment);
    // push版本冲突   
    // 解决
    //newSchema({},{usePushEach: true}) 

    
    post.markModified('comments');
    post.save((err,post)=>{
      console.log(post)
      if(err){
        return next(err);
      }
      res.redirect('/posts/view/'+post._id)
    })
    
  })
 


})
router.get('/favoutite', (req, res, next) => {
 

})