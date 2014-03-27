define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        movies = [
            {"id": 1, "name": "Vertigo",
                "releaseYear": 1958, "grossIncome": 14000000, "directorName": "Alfred Hitchcock", "genre": "Crime"},
            {"id": 2, "name": "North by Northwest",
                "releaseYear": 1959, "grossIncome": 9840000,  "directorName": "Alfred Hitchcock", "genre": "Mystery" },
            {"id": 3, "name": "Psycho",
                "releaseYear": 1960, "grossIncome": 60000000, "directorName": "Alfred Hitchcock", "genre": "Horror"}
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                movie = null,
                l = movies.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (movies[i].id === id) {
                    movie = movies[i];
                    break;
                }
            }
            deferred.resolve(movie);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = movies.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred(),
                results = movies.filter(function (element) {
                    return managerId === element.managerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },


        Movie = Backbone.Model.extend({

            initialize: function () {
                this.reports = new ReportsCollection();
                this.reports.parent = this;
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        MovieCollection = Backbone.Collection.extend({

            model: Movie,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        ReportsCollection = Backbone.Collection.extend({

            model: Movie,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByManager(this.parent.id).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Movie: Movie,
        MovieCollection: MovieCollection,
        ReportsCollection: ReportsCollection
    };

});