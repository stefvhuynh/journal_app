Journal.Views.PostShowView = Backbone.View.extend({
  initialize: function (params) {
    this.id = parseInt(params.id);

    this.listenTo(Journal.posts,
      'sync reset change:title change:body',
      this.render
    );
  },

  events: {
    'dblclick .post-title': 'editTitle',
    'dblclick .post-body':  'editBody',
    'change .new-title':    'changeTitle',
    'change .new-body':     'changeBody',
    'blur .new-title':      'restoreTitle',
    'blur .new-body':       'restoreBody'
  },

  template: JST['post_show'],

  render: function () {
    var post = Journal.posts.get(this.id);
    var content = this.template({ post: post });
    this.$el.html(content);

    return this;
  },

  editTitle: function (event) {
    this.$oldTitle = $(event.currentTarget);
    var oldTitleText = event.currentTarget.textContent;
    var $input = $('<input type="text" class="new-title">');

    $('.post-title').replaceWith($input);
    var $newInput = $('.new-title');
    $newInput.focus();
    // next two lines are required to put cursor at end of line
    // hacky, I know...
    $newInput.val('');
    $newInput.val(oldTitleText);
  },

  editBody: function (event) {
    this.$oldBody = $(event.currentTarget);
    var oldBodyText = event.currentTarget.innerHTML;
    var $input = $('<textarea class="new-body"></textarea>');

    $('.post-body').replaceWith($input);
    var $newInput = $('.new-body');
    $newInput.focus();
    $newInput.html('');
    $input.html(oldBodyText);
  },

  changeTitle: function (event) {
    var newTitle = event.currentTarget.value;
    var post = Journal.posts.get(this.id);
    post.save({title: newTitle});
  },

  restoreTitle: function (event) {
    $('.new-title').replaceWith(this.$oldTitle);
  },

  changeBody: function (event) {
    var newBody = $(event.currentTarget).val();
    var post = Journal.posts.get(this.id);
    post.save({body: newBody});
  },

  restoreBody: function (event) {
    $('.new-body').replaceWith(this.$oldBody);
  },

});