Journal.Views.PostFormView = Backbone.View.extend({

  template: JST['post_form'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template();
    this.$el.append(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var that = this;
    var formData = $(event.currentTarget).serializeJSON().post;

    Journal.posts.create(formData, {
      wait: true,

      success: function (data) {
        var id = data.get('id');
        var fragment = 'posts/' + id;
        Journal.router.navigate(fragment, { trigger: true });
      },

      error: function (data, error) {
        $('#errors').remove();
        var $errors = $('<ul id="errors"></ul>');
        that._formatErrors($errors, error);

        that.$el.prepend($errors);
      }
    });
  },

  _formatErrors: function ($ul , error) {
    var errors = JSON.parse(error.responseText);

    for (var key in errors) {
      for (var i = 0; i < errors[key].length; i++) {
        var $li = $('<li class="error-li">' + key + ' ' + errors[key][i] + '!</li>');
        $ul.append($li);
      }
    }
  }

});



