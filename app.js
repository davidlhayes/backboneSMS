var sms = sms || {};
var active = active || {};

// blueprints for models, views, and collections
sms.model = Backbone.Model.extend({
  initialize: function() {
    console.log('A model has been instantiated.');
  }
});
sms.collection = Backbone.Collection.extend({
  model: sms.model,
  initialize: function() {
    console.log('A collection has been instantiated.');
  }
});
sms.modelView = Backbone.View.extend({
  el: $('.list'),
  initialize: function() {
    console.log('A modelView has been instantiated.');
  },
  render: function() {
    var data;
    var tpl = 'Sent from: ' + data.sender + ' >> ' + data.message;
    this.$el.append(tpl);
  }
});
sms.collectionView = Backbone.View.extend({
  events: {
    'click button': 'render'
  },
  initialize: function() {
    console.log('A collectionView has been instantiated.');
  },
  render: function() {
    console.log('clicked!');
  }
});
// end blueprints


// active! ole!
$(document).ready(function() {
  active.collection = new sms.collection();
  active.collectionView = new sms.collectionView({
    el: $('.ui'),
    collection: active.collection
  });
});
// end active
