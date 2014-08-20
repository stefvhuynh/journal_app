Journal.Routers.Posts = Backbone.Router.extend({
  initialize: function ($sidebar, $content) {
    this.$sidebar = $sidebar;
    this.$content = $content;

    this.index();

    if (Journal.posts.length > 0) {
      var latestPostId = Journal.posts.at(Journal.posts.length - 1).get('id');
      this.show(latestPostId);
    } else {
      this.new();
    }
  },

  routes: {
    'posts/new': 'new',
    'posts/:id': 'show'
  },

  index: function() {
    var indexView = new Journal.Views.PostsIndexView();
    this.$sidebar.append(indexView.render().$el);
  },

  new: function () {
    this.$content.empty();
    var formView = new Journal.Views.PostFormView();
    this.$content.append(formView.render().$el);
  },

  show: function (id) {
    this.$content.empty();
    var showView = new Journal.Views.PostShowView({ id: id });
    this.$content.append(showView.render().$el);
  },

  destroy: function (post) {
    this.$content.empty();
    var title = post.escape('title');
    this.$content.append('<h2>' + title + ' destroyed!</h2>');
  }

});