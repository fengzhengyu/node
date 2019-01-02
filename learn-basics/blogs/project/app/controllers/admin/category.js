const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const category = mongoose.model('Category');
module.exports = (app) => {
  app.use('/admin/categories', router);
};
// 后台分类列表
router.get('/', (req, res, next) => {

   res.render('admin/categories/index',{
     title:'分类列表'
    })
});

//后台添加分类

router.get('/add', (req, res, next) => {
  res.render('admin/categories/add',{
    title:'添加分类'
   })
 
})
//后台提交分类
router.post('/add/:id', (req, res, next) => {
  


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