define(function (require) {

    "use strict";

    var $                       = require('jquery'),
        _                       = require('underscore'),
        Backbone                = require('backbone'),
        ActorListItemView    = require('app/views/ActorListItem');

    return Backbone.View.extend({

        initialize: function (attrs) {
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.render, this);
            this.options = attrs;
        },

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function (actor) {
                this.$el.append(new ActorListItemView({model: actor, displayMode: this.options.displayMode}).render().el);
            }, this);
            return this;
        }
    });

});

