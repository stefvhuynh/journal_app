Journal.Routers.Posts = Backbone.Router.extend({
  initialize: function ($sidebar, $content) {
    this.$sidebar = $sidebar;
    this.$content = $content;

    var indexView = new Journal.Views.PostsIndexView();
    this.$sidebar.append(indexView.render().$el);

    var latestPostId = Journal.posts.at(Journal.posts.length - 1).get('id');
    var showView = new Journal.Views.PostShowView({ id: latestPostId });
    this.$content.append(showView.render().$el);
  },

  routes: {
    'posts/new': 'new',
    'posts/:id': 'show'
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
  }

});