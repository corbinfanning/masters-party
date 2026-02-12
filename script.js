// Masters Tournament Watch Party - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set the date for the Masters Tournament Watch Party
    const eventDate = new Date('April 13, 2026 13:00:00').getTime();

    // Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = 'The Tournament Has Begun! 🏆';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add floating azalea petals animation
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'floating-petal';
        petal.innerHTML = '🌸';
        petal.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            pointer-events: none;
            z-index: 1000;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: fallAndSway ${Math.random() * 3 + 4}s linear forwards;
        `;
        document.body.appendChild(petal);

        // Remove petal after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 7000);
    }

    // Add CSS for petal animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fallAndSway {
            0% {
                transform: translateY(-50px) translateX(0px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 100}px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
        .floating-petal {
            user-select: none;
        }
    `;
    document.head.appendChild(style);

    // Create petals periodically (subtle effect)
    setInterval(createPetal, 5000 + Math.random() * 10000);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.tradition-item, .detail-card, .dress-category, .menu-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add Masters Tournament facts that rotate
    const mastersFacts = [
        "The green jacket can only be worn by members and the current champion",
        "Augusta National was built on a former plant nursery",
        "The azaleas bloom specifically for Masters week",
        "No cell phones allowed on the grounds during tournament play",
        "The pimento cheese sandwich is a Masters tradition since 1967",
        "Honorary starters tee off to begin the tournament each year"
    ];

    let currentFact = 0;
    const factElement = document.createElement('div');
    factElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 103, 71, 0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        max-width: 300px;
        font-size: 14px;
        z-index: 1000;
        transform: translateX(350px);
        transition: transform 0.5s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    function showMastersFact() {
        factElement.innerHTML = `
            <strong>Masters Fact:</strong><br>
            ${mastersFacts[currentFact]}
            <span style="display: block; text-align: right; margin-top: 5px; opacity: 0.7; font-size: 12px;">
                ${currentFact + 1}/${mastersFacts.length}
            </span>
        `;
        
        document.body.appendChild(factElement);
        
        setTimeout(() => {
            factElement.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            factElement.style.transform = 'translateX(350px)';
            setTimeout(() => {
                if (factElement.parentNode) {
                    factElement.parentNode.removeChild(factElement);
                }
            }, 500);
        }, 5000);

        currentFact = (currentFact + 1) % mastersFacts.length;
    }

    // Show first fact after 3 seconds, then every 15 seconds
    setTimeout(() => {
        showMastersFact();
        setInterval(showMastersFact, 15000);
    }, 3000);

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const azaleas = document.querySelectorAll('.azalea-decoration');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        azaleas.forEach((azalea, index) => {
            const speed = (index + 1) * 0.3;
            azalea.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Enhanced RSVP button interaction
    document.querySelectorAll('.rsvp-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add golf ball cursor trail effect (subtle)
    let isMouseMoving = false;
    let mouseTimer;

    function createGolfBall(x, y) {
        const ball = document.createElement('div');
        ball.innerHTML = '⚪';
        ball.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 8px;
            pointer-events: none;
            z-index: 999;
            opacity: 0.6;
            animation: golfBallFade 1s ease-out forwards;
        `;
        document.body.appendChild(ball);

        setTimeout(() => {
            if (ball.parentNode) {
                ball.parentNode.removeChild(ball);
            }
        }, 1000);
    }

    // Add CSS for golf ball animation
    const golfBallStyle = document.createElement('style');
    golfBallStyle.textContent = `
        @keyframes golfBallFade {
            0% { opacity: 0.6; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    document.head.appendChild(golfBallStyle);

    document.addEventListener('mousemove', (e) => {
        clearTimeout(mouseTimer);
        
        if (!isMouseMoving) {
            isMouseMoving = true;
        }
        
        // Create golf ball trail occasionally
        if (Math.random() < 0.1) {
            createGolfBall(e.clientX, e.clientY);
        }
        
        mouseTimer = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    console.log('🏆 The Fanning Invitational website loaded successfully!');
    console.log('🌿 Augusta National would be proud!');
});