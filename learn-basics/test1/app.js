
var express = require('express');
var prot = process.env.PORT || 3000
var app = express();
var path = require('path')
var mongoose = require('mongoose');
var Movie = require('./model/movie')
mongoose.connect('mongodb://localhost/movie')

app.set('views','./views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(prot);
console.log('server started on prot '+prot);

// index page
app.get('/',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);

    }
    res.render('index',{
      title: 'fengzheng 首页',
      movies: movies
    })
  })
  
})

// detail
app.get('/detail/:id',function(req,res){
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title: 'fengzheng '+movie.title,
      movie: movie
    })
  })

})
// admin
app.get('/admin',function(req,res){
  res.render('admin',{
    title: 'fengzheng 后台录入页'
  })
})

app.post('/admin/new',function(req,res){
  var id= req.body.movie.id;
  var movieObj = req.body.movie;
  var _movie;
  if(id != 'undefined'){

  }
})
// list
app.get('/admin/list',function(req,res){
  res.render('list',{
    title: 'fengzheng 列表页'
  })
})

