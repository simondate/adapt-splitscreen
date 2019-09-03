define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var SplitscreenView = Backbone.View.extend({

        svg: null,

        className: 'splittscreen-hide',

        events: {
            'click .splittscreen-button-show': 'onSplittscreenShow',
            'click .splittscreen-button-hide': 'onSplittscreenHide',
            'click .splittscreen-container': 'onSplittscreenHide'
        },

        initialize: function() {
            if (Modernizr.svg === false) {
                return;
            }

            this.$window = $(window);
            this.pageHeaderHeight = $('.page-header').height();
            this.screenWidth = this.model.get('_splitscreen')._screenWidth || 900;

            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt, 'device:resize', this.onDeviceResize);

            this.listenTo(Adapt, 'splittscreen:show', this.onShowSplittscreen);
            this.listenTo(Adapt, 'splittscreen:hide', this.onHideSplittscreen);

            this.setupSplitContainer();

            this.setupScrollEvents();

            this.$window.trigger('resize');
            // this.onDeviceResize();
        },

        onSplittscreenShow: function() {
            Adapt.trigger('splittscreen:show');
        },

        onSplittscreenHide: function() {
            Adapt.trigger('splittscreen:hide');
        },

        setupSplitContainer: function() {
            $('#wrapper').addClass('splittscreen-active');

            var container = $('#splittscreen-container');

            if ( container.length === 0) {
                var template = Handlebars.templates['splittscreen'];

                $('.page-inner').append(this.$el.html(template()));
            } else {
                container.show();
            }
        },

        setupScrollEvents: function() {
            this.$window.on('scroll', _.bind(this.onScroll, this));
        },

        onScroll: function(event) {
            if (this.splitviewClass === 'splittscreen-small') {
                return;
            }

            if (this.$window.scrollTop() > this.pageHeaderHeight) {
                this.$el.addClass('sticky');
            } else {
                this.$el.removeClass('sticky');
            }
        },

        onDeviceResize: function(screenWidth) {
            // if (!this.svg) {
            //     if (document.getElementById("minimap-doc").getSVGDocument()) {
            //         this.svg = document.getElementById("minimap-doc").getSVGDocument().documentElement;
            //     }
            // }

            this.splitviewClass = 'splittscreen-large';
            if (screenWidth <= this.screenWidth) {
                this.splitviewClass = 'splittscreen-small';
                // if (this.svg) {
                //     this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                // }
            } 
            // else {
            //     if (this.svg) {
            //         this.svg.setAttribute('preserveAspectRatio', 'xMidYMin slice');
            //     }
            // }

            $('#wrapper').removeClass('splittscreen-small splittscreen-large').addClass(this.splitviewClass);
        },

        onShowSplittscreen: function() {
            this.$el.removeClass('splittscreen-hide').addClass('splittscreen-show');
        },

        onHideSplittscreen: function() {
            this.$el.removeClass('splittscreen-show').addClass('splittscreen-hide');
        },

        removeSplitContainer: function() {
            $('#wrapper').removeClass('splittscreen-active');
            $('#splittscreen-container').hide();
        },

        remove: function() {
            this.removeSplitContainer();

            this.$window.off('scroll');

            Backbone.View.prototype.remove.apply(this, arguments);
        }

    });

    return SplitscreenView;

});
