$(document).ready(function() {
    // Set up scroll animations for sections
    const sections = $('.features-section, .additional-features');
    const featureCards = $('.feature-card');
    
    // Set card index for staggered animations
    featureCards.each(function(index) {
        $(this).css('--card-index', index);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                
                // If it's a section, animate its cards
                if ($(entry.target).hasClass('features-section') || 
                    $(entry.target).hasClass('additional-features')) {
                    $(entry.target).find('.feature-card').each(function(index) {
                        setTimeout(() => {
                            $(this).addClass('visible');
                        }, index * 100);  // Stagger the card animations
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections and cards
    sections.each(function() {
        observer.observe(this);
    });
}); 
