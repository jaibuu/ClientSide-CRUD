define(function (require) {

    "use strict";

    var $                       = require('jquery'),
        _                       = require('underscore'),
        Backbone                = require('backbone'),
        ActorListItemView    = require('app/views/ActorListItem');

    return Backbone.View.extend({

        initialize: function () {
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.render, this);
        },

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function (actor) {
                this.$el.append(new ActorListItemView({model: actor}).render().el);
            }, this);
            return this;
        }
    });

});

