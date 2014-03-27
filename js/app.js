require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        templates: '../templates',
        "moment": "moment.min",
    },

    map: {

    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'Backbone.CollectionBinder': {
            deps: ['underscore', 'backbone'],
        }
    }
});

require(['jquery', 'backbone', 'app/router', 'moment', 'Backbone.ModelBinder', 'Backbone.CollectionBinder'], function ($, Backbone, Router, moment) {
    var router = new Router();
    Backbone.history.start();
});