define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        ActorListView       = require('app/views/ActorList'),
        templates           = require('text!templates/MovieEdit.html'),


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
            this.model.actors.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        $('.no-actors').show();
                    }
                }
            });
            var listView = new ActorListView({collection: this.model.actors, el: $('.actor-list', this.el)});
            listView.render();

            this._modelBinder.bind(this.model, this.$el);

            return this;
        }
    });

});