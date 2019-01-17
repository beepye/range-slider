var rangeSlider = function(){

    var range_slider= $('.js-range'),
        slider      = $('.js-range-slide'),
        value       = $('.js-range-output'),

        /* vanilla js vars */
        slider_input= document.getElementById('rangeSlider'),
        input_max   = slider_input.getAttribute('max'),
        input_min   = slider_input.getAttribute('min'), // prob not needed and can remove
        width       = slider_input.clientWidth,
        isDragging  = false;

    // Position label according to slider handle location
    var moveLabel = (function(e) {
        if(isDragging) {

            var slider_value= slider_input.value,
                pos_calc    = (slider_value/input_max) * 100,
                pixel_pos   = (pos_calc/100) * width;

            // Not sure if this should be kept as jQuery or vanilla js?
            // document.getElementById('rangeLabel').style.left = pixel_pos +'px';
            value.css('left', pixel_pos + 'px').html(slider_value + '%');
        }
    });

    // Will the mouse down/up events recognize touch screen gestures?
    // Maybe these should be written in jQuery instead?
    slider_input.onmousedown = (function(e) {
        isDragging = true;
        slider_input.addEventListener('mousemove', moveLabel, false);
    });

    slider_input.onmouseup = (function(e) {
        isDragging = false;
        slider_input.removeEventListener('mousemove', moveLabel);
    });
};

if('.js-range') {
    rangeSlider();
}

