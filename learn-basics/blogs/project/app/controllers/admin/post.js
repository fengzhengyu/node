const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const category = mongoose.model('Category');
module.exports = (app) => {
  app.use('/admin/posts', router);
};
// 后台文章列表
router.get('/', (req, res, next) => {
  // 排序
  var  sortby = req.query.sortby?req.query.sortby: 'created',
  sortdir = req.query.sortby? req.query.sortdir: 'desc';
  if(['title','category','author','created','published'].indexOf(sortby) === -1){
    sortby = 'created'
  }
  if(['desc','asc'].indexOf(sortdir) === -1){
    sortdir = 'desc';
  }
  let sortObj = {};
  sortObj[sortby] = sortdir


  // 条件查询
  var conditions = {};
  if(req.query.category){
    conditions.category = req.query.category.trim();
  }
  if(req.query.author){
    conditions.author = req.query.author.trim();

  }


  User.find({},(err,authors)=>{
    if (err) return next(err);
  
    Post.find(conditions)
    .sort( sortObj)
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
    
      res.render('admin/post/index', {
        title: '文章列表',
        posts: posts.slice((pageNum-1)*pageSize,pageNum*pageSize), //截取当前页的数据 page为1 从（0 ，10）page为2 （10,20）
        authors: authors,
        pageNum: pageNum,
        sortby : sortby ,
        sortdir: sortdir,
        pageCount: pageCount,
        filter: {
          category:  req.query.category || "",
          author:  req.query.author || ""
        }
      });
    });
  })
  
});

//后台文章编辑

router.get('/add', (req, res, next) => {
 
  res.render('admin/post/add',{
    title: '添加文章'
  })
  
 
})
//后台文章编辑提交
router.post('/edit/:id', (req, res, next) => {
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
//后台文章删除
router.get('/delete/:id', (req, res, next) => {
 
  if(!req.params.id){
    return next(new Error('no posts id provided'))
  }
  Post.remove({_id:req.params.id}).exec((err,removed) =>{
    if(err){
      return next(err);
    }
   
    res.redirect('/admin')
  })
})