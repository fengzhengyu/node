$(function(){
  String.prototype.queryURLParameter = function(){
    var obj = {},
    reg = /([^?=&#]+)=([^?=&#]+)/g;
    this.replace(reg,function(){
        var key = arguments[1],
        value = arguments[2];
        obj[key] = value;
    })
    return obj;
  }
  


  var postCategory = $('#js-category'),
   postAuthor= $('#js-author');
    

    $('#js-filter-submit').click(function(){
  
      var category = postCategory.val(),
      author = postAuthor.val(),
      url = location.href,
      query = location.href.queryURLParameter();

      if( category){
        query.category = category;
      }
      
      if(author){

        query.author = author;
      }
      console.log(query)
      if(category&&author){
        location.href = location.pathname+'?category='+query.category +'&author='+  query.author;
    
      }else if(!category && !author){
        return;
      }else{
        if(category){
          location.href = location.pathname+'?category='+query.category ;
        }else if(author){
          location.href = location.pathname+'?author='+  query.author;
        }
      }
      
       
    })



    var ue = UE.getEditor('editor');

})