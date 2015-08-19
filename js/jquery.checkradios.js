/*
    CHECKRADIOS - jQuery plugin to allow custom styling of checkboxes
    by Chris McGuckin (https://github.com/cosmicwheels)


    License: MIT (http://opensource.org/licenses/MIT)


    Credits:
    ---------------------------------------------------------------------------------

    icomoon (http://icomoon.io/)

    Please refer to the icomoon website for the license regarding their icons.

    ---------------------------------------------------------------------------------

    Fontawesome (http://fortawesome.github.io/Font-Awesome/)

    Please refer to the fontawesome website for the license regarding their icons.

    ---------------------------------------------------------------------------------

    Stephan Richter (https://github.com/strichter)

    Thanks to Stephan for pointing out and helping to add the triggering of events
    to help further mimic the checkboxes and radios as well as providing other
    important bug fixes.

    ---------------------------------------------------------------------------------
    ---------------------------------------------------------------------------------


*/

(function ($) {
    var defaults = {
        checkbox: {
            facadeClass: 'checkradios-checkbox',
            iconClass: 'icon-checkradios-checkmark'
        },
        radio: {
            facadeClass: 'checkradios-radio',
            iconClass: 'icon-checkradios-circle'
        }
    };

    $.fn.checkradios = function (options) {
        var settings = $.extend(defaults, options);

        this.each(function () {
			var element = $(this);

			if (element.is("input[type=checkbox]")) {
                init(element, settings.checkbox)
			}

			else if (element.is("input[type=radio]")) {
                init(element, settings.radio)
			}
        });

        return this;
    }

    function init(element, settings) {
	    var facade = $('<div/>')
            .addClass(settings.facadeClass)
            .addClass(element.attr('class'));

        element.replaceWith(facade).appendTo(facade);

        var group = element.is(':radio')
            ? $('input:radio[name=' + element.attr('name') + ']')
            : element;

        facade.on('click.checkRadios mousedown.checkRadios mouseup.checkRadios', function(event) {
            event.target = element[0];
            element.trigger(event);
        });

        facade.on('click.checkRadios', function() {
            element.focus();
        });

        element.on('focus.checkRadios', function() {
            facade.addClass('focus');
        });

        element.on('blur.checkRadios', function() {
            facade.removeClass('focus');
        });

        element.on('checkradioSync', function() {
			facade.toggleClass(settings.iconClass, element.prop('checked'));
        });

        element.on('change.checkRadios', function() {
            group.trigger('checkradioSync');
        });

        element.on('click.checkRadios mousedown.checkRadios mouseup.checkRadios', function(event) {
            // When the facade passes the event to the control, don't
            // allow it to propagate back up to the facade, infinitely
            // recursing. Propogation from the facade will still happen.
			event.stopPropagation();
        });
    }

})(jQuery);

$(document).ready(function () {
    $('input:checkbox').checkradios();
    $('input:radio').checkradios();
});

