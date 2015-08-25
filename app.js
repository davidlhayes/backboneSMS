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
    this.render();
  },
  render: function() {
    var data = this.model.attributes;
    var tpl = '<li>Sent from: ' + data.sender + ' >> ' + data.message + '</li>';
    this.$el.append(tpl);
  }
});
sms.collectionView = Backbone.View.extend({
  events: {
    'click button': 'render'
  },
  initialize: function() {
    console.log('A collectionView has been instantiated.');
    // this collection.on('sync') -- live with a server
    var that = this;
    this.collection.on('change', function() {
      // this refers to the collection (not the view)
      that.render();
    });
  },
  render: function() {
    var collection = this.collection.models; //[] where the models are
    // loop through all models in our collection
    for (var model in collection) {
      new sms.modelView({
        model: collection[model]
      });
    };
    console.log('you clicked!');
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
  $('#new').on('click', function() {

    //collection creates a model based on the model attribute
    // inside of the collection blueprint/class/def etc
    active.collection.create({
      sender: 'Regina',
      message: 'Do you need some money?'
    });
  });
});
// end active
