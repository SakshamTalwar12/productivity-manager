$(document).ready(function() {
    const featureCards = $('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    featureCards.each(function() {
        observer.observe(this);
    });
}); 