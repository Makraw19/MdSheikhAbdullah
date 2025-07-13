document.addEventListener('DOMContentLoaded', () => {

    // --- Particle Background ---
    function createParticles(containerId, particleClass, count, minDuration, maxDuration) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${particleClass}`;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            const duration = Math.random() * (maxDuration - minDuration) + minDuration;
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = -Math.random() * duration + 's';
            container.appendChild(particle);
        }
    }
    createParticles('particles-fast', 'particle-1', 40, 5, 10);
    createParticles('particles-slow', 'particle-2', 30, 15, 25);

    // --- Typing Animation for Subtitle ---
    function initTypingAnimation() {
        const subtitleEl = document.getElementById('subtitle-text');
        if (!subtitleEl) return;
        const text = "Senior Software QA Engineer";
        let index = 0;
        subtitleEl.innerHTML = ""; // Clear initial text
        
        function type() {
            if (index < text.length) {
                subtitleEl.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                subtitleEl.innerHTML += '<span class="typing-cursor"></span>';
            }
        }
        type();
    }
    
    // --- Navigation Scroll Handling ---
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        let currentSection = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if(window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
    
    // --- Timeline Animation ---
    function initTimelineAnimation() {
        const timeline = document.getElementById('experience-timeline');
        const timelineProgress = document.getElementById('timeline-progress');
        if (!timeline || !timelineProgress) return;
        
        function updateTimeline() {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollPercent = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
            timelineProgress.style.height = `${scrollPercent * 100}%`;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', updateTimeline, { passive: true });
                } else {
                    window.removeEventListener('scroll', updateTimeline);
                }
            });
        }, { threshold: 0 });

        observer.observe(timeline);
    }

    // --- Experience Popups ---
    async function initExperiencePopups() {
        const response = await fetch('experience.json');
        const experienceData = await response.json();

        const timelineItems = document.querySelectorAll('.timeline-content[data-experience]');
        const popup = document.getElementById('experience-popup');
        const overlay = document.getElementById('popup-overlay');
        const closeBtn = document.getElementById('popup-close');
        if (!popup || !overlay || !closeBtn) return;

        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const experienceKey = item.getAttribute('data-experience');
                const data = experienceData[experienceKey];
                if (data) {
                    const popupContent = popup.querySelector('#popup-content');
                    if (popupContent) {
                        popupContent.innerHTML = `
                            <div class="popup-header">
                                <div class="popup-title">${data.title}</div>
                                <div class="popup-company">${data.company}</div>
                                <div class="popup-duration">${data.duration}</div>
                            </div>
                            <div class="popup-section">
                                <h4>🎯 Key Responsibilities</h4>
                                <ul>${data.responsibilities.map(resp => `<li>${resp}</li>`).join('')}</ul>
                            </div>
                            <div class="popup-section">
                                <h4>🛠️ Tools & Technologies</h4>
                                <div class="tools-grid">${data.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}</div>
                            </div>`;
                        overlay.classList.add('show');
                        popup.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        });

        function closeExperiencePopup() {
            overlay.classList.remove('show');
            popup.classList.remove('show');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeExperiencePopup);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeExperiencePopup(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && popup.classList.contains('show')) closeExperiencePopup(); });
    }

    // --- Floating Buttons and Popups ---
    function initFloatingButtons() {
        const floatingBtn = document.getElementById('floatingContactBtn');
        const contactPopup = document.getElementById('contactOptionsPopup');
        const overlay = document.getElementById('popup-overlay');
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        const contactPopupCloseBtn = document.getElementById('contact-popup-close');

        if (floatingBtn && contactPopup && overlay) {
            const toggleContactPopup = (force) => {
                overlay.classList.toggle('show', force);
                contactPopup.classList.toggle('show', force);
            };

            floatingBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleContactPopup(true);
            });

            if(contactPopupCloseBtn) {
                contactPopupCloseBtn.addEventListener('click', () => toggleContactPopup(false));
            }
        }
        
        document.addEventListener('click', (e) => {
            if (contactPopup && contactPopup.classList.contains('show') && !contactPopup.contains(e.target) && !floatingBtn.contains(e.target)) {
                contactPopup.classList.remove('show');
                overlay.classList.remove('show');
            }
        });

        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    // --- Form Handler ---
    function initFormHandler() {
        const form = document.querySelector('.contact-form form');
        if (!form) return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    button.textContent = 'Message Sent!';
                    button.style.background = 'linear-gradient(135deg, #00ff00, #008800)';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                button.textContent = 'Error!';
                button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
            } finally {
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }
        });
    }

    // --- Initialize All ---
    initTypingAnimation();
    initTimelineAnimation();
    initExperiencePopups();
    initFloatingButtons();
    initFormHandler();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
});




