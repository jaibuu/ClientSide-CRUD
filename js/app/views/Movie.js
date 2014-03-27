define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MovieListView    = require('app/views/MovieList'),
        templates                 = require('text!templates/Movie.html'),

        template = _.template(templates);

    return Backbone.View.extend({

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.model.reports.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        $('.no-reports').show();
                    }
                }
            });
            var listView = new MovieListView({collection: this.model.reports, el: $('.report-list', this.el)});
            listView.render();
            return this;
        }
    });

});