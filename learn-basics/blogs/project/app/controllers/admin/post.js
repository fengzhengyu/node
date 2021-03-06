const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const category = mongoose.model('Category');

const slug = require('slug');


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

//后台文章添加

router.get('/add', (req, res, next) => {
 
  res.render('admin/post/add',{
    title: '添加文章'
  })
  
 
})
//后台文章编辑提交
router.post('/add', (req, res, next) => {
  
  var title = req.body.title,
  category = req.body.category
  content = req.body.content;


  User.findOne((err,author)=>{
   
    if(err){
      return next(err);
    }
    var post  = new Post({
      title: title,
      slug: slug(title),
      category: category,
      content: content,
      author: author,
      published: true,
      meta: {favourites:0},
      comments: [],
      created: new Date()
     
    });
   

    post.save((err,doc)=>{
      if(err){
        console.log(err)
        res.redirect('/admin/posts/add')
        // return next(err);
      }
      res.redirect('/admin/posts')
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