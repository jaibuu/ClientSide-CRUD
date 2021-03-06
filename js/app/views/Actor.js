define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MovieListView       = require('app/views/MovieList'),
        templates           = require('text!templates/Actor.html'),

        template = _.template(templates);

    return Backbone.View.extend({

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.model.movies.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        $('.no-movies').show();
                    }
                }
            });
            var listView = new MovieListView({collection: this.model.movies, el: $('.movie-list', this.el)});
            listView.render();
            return this;
        }
    });

});