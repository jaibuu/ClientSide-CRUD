define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        ActorListView       = require('app/views/ActorList'),
        templates           = require('text!templates/Movie.html'),

        template = _.template(templates);

    return Backbone.View.extend({

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.model.actors.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        $('.no-actors').show();
                    }
                }
            });
            var listView = new ActorListView({collection: this.model.actors, el: $('.actor-list', this.el), displayMode: 'view '});
            listView.render();
            return this;
        }
    });

});