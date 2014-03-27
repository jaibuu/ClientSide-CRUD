define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MovieListView    = require('app/views/MovieList'),
        models              = require('app/models/movie'),
        templates                 = require('text!templates/Layout.html'),

        template = _.template(templates),
        $menuItems;

    return Backbone.View.extend({

        initialize: function () {
            this.movieList = new models.MovieCollection();
        },

        render: function () {
            this.$el.html(template());
            var listView = new MovieListView({collection: this.movieList, el: $(".movie-list", this.el)});
            listView.render();
            $menuItems = $('.navbar .nav li', this.el);
            return this;
        },

        events: {
            "keyup .search-query": "search",
            "keypress .search-query": "onkeypress"
        },

        search: function (event) {
            var key = $('#searchText').val();

            //why doesn't this fetch up to date information?
            // this.movieList.trigger('refresh');
            // this.movieList.trigger('reset');
            // this.movieList.trigger('update');
            
            this.movieList.fetch({reset: true, data: {name: key}, success: function () {
                setTimeout(function () {
                    $('.dropdown').addClass('open');
                });
            }});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        },

        selectMenuItem: function (menuItem) {
            $menuItems.removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }

    });

});