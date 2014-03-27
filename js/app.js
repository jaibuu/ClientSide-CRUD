require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        templates: '../templates'
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

require(['jquery', 'backbone', 'app/router', 'Backbone.ModelBinder', 'Backbone.CollectionBinder'], function ($, Backbone, Router) {
    var router = new Router();
    Backbone.history.start();
});