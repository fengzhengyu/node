var  express = require('express');

var app = express();
// 内置中间键 静态文件
app.use(express.static('public'))

function middleware1(req,res,next){ //通过query 确定进入那个中间键
  if(req.query.id){ 
    req.message += 'hello from middleware1\n';
    next();
  }
  else(
    res.send('hello form middleware 1')
  )
}
function middleware2(req,res, next){
  req.message += 'hello from middleware2\n';
  next();
}
app.get('/', middleware1,middleware2,function(req,res,next){ //三个中间键
  res.send(req.message+'middleware3');
})
app.listen(3000);

console.log('Server starting  on port 3000')
