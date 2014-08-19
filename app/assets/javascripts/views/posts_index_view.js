Journal.Views.PostsIndexView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Journal.posts,
      'sync add remove reset change:title',
      this.render
    );
  },

  template: JST['posts_index'],

  events: {
    'click .delete-button': 'destroy'
  },

  render: function () {
    var content = this.template({ posts: Journal.posts });
    this.$el.html(content);
    return this;
  },

  destroy: function (event) {
    var dataId = parseInt($(event.currentTarget).attr('data-id'));
    var post = Journal.posts.findWhere({ id: dataId });
    post.destroy();
  }
});