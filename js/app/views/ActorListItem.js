define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        templates           = require('text!templates/ActorListItem.html'),

        template = _.template(templates);

    return Backbone.View.extend({

        tagName: "li",

        initialize: function (attrs) {
            this.model.on("change", this.render, this);
            this.options = attrs;
        },

        render: function () {
            var exposedVariables = this.model.attributes;
            exposedVariables.displayMode = this.options.displayMode;

            this.$el.html(template(exposedVariables));
            return this;
        }

    });

});