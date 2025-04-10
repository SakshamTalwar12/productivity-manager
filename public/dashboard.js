// Activity Heatmap
const activityHeatmap = document.getElementById('activityHeatmap');
const productivityChart = document.getElementById('productivityChart');

// Generate random activity data
const generateActivityData = () => {
    const data = [];
    for (let i = 0; i < 52; i++) {
        data.push(Math.floor(Math.random() * 10));
    }
    return data;
};

// Initialize Activity Heatmap
new Chart(activityHeatmap, {
    type: 'bar',
    data: {
        labels: Array.from({length: 52}, (_, i) => `Week ${i + 1}`),
        datasets: [{
            label: 'Activity Level',
            data: generateActivityData(),
            backgroundColor: '#b19cd9',
            borderRadius: 5,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize Productivity Trends Chart
new Chart(productivityChart, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Productivity Score',
            data: [65, 78, 82, 75, 85, 70, 90],
            borderColor: '#b19cd9',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(177, 156, 217, 0.1)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Focus Timer Implementation
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;

const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

startTimer.addEventListener('click', () => {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Time is up! Take a break.');
            }
        }, 1000);
    }
});

pauseTimer.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
});

resetTimer.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
});

// Initialize tooltips or other interactive elements
$(document).ready(function() {
    // Add any jQuery initializations here
});

// Update the productivity trends click handler
document.querySelector('.productivity-trends').addEventListener('click', function() {
    // First check if we're authorized
    if (gapi.client && gapi.client.getToken()) {
        // If already authorized, show calendar events
        listUpcomingEvents();
    } else {
        // If not authorized, trigger the authorization flow
        document.getElementById('authorize_button').click();
    }
    
    // Smooth scroll to the section
    document.getElementById('productivity-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Update the authorization button handler
document.getElementById('authorize_button').onclick = async () => {
    try {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw resp;
            }
            // After successful authorization, list the events
            await listUpcomingEvents();
            // Open Google Calendar in a new tab
            window.open('https://calendar.google.com', '_blank');
        };

        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    } catch (err) {
        console.error('Error:', err);
    }
};

// Scroll reveal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements we want to animate
    const elementsToAnimate = [
        ...document.querySelectorAll('.stat-card'),
        document.querySelector('.activity-section'),
        ...document.querySelectorAll('.grid-item')
    ];

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,  // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element comes into view
    });

    // Observe each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Add stagger effect to stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Update scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});