define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        layoutView   = require('app/views/Layout'),
        HomeView    = require('app/views/Home'),
        MovieView    = require('app/views/Movie'),
        MovieEdit   = require('app/views/MovieEdit'),
        ActorView    = require('app/views/Actor'),

        $body = $('body'),
        layoutView = new layoutView({el: $body}).render(),
        $content = $("#content", layoutView.el),
        homeView = new HomeView({el: $content});

    // Close the search dropdown on click anywhere in the UI
    $body.click(function () {
        $('.dropdown').removeClass("open");
    });

    $("body").on("click", "#searchNow", function (event) {
        event.preventDefault();
        layoutView.search();
    });

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "movie/view/:id": "movieDetails",
            "movie/edit/:id": "movieEdit",
            "actor/view/:id": "actorDetails"
        },

        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
            layoutView.selectMenuItem('home-menu');
        },

        movieDetails: function (id) {
            require(["app/views/Movie", "app/models/Movie"], function (MovieView, models) {
                var movie = new models.Movie({id: id});
                movie.fetch({
                    success: function (data) {
                        var view = new MovieView({model: data, el: $content});
                        view.render();
                    }
                });
                layoutView.selectMenuItem();
            });
        },

        movieEdit: function (id) {
            require(["app/views/MovieEdit", "app/models/Movie"], function (MovieView, models) {
                var movie = new models.Movie({id: id}); 
                movie.fetch({
                    success: function (data) {
                        var view = new MovieEdit({model: data, el: $content});
                        view.render();
                    }
                });
                layoutView.selectMenuItem();
            });
        },

        actorDetails: function (id) {
            require(["app/views/Actor", "app/models/Actor"], function (ActorView, models) {
                var actor = new models.Actor({id: id});
                actor.fetch({
                    success: function (data) {
                        var view = new ActorView({model: data, el: $content});
                        view.render();
                    }
                });
                layoutView.selectMenuItem();
            });
        }


    });

});