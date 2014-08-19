window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Journal.posts = new Journal.Collections.Posts();
    Journal.indexView = new Journal.Views.PostsIndexView();
    Journal.posts.fetch();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
