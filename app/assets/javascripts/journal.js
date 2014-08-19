window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Loaded!");
  }
};

$(document).ready(function(){
  Journal.initialize();
});
