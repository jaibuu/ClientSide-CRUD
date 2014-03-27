define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        ActorListView       = require('app/views/ActorList'),
        actorModel          = require('app/models/actor'),
        templates           = require('text!templates/MovieEdit.html'),


        template = _.template(templates);

    return Backbone.View.extend({
        _modelBinder: undefined,

        initialize:function () {
            this._modelBinder = new Backbone.ModelBinder();

            this.actorList = new actorModel.ActorCollection();

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
            var listView = new ActorListView({collection: this.model.actors, el: $('.actor-list', this.el), displayMode: 'delete'  });
            listView.render();

            var listView = new ActorListView({collection: this.actorList, el: $('.add-actor-list', this.el), displayMode: 'add' });
            listView.render();

            this._modelBinder.bind(this.model, this.$el);

            return this;
        },

        events: {
            "keyup .addItem .search-query": "search",
            "keypress .addItem .search-query": "onkeypress",
            "click .addItem .actorLink ": "handleActorClick",
        },

        search: function (event) {
            var key = $('#searchItem').val();
            
            this.actorList.fetch({reset: true, data: {name: key}, success: function () {
                setTimeout(function () {
                    $('.addItem .dropdown').addClass('open');
                });
            }});
        },

        handleActorClick:function(element){
            var type = $(element.currentTarget).data('click-action');
            var id = $(element.currentTarget).data('id');
            if(type == 'add'){
                $('#searchItem').val('');
                $('[name=actors]').val(  $('[name=actors]').val()+','+id );
            }
            return false;
        },
        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }
    });

});