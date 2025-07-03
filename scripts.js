// Create animated particles
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    console.log('[DEBUG] initSmoothScrolling: Found links:', links.length);
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            console.log(`[DEBUG] Smooth scroll click: Link clicked: ${targetId}, Target found:`, target ? 'true' : 'false');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.warn(`[WARNING] Smooth scroll: Target element not found for ID: ${targetId}`);
            }
        });
    });
}

// Add scroll-triggered animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill tags with stagger effect
                if (entry.target.classList.contains('skill-category')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.skill-category, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
        
        // Pre-hide skill tags for animation
        if (el.classList.contains('skill-category')) {
            el.querySelectorAll('.skill-tag').forEach(tag => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(20px)';
                tag.style.transition = 'all 0.4s ease';
            });
        }
    });
}

// Form submission handler
function initFormHandler() {
    const form = document.querySelector('.contact-form form'); // Select the form specifically
    console.log('[DEBUG] initFormHandler: Form found:', form ? 'true' : 'false');

    if (form) {
        form.addEventListener('submit', async (e) => { // Made the function async
            e.preventDefault();
            console.log('[DEBUG] Form submission initiated.');

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;

            const formData = new FormData(form);
            const formEndpoint = form.action;

            try {
                const response = await fetch(formEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Essential for Formspree to return JSON
                    }
                });

                if (response.ok) {
                    button.textContent = 'Message Sent!';
                    button.style.background = 'linear-gradient(135deg, #00ff00, #008800)';
                    console.log('[DEBUG] Message sent successfully!');
                    form.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        console.error('[ERROR] Formspree errors:', data["errors"].map(error => error["message"]).join(", "));
                        button.textContent = 'Error!';
                        button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
                    } else {
                        console.error('[ERROR] Form submission failed:', response.statusText);
                        button.textContent = 'Error!';
                        button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
                    }
                }
            } catch (error) {
                console.error('[ERROR] Network or submission error:', error);
                button.textContent = 'Error!';
                button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
            } finally {
                // Revert button text and enable after a short delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = ''; // Reset background to original CSS
                }, 2000);
            }
        });
    } else {
        console.warn('[WARNING] initFormHandler: Contact form not found.');
    }
}


// Experience popup functionality
function initExperiencePopups() {
    const experienceData = {
        'senior-qa': {
            title: 'Senior QA Engineer',
            company: 'TechCorp Solutions',
            duration: '2021 - Present',
            responsibilities: [
                'Lead a team of 5 QA engineers across multiple product lines',
                'Designed and implemented comprehensive test automation frameworks using Selenium and TestNG',
                'Reduced regression testing time from 40 hours to 12 hours through strategic automation',
                'Established quality gates and metrics that improved product reliability by 85%',
                'Mentored junior engineers and conducted training sessions on best practices',
                'Collaborated with DevOps team to integrate automated testing into CI/CD pipelines',
                'Performed risk-based testing and created detailed test strategies for new features'
            ],
            tools: ['Selenium WebDriver', 'TestNG', 'Jenkins', 'JIRA', 'Git', 'Maven', 'Docker', 'AWS', 'Postman', 'JMeter', 'Allure Reports'],
            achievements: [
                'Reduced critical bugs in production by 70%',
                'Improved team productivity by 50% through automation',
                'Successfully delivered 15+ major releases with zero critical issues',
                'Implemented automated performance testing saving 20 hours per release cycle'
            ]
        },
        'qa-automation': {
            title: 'QA Automation Engineer',
            company: 'InnovateTech',
            duration: '2019 - 2021',
            responsibilities: [
                'Developed robust automated test suites for web and mobile applications',
                'Created API testing frameworks using RestAssured and Postman',
                'Implemented cross-browser testing strategies using Selenium Grid',
                'Built mobile test automation using Appium for iOS and Android',
                'Integrated automated tests into CI/CD pipelines using Jenkins',
                'Performed load and performance testing using JMeter',
                'Collaborated with development teams to implement shift-left testing practices'
            ],
            tools: ['Selenium', 'Appium', 'RestAssured', 'Cypress', 'Jenkins', 'Git', 'TestRail', 'BrowserStack', 'JMeter', 'Postman', 'Maven'],
            achievements: [
                'Built automation framework from scratch covering 80% test coverage',
                'Reduced manual testing effort by 60%',
                'Implemented parallel test execution reducing execution time by 75%',
                'Created reusable test components used across 5 different projects'
            ]
        },
        'software-qa': {
            title: 'Software QA Engineer',
            company: 'StartupXYZ',
            duration: '2017 - 2019',
            responsibilities: [
                'Performed comprehensive manual testing for SaaS platform features',
                'Created and maintained detailed test cases and test documentation',
                'Established QA processes and testing standards from ground up',
                'Conducted functional, regression, and user acceptance testing',
                'Performed API testing and database validation',
                'Collaborated closely with product managers and developers',
                'Participated in agile ceremonies and sprint planning'
            ],
            tools: ['JIRA', 'TestRail', 'Postman', 'MySQL', 'Chrome DevTools', 'Git', 'Confluence', 'Slack', 'Zoom'],
            achievements: [
                'Established QA processes that improved product quality by 60%',
                'Created comprehensive test documentation library',
                'Reduced customer-reported bugs by 45%',
                'Successfully managed testing for 3 major product launches'
            ]
        },
        'junior-qa': {
            title: 'Junior QA Tester',
            company: 'WebSolutions Inc',
            duration: '2016 - 2017',
            responsibilities: [
                'Executed manual test cases for web applications',
                'Performed exploratory testing and usability testing',
                'Documented and tracked defects using bug tracking systems',
                'Participated in test case reviews and test planning sessions',
                'Learned testing fundamentals and industry best practices',
                'Assisted senior QA engineers with regression testing',
                'Validated fixes and performed smoke testing'
            ],
            tools: ['Bugzilla', 'TestLink', 'Excel', 'Chrome DevTools', 'Firefox', 'Internet Explorer'],
            achievements: [
                'Successfully completed 500+ test cases with 95% accuracy',
                'Identified critical usability issues that improved user experience',
                'Earned recognition for attention to detail and thoroughness',
                'Completed QA certification and advanced to automation role'
            ]
        }
    };

    const timelineItems = document.querySelectorAll('.timeline-content[data-experience]');
    const popup = document.getElementById('experience-popup');
    const overlay = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('popup-close');

    console.log('[DEBUG] initExperiencePopups: Found timeline items:', timelineItems.length);
    console.log(`[DEBUG] Experience popup elements found: popup=${popup ? 'true' : 'false'}, overlay=${overlay ? 'true' : 'false'}, closeBtn=${closeBtn ? 'true' : 'false'}`);


    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('[DEBUG] Experience item clicked.');
            const experienceKey = item.getAttribute('data-experience');
            const data = experienceData[experienceKey];
            
            if (data) {
                const popupContent = popup.querySelector('#popup-content'); // Ensure correct selection
                if (popupContent) {
                    popupContent.innerHTML = `
                        <div class="popup-header">
                            <div class="popup-title">${data.title}</div>
                            <div class="popup-company">${data.company}</div>
                            <div class="popup-duration">${data.duration}</div>
                        </div>
                        
                        <div class="popup-section">
                            <h4>🎯 Key Responsibilities</h4>
                            <ul>
                                ${data.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="popup-section">
                            <h4>🛠️ Tools & Technologies</h4>
                            <div class="tools-grid">
                                ${data.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="popup-section">
                            <h4>🏆 Key Achievements</h4>
                            <ul>
                                ${data.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    overlay.classList.add('show');
                    popup.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    console.log('[DEBUG] Experience Popup shown.');
                } else {
                    console.error('[ERROR] #popup-content element not found within #experience-popup.');
                }
            } else {
                console.warn(`[WARNING] No experience data found for key: ${experienceKey}`);
            }
        });
    });

    function closeExperiencePopup() {
        overlay.classList.remove('show');
        popup.classList.remove('show');
        document.body.style.overflow = '';
        console.log('[DEBUG] Experience Popup closed.');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeExperiencePopup);
    }
    if (overlay) {
        overlay.addEventListener('click', closeExperiencePopup);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closeExperiencePopup();
        }
    });
}


function initSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    console.log('[DEBUG] initSkillTagInteractions: Found skill tags:', skillTags.length);
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Toggle active state
            tag.classList.toggle('active');
            console.log(`[DEBUG] Skill tag clicked: ${tag.textContent}, Active status: ${tag.classList.contains('active')}`);
            
            // Add a little bounce effect
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 150);
        });
        
        // Add random glow effect on hover
        tag.addEventListener('mouseenter', () => {
            const glowIntensity = Math.random() * 0.5 + 0.3;
            tag.style.boxShadow = `0 8px 25px rgba(0, 255, 255, ${glowIntensity})`;
        });
        
        tag.addEventListener('mouseleave', () => {
            if (!tag.classList.contains('active')) {
                tag.style.boxShadow = '';
            }
        });
    });
}

// Function to adjust navigation link spacing (for desktop)
function adjustNavLinkSpacing() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    // Only apply JavaScript spacing on desktop screens
    if (window.innerWidth > 768) {
        navUl.style.justifyContent = 'flex-start'; // Or 'space-around', depending on your desktop design
        navUl.style.gap = '30px'; // Reapply original desktop gap
        navUl.style.marginRight = ''; // Clear any mobile-specific margins
        console.log('[DEBUG] adjustNavLinkSpacing: Applied desktop styles.');
    } else {
        // Reset styles for mobile, as CSS takes over for the mobile menu
        navUl.style.justifyContent = '';
        navUl.style.gap = '';
        navUl.style.marginRight = '';
        console.log('[DEBUG] adjustNavLinkSpacing: Reset styles for mobile.');
    }
}

// Function to handle the navbar's "scrolled" state
function handleNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) { // Adjust this value as needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Function to initialize the scroll-to-top button
function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    console.log('[DEBUG] initScrollToTopButton: Button found:', scrollToTopBtn ? 'true' : 'false');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top on button click
        scrollToTopBtn.addEventListener('click', () => {
            console.log('[DEBUG] Scroll to top button clicked.');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Function to initialize the floating contact button and popup
function initFloatingContact() {
    const floatingBtn = document.getElementById('floatingContactBtn');
    const contactPopup = document.getElementById('contactOptionsPopup');
    const popupOverlay = document.getElementById('contactOptionsOverlay'); // Universal overlay
    const closeBtn = document.getElementById('contactOptionsClose');

    console.log(`[DEBUG] initFloatingContact: Elements found: button=${floatingBtn ? 'true' : 'false'}, popup=${contactPopup ? 'true' : 'false'}, overlay=${popupOverlay ? 'true' : 'false'}, closeBtn=${closeBtn ? 'true' : 'false'}`);

    if (floatingBtn && contactPopup && popupOverlay && closeBtn) {
        // Show popup
        floatingBtn.addEventListener('click', () => {
            console.log('[DEBUG] Floating contact button clicked.');
            contactPopup.classList.add('show');
            floatingBtn.classList.add('popup-open'); // Add class to trigger icon/text changes
            popupOverlay.classList.add('show'); // Show overlay when contact popup opens
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Hide popup
        const hideContactPopup = () => {
            console.log('[DEBUG] Hiding contact popup.');
            contactPopup.classList.remove('show');
            floatingBtn.classList.remove('popup-open'); // Remove class to revert icon/text changes
            popupOverlay.classList.remove('show'); // Hide overlay when contact popup closes
            document.body.style.overflow = ''; // Restore scrolling
        };

        closeBtn.addEventListener('click', hideContactPopup);
        // Add listener to the universal overlay to close this popup if it's open
        popupOverlay.addEventListener('click', (event) => {
            // Only close if the click is directly on the overlay, not on the popup itself
            if (event.target === popupOverlay && contactPopup.classList.contains('show')) {
                hideContactPopup();
            }
        });

        // Hide on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactPopup.classList.contains('show')) {
                hideContactPopup();
            }
        });
    } else {
        console.warn('[WARNING] initFloatingContact: Some floating contact elements were not found. Ensure HTML IDs are correct.');
    }
}


// Removed initLLMAssistant as per user request
/*
function initLLMAssistant() {
    const queryInput = document.getElementById('llmQueryInput');
    const askButton = document.getElementById('askLlmButton');
    const loadingIndicator = document.getElementById('llmLoading');
    const responseDisplay = document.getElementById('llmResponse');

    console.log(`[DEBUG] initLLMAssistant: Elements found: input=${queryInput ? 'true' : 'false'}, button=${askButton ? 'true' : 'false'}, loading=${loadingIndicator ? 'true' : 'false'}, response=${responseDisplay ? 'true' : 'false'}`);


    if (!queryInput || !askButton || !loadingIndicator || !responseDisplay) {
        console.warn("[WARNING] AI Assistant elements not found. Skipping LLM initialization.");
        return;
    }

    askButton.addEventListener('click', async () => {
        console.log('[DEBUG] Ask AI button clicked.');
        const prompt = queryInput.value.trim();
        if (!prompt) {
            responseDisplay.innerHTML = '<p class="text-yellow-400">Please enter a question.</p>';
            return;
        }

        loadingIndicator.classList.add('show');
        responseDisplay.innerHTML = ''; // Clear previous response

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will provide this in runtime. Do not add your API key here directly.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            console.log('[DEBUG] Sending request to Gemini API...');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log('[DEBUG] Gemini API response received:', result);

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                responseDisplay.innerHTML = `<p>${text}</p>`;
                console.log('[DEBUG] AI response displayed.');
            } else {
                responseDisplay.innerHTML = '<p class="text-red-400">Sorry, I could not get a response from the AI. Please try again.</p>';
                console.error('[ERROR] Unexpected API response structure:', result);
            }
        } catch (error) {
            responseDisplay.innerHTML = '<p class="text-red-400">An error occurred while fetching the AI response. Please check your network connection or try again later.</p>';
            console.error('[ERROR] Error calling Gemini API:', error);
        } finally {
            loadingIndicator.classList.remove('show');
            console.log('[DEBUG] LLM loading indicator hidden.');
        }
    });
}
*/


// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOMContentLoaded fired. Initializing all features...');
    createParticles();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillTagInteractions();
    initFormHandler();
    initExperiencePopups(); // Make sure this is called to initialize popups
    initScrollToTopButton(); // Initialize the scroll-to-top button
    initFloatingContact(); // Initialize the floating contact button and popup
    // initLLMAssistant(); // Removed as per user request
    
    // Call spacing function on load and resize
    adjustNavLinkSpacing();
    handleNavbarScroll(); // Initial check on load
    console.log('[DEBUG] All features initialized.');
});

// Add dynamic navigation highlighting and handle navbar scroll state
window.addEventListener('scroll', () => {
    const current = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Handle active navigation link highlighting
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100; // Adjusted for fixed nav
        const sectionBottom = sectionTop + section.offsetHeight;

        if (current >= sectionTop && current < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });

    // Handle navbar scrolled state
    handleNavbarScroll();
});

// Recalculate spacing on window resize
window.addEventListener('resize', () => {
    console.log('[DEBUG] Window resized. Adjusting nav spacing.');
    adjustNavLinkSpacing();
});
