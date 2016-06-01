// TodoItems.js
// -------------
define(["jquery","backbone","../models/TodoItem"],

  function($, Backbone, TodoItem) {

    // Creates a new Backbone Collection class object
    var TodoItems = Backbone.Collection.extend({

      // Tells the Backbone TodoItems that all of it's models will be of type TodoItem (listed up top as a dependency)
      model: TodoItem,

      url: "http://jsonplaceholder.typicode.com/todos"

    });

    // Returns the TodoItems class
    return TodoItems;

  }

);