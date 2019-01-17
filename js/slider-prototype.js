// the widget definition, where "ptc" is the namespace,
// "rangeslider" the widget name
$.widget( "ptc.rangeslider", {
    
    // Default options
    options: {
        'starting-value': 0,
        'min': 0,
        'max': 100,
        'tooltip-msg': 'Default message should be over-ridden'
    },

    // The constructor
    _create: function() {
        var self            = this.element,
            options         = this.options,
            min             = options['min'],
            max             = options['max'],
            start           = options['starting-value'],
            $slider         = $(self).children('.js-range-slide');

        // Set min and max value attributes on slider input on page load
        $slider.attr( {'min': min, 'max': max, 'value': start} );

        var $input_max       = $slider.attr('max'),
            $slider_value    = $slider.attr('value'),
            $width           = $slider.width(),
            pos_calc        = ($slider_value/$input_max) * 100,
            pixel_pos       = (pos_calc/100) * $width,
            $slider_output   = $(self).children('.js-range-output');

        // Set slider starting position and populate label text
        $slider_output.css('left', pixel_pos + 'px').html(start + '%');

        $(self).on( 'mousemove', function(e) { 
            $(this).rangeslider('moveLabel');
        });
    },

    // Position label with slider handle
    moveLabel: function(e) {

        var self            = this.element,
            options         = this.options,
            range_slider    = self[0],
            input_array     = range_slider.getElementsByTagName('input'),
            slider_input    = input_array[0],
            output_array    = range_slider.getElementsByTagName('output'),
            slider_output   = output_array[0],
            input_max       = slider_input.max,
            slider_value    = slider_input.value,
            width           = slider_input.clientWidth,
            pos_calc        = (slider_value/input_max) * 100,
            pixel_pos       = (pos_calc/100) * width,
            $output         = $(self).children('.js-range-output');

        // Position output elem, inject slider value
        $output.css('left', pixel_pos + 'px')
            .html(slider_value + '%');

        // Add or remove tooltip
        if(slider_value >= 20 && slider_value < 25) {
            // Inject tooltip
            $(self).rangeslider('makeToolTip', $output, options['tooltip-msg']);
           
        } else if(slider_value > 25 || slider_value < 20) { 
            // Remove tooltip and html
            $(self).rangeslider('killToolTip');
        }
    },
   
   makeToolTip: function(elem, msg) {
        var msg_html = '<span class="js-range-tooltip"></span>';
        
        // Inject tooltip message container if doesn't already exist
        if( $('.js-range-tooltip').length === 0 ) {
            elem.after(msg_html);
        }
        // Add tooltip message html
        $('.js-range-tooltip').html(msg);
    },

    killToolTip: function() {
        // If tooltip exists then remove it
        if( $('.js-range-tooltip').length > 0 ) {
            $('.js-range-tooltip').remove(); 
        }
    }
});