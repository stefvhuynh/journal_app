Journal.Models.Post = Backbone.Model.extend({
  toJSON: function() {
    return { post: _.clone(this.attributes) }
  }
});