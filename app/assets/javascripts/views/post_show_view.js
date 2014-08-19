Journal.Views.PostShowView = Backbone.View.extend({
  initialize: function (params) {
    this.id = parseInt(params.id);

    this.listenTo(Journal.posts,
      'sync reset change:title',
      this.render
    );
  },

  events: {
    'dblclick .post-title': 'editTitle',
    'dblclick .post-body': 'editBody',
    'change .new-title':      'changeTitle',
    'change .new-body':      'changeBody'
  },

  template: JST['post_show'],

  render: function () {
    var post = Journal.posts.get(this.id);
    var content = this.template({ post: post });
    this.$el.html(content);

    return this;
  },

  editTitle: function (event) {
    var oldTitle = event.currentTarget.textContent;

    $('.post-title').replaceWith(function () {
      var $input = $('<input type="text" class="new-title">');
      $input.attr('value', oldTitle);

      return $input;
    });
  },

  editBody: function (event) {
    var oldBody = event.currentTarget.innerHTML;

    $('.post-body').replaceWith(function () {
      var $input = $('<textarea class="new-body"></textarea>');
      $input.html(oldBody);

      return $input;
    });
  },

  changeTitle: function (event) {
    var newTitle = event.currentTarget.value;
    var post = Journal.posts.get(this.id);
    post.save({title: newTitle});
  },

  changeBody: function (event) {
    var newBody = $(event.currentTarget).val();
    var post = Journal.posts.get(this.id);
    post.save({body: newBody});
  }

});