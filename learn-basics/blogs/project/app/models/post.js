// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String,required: true //必须的 不能忽略
  },
  content: {type: String,required: true},
  slug: {type: String,required: true},
  category: {type: Schema.Types.ObjectId,ref:'Category'}, // ref 自动关联对应的表
  author: {type: Schema.Types.ObjectId,ref: 'User'},
  published: {type: Boolean,default: false},
  meta: {type: Schema.Types.Mixed},
  comments: [Schema.Types.Mixed],
  created: {type: Date}
});

// ArticleSchema.virtual('date')
//   .get(() => this._id.getTimestamp());

mongoose.model('Post', PostSchema);

