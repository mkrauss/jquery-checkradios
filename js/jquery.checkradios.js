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
				initCheckbox(element, settings);
			}

			else if (element.is("input[type=radio]")) {
				initRadio(element, settings);
			}
        });

        return this;
    }

    function initCheckbox(checkbox, settings) {
	    var facade = $('<div/>')
            .addClass(settings.checkbox.facadeClass)
            .addClass(checkbox.attr('class'));

        checkbox.replaceWith(facade).appendTo(facade);

        facade.on('click mousedown mouseup', function(event) {
            event.target = checkbox[0];
            checkbox.trigger(event);
        });

        facade.on('click', function() {
            checkbox.focus();
        });

        checkbox.on('focus', function() {
            facade.addClass('focus');
        });

        checkbox.on('blur', function() {
            facade.removeClass('focus');
        });

        checkbox.on('change', function() {
			facade.toggleClass(settings.checkbox.iconClass, checkbox.prop('checked'));
        });

        checkbox.on('click mousedown mouseup', function(event) {
			event.stopPropagation();
        });
    }

    function initRadio(radio, settings) {
	    var facade = $('<div/>')
            .addClass(settings.radio.facadeClass)
            .addClass(radio.attr('class'));

        var group = $('input:radio[name=' + radio.attr('name') + ']');

        radio.replaceWith(facade).appendTo(facade);

        facade.on('click mousedown mouseup', function(event) {
            event.target = radio[0];
            radio.trigger(event);
        });

        facade.on('click', function() {
            radio.focus();
        });

        radio.on('focus', function() {
            facade.addClass('focus');
        });

        radio.on('blur', function() {
            facade.removeClass('focus');
        });

        radio.on('change', function() {
            group.each(function() {
                $(this).parent().toggleClass(settings.radio.iconClass, this.checked)
            });
        });

        radio.on('click mousedown mouseup', function(event) {
			event.stopPropagation();
        });
    }

})(jQuery);

$(document).ready(function () {
    $('input:checkbox').checkradios();
    $('input:radio').checkradios();
});

