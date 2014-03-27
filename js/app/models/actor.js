define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        actors = [
            {"id": 1, "firstName": "Random", "lastName": "Person",
                "gender": 2, "birthDate": 1324324},
            {"id": 2, "firstName": "Pseudorandom", "lastName": "Person",
                "gender": 1, "birthDate": 2132133},
            {"id": 3, "firstName": "Random", "lastName": "Subject",
                "gender": 3, "birthDate": 1324324},
            {"id": 4, "firstName": "Pseudorandom", "lastName": "Subject",
                "gender": 0, "birthDate": 2132133},
            {"id": 5, "firstName": "Deliberate", "lastName": "Person",
                "gender": 0, "birthDate": 1324324}
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                actor = null,
                l = actors.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (actors[i].id === id) {
                    actor = actors[i];
                    break;
                }
            }
            deferred.resolve(actor);
            return deferred.promise();
        },

        getLocalInstanceById = function (id) {
            var actor = null,
                l = actors.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (actors[i].id === id) {
                    actor = actors[i];
                    break;
                }
            }
            return actor;
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = actors.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findMany = function (array) {
            var deferred = $.Deferred(),
                results = actors.filter(function (element) {
                    if(array.indexOf(element.id) == -1){
                        return false;
                    } else {
                        return true;
                    }
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findAll = function () {
            var deferred = $.Deferred(),
                results = actors;
            deferred.resolve(results);
            return deferred.promise();
        },

        findByMovie = function (managerId) {
            var deferred = $.Deferred(),
                results = actors.filter(function (element) {
                    return managerId === element.managerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },


        Actor = Backbone.Model.extend({

            initialize: function () {
                this.movies = new MoviesCollection();
                this.movies.parent = this;
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                } else if  (method === "write") { 
                    var storage = getLocalInstanceById(this.id);
                    for (var attr in this.attributes) {
                        if(this.attributes.hasOwnProperty(attr)) {
                             storage[attr] = this.attributes[attr];
                        }
                    };
                }
            }

        }),

        ActorCollection = Backbone.Collection.extend({

            model: Actor,

            sync: function (method, model, options) {
                if (method === "read") {
                    if(options.data && options.data.name){
                        findByName(options.data.name).done(function (data) {
                            options.success(data);
                        });
                    } else if(options.data && options.data.id){
                        findById(options.data.id).done(function (data) {
                            options.success(data);
                        });
                    }  else if(options.data && options.data.ids){
                        findMany(options.data.ids).done(function (data) {
                            options.success(data);
                        });
                    } 
                    // else {
                    //     findAll().done(function (data) {
                    //         options.success(data);
                    //     });
                    // }
                }
            }

        }),

        MoviesCollection = Backbone.Collection.extend({

            model: Actor,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByMovie(this.parent.id).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Actor: Actor,
        ActorCollection: ActorCollection,
        MoviesCollection: MoviesCollection
    };

});