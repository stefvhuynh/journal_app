window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Journal.posts = new Journal.Collections.Posts();
    Journal.posts.fetch({
      success: function () {
        Journal.router = new Journal.Routers.Posts(
          $('#sidebar'),
          $('#content')
        );
        Backbone.history.start();
      }
    });

  }
};

$(document).ready(function(){
  Journal.initialize();
});
