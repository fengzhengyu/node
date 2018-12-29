
var mongoose = require('mongoose')

var movieSchema = new mongoose.Schema({
  title:String,
  director: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
})

movieSchema.statics = {
  fetch: function(cb){ //取所有数据 排序
    return this
      .find({})
      .sort('meta.updateAt')
      exec(cb);

  },
  findById: function(id,cb){
    return this
      .findOne({id:id})
      
      exec(cb)
  }
}
module.exports = movieSchema;