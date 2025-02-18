$(window).on("load", function() {
    // Ensure page starts at the top
    history.scrollRestoration = "manual";
    $(window).scrollTop(0);
    
    // Remove focus from any interactive elements
    $("input, button, textarea").blur();

    // Scroll animation for the about section
    const aboutCards = $(".about-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass("visible");
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    aboutCards.each(function() {
        observer.observe(this);
    });

    // Scroll animations for other sections
    const sections = $('.features-section, .additional-features');
    const featureCards = $('.feature-card');

    // Set card index for staggered animations
    featureCards.each(function(index) {
        $(this).css('--card-index', index);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                
                // Animate feature cards inside the sections
                $(entry.target).find('.feature-card').each(function(index) {
                    setTimeout(() => {
                        $(this).addClass('visible');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.each(function() {
        sectionObserver.observe(this);
    });
});
