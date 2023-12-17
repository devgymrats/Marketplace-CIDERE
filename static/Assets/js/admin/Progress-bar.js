$(function () {
    // hide redial by default
    $('.redial').hide();

    // break point = 768, show redial 
    if ($(window).width() < 768) {
        $('.stepper').hide();
        BuildRedial();
        $('.redial').show();
    }

    function BuildRedial() {
        // get current step
        var current = $('.md-step.active.current').find('span').html();

        // get total steps
        var total = $('.md-step.active').length;

        $('.progress-text').html(current + '/' + total);

        // current step name
        var currentStep = $('.md-step.active.current').find('strong').html();
        $('.progress-current').html(currentStep);

        //next step name
        var nextStep = $('.md-step.active.next').find('strong').html();
        if (nextStep) {
            $('.progress-next').html("Next: " + nextStep);
        } else {
            $('.progress-next').hide(); // dont display next step if there isnt any
        }


        // build redial
        $(".progress").each(function () {
            var value = (current / total) * 100;
            var left = $(this).find('.progress-left .progress-bar');
            var right = $(this).find('.progress-right .progress-bar');

            if (value > 0) {
                if (value <= 50) {
                    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
                } else {
                    right.css('transform', 'rotate(180deg)')
                    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
                }
            }

        })

        function percentageToDegrees(percentage) {
            return percentage / 100 * 360
        }
    }
});