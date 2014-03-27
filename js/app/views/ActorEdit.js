define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MovieListView       = require('app/views/MovieList'),
        templates           = require('text!templates/ActorEdit.html'),


        template = _.template(templates);

    return Backbone.View.extend({
        _modelBinder: undefined,

        initialize:function () {
            this._modelBinder = new Backbone.ModelBinder();

            this.model.on("change", function(){
                this.model.sync('write');
            }, this);

        },

        close: function(){
            this._modelBinder.unbind();
        },

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

            this._modelBinder.bind(this.model, this.$el);

            return this;
        }
    });

});