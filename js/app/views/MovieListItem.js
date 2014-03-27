define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        templates                 = require('text!templates/MovieListItem.html'),

        template = _.template(templates);

    return Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.model.on("change", this.render, this);
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            return this;
        }

    });

});