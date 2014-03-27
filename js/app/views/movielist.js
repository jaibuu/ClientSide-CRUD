define(function (require) {

    "use strict";

    var $                       = require('jquery'),
        _                       = require('underscore'),
        Backbone                = require('backbone'),
        MovieListItemView    = require('app/views/MovieListItem');

    return Backbone.View.extend({

        initialize: function () {
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.render, this);
        },

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function (movie) {
                this.$el.append(new MovieListItemView({model: movie}).render().el);
            }, this);
            return this;
        }
    });

});

