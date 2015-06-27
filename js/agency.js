// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    var $iframe = $('iframe');
    var maybeLoadIframe = function () {
        if ($iframe.is(':visible') && ! $iframe.attr('src')) {
            $iframe.attr('src',$iframe.attr('data-src'));
        }
    };

    maybeLoadIframe();

    $(window).resize(maybeLoadIframe);
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});