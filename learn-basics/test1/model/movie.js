var mongoose =require('mongppse');
var MovieSchema = require('../schemas/movie')

var Movie = mongoose.model('Movie',MovieSchema)


module.exports = Movie