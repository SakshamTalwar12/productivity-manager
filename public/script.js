$(window).on("load", function () {

    history.scrollRestoration = "manual";
    $(window).scrollTop(0);


    $("input, button, textarea").blur();

    function checkVisibility(element, threshold = 0.2) {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        const elementTop = $(element).offset().top;
        const elementHeight = $(element).outerHeight();

        return (
            elementTop + elementHeight * threshold < scrollTop + windowHeight &&
            elementTop + elementHeight * (1 - threshold) > scrollTop
        );
    }

    function animateElements(selector, threshold, delay = 100) {
        $(selector).each(function (index) {
            if (checkVisibility(this, threshold)) {
                $(this).addClass("visible");

                $(this)
                    .find(".feature-card")
                    .each(function (i) {
                        setTimeout(() => {
                            $(this).addClass("visible");
                        }, i * delay);
                    });
            }
        });
    }


    animateElements(".about-card", 0.2);
    animateElements(".features-section, .additional-features", 0.1);


    $(window).on("scroll", function () {
        animateElements(".about-card", 0.2);
        animateElements(".features-section, .additional-features", 0.1);
    });


    $(".feature-card").each(function (index) {
        $(this).css("--card-index", index);
    });
});
