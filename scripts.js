// Create animated particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
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
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
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
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #00ff00, #008800)';
                form.reset();
            } else {
                button.textContent = 'Error!';
                button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
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

// Experience popup functionality
function initExperiencePopups() {
    const experienceData = {
        'tensis-sr-qa': {
            title: 'Sr. Quality Assurance Engineer',
            company: 'Tensis || Ultimo, Sydney',
            duration: 'October 2024 – Present',
            responsibilities: [
                "Developed and implemented comprehensive QA strategies and roadmaps aligned with Tensis's AI-powered automation solutions and company goals.",
                "Established and maintaining rigorous quality standards, metrics, and KPIs, focusing on data integrity, security, accuracy, and regulatory compliance.",
                "Proactively identify and assess potential quality risks, developing strategies for effective mitigation.",
                "Established robust defect tracking, reporting, and resolution processes, ensuring clear communication and timely fixes.",
                "Lead the adoption and expansion of test automation frameworks and tools, maximizing automation coverage for efficiency and reliability, especially for data-driven scenarios.",
                "Implementation of performance, load, and security testing to ensure scalability, responsiveness, and resilience, particularly for critical data.",
                "Ensure thorough testing of APIs and integrations with third-party systems."
            ],
            tools: ['JIRA', 'TestRail', 'Selenium', 'Cypress', 'Playwright', 'Postman', 'JMeter', 'CI/CD', 'SQL'],
        },
        'pencs-qa': {
            title: 'Quality Assurance Engineer',
            company: 'Pen CS || Leichhardt, Sydney',
            duration: 'November 2023 – October 2024',
            responsibilities: [
                "Developing comprehensive test plans, scenario matrix and test cases to ensure thorough test coverage.",
                "Executing test cases, identified defects, and reported them in a clear and concise manner.",
                "Collaborating with developers and business analysts to understand software requirements and ensure testing objectives were met.",
                "Documenting test results, generated defect reports, and maintained accurate and organized test documentation.",
                "Conducting root cause analysis for defects, providing recommendations for improvements.",
                "Working closely with cross-functional teams to ensure alignment of testing efforts and project deliverables.",
                "Actively participated in team meetings, providing insights and suggestions to enhance overall software quality.",
                "Written automation script using Test Complete for the functional test cases of desktop application.",
                "Maintaining knowledge of industry best practices and emerging technologies in software testing."
            ],
            tools: ['Test Complete', 'JIRA', 'SQL', 'Agile'],
        },
        'wedaedalus-mid': {
            title: 'Test Automation Engineer (Mid-Level)',
            company: 'WeDaedalus LLC || Michigan, USA',
            duration: 'July 2022 – October 2023',
            responsibilities: [
                "Define and drive the overall test automation strategy, considering the application's architecture, complexity, and testing goals.",
                "Collaborate with QA and development teams to determine which test cases should be automated and which should remain manual.",
                "Design and architect advanced, scalable automation frameworks that are modular, maintainable, and can accommodate complex test scenarios.",
                "Implement advanced automation techniques, such as data-driven testing, keyword-driven testing, and behavior-driven development (BDD).",
                "Lead the integration of automated tests into the CI/CD pipeline using Bamboo, ensuring seamless execution of tests on every code commit and providing rapid feedback to developers.",
                "Continuously evaluate and improve the test automation process by identifying bottlenecks, inefficiencies, and areas for enhancement."
            ],
            tools: ['Selenium', 'Cypress', 'BDD', 'Bamboo', 'CI/CD', 'Java', 'Python'],
        },
        'wedaedalus-test-auto': {
            title: 'Test Automation Engineer',
            company: 'WeDaedalus LLC || Michigan, USA',
            duration: 'August 2021 – June 2022',
            responsibilities: [
                "Developed and maintained a comprehensive test automation strategy that outlined which test cases would be automated, leading to improved testing efficiency and reduced manual effort.",
                "Designed and implemented an automation framework using tools such as Selenium WebDriver, KATALON studio and Cypress.",
                "Created and executed automated test scripts for functional, regression, and performance testing, helping to identify defects early in the development process.",
                "Integrated automated tests into the Jenkins CI/CD pipeline, enabling automated testing of every code commit and providing rapid feedback to the development team.",
                "Mentored junior team members, providing guidance on test automation best practices, tools, and techniques."
            ],
            tools: ['Selenium WebDriver', 'Katalon Studio', 'Cypress', 'Jenkins', 'CI/CD'],
        },
        'wedaedalus-jr': {
            title: 'Jr. QA Automation Engineer',
            company: 'WeDaedalus LLC || Michigan, USA',
            duration: 'March 2021 – July 2021',
            responsibilities: [
                "System Testing, State Transition Testing, Regression Testing, Sanity Testing, Smoke Testing.",
                "Automation Testing with Cypress, KATALON.",
                "Preparing and Executing Automation Test Cases, Test Plans.",
                "Working with CI/CD Pipeline in Jenkins.",
                "Participating in Agile Scrum Rituals.",
                "Maintaining liaisons with Developers, Business Analysts."
            ],
            tools: ['Cypress', 'Katalon Studio', 'Jenkins', 'Agile/Scrum'],
        },
        'olivine-intern': {
            title: 'Intern QA Engineer',
            company: 'Olivine Limited || Dhaka, Bangladesh',
            duration: 'September 2020 – December 2020',
            responsibilities: [
                "Saint Martin - SRS || SDD || User Guideline.",
                "Learning Management System- SRS.",
                "Manual testing on Saint Martin, Prottoyon web application.",
                "Manual Testing on Joy Bangla, Circuit House Management System, Barta mobile application.",
                "Client support"
            ],
            tools: ['Manual Testing', 'SRS', 'SDD', 'User Guideline'],
        }
    };

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
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeExperiencePopup();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closeExperiencePopup();
        }
    });
}

function initSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 150);
        });
        
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

function adjustNavLinkSpacing() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    if (window.innerWidth > 768) {
        navUl.style.justifyContent = 'flex-start';
        navUl.style.gap = '30px';
        navUl.style.marginRight = '';
    } else {
        navUl.style.justifyContent = '';
        navUl.style.gap = '';
        navUl.style.marginRight = '';
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initFloatingContact() {
    const floatingBtn = document.getElementById('floatingContactBtn');
    const contactPopup = document.getElementById('contactOptionsPopup');
    const popupOverlay = document.getElementById('contactOptionsOverlay');
    const closeBtn = document.getElementById('contactOptionsClose');

    if (!floatingBtn || !contactPopup || !popupOverlay || !closeBtn) return;

    floatingBtn.addEventListener('click', () => {
        contactPopup.classList.add('show');
        floatingBtn.classList.add('popup-open');
        popupOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    const hideContactPopup = () => {
        contactPopup.classList.remove('show');
        floatingBtn.classList.remove('popup-open');
        popupOverlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', hideContactPopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            hideContactPopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactPopup.classList.contains('show')) {
            hideContactPopup();
        }
    });
}

// Main initialization function that runs after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillTagInteractions();
    initFormHandler();
    initExperiencePopups();
    initScrollToTopButton();
    initFloatingContact();
    adjustNavLinkSpacing();
    handleNavbarScroll();

    // Active nav link highlighting on scroll
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        const current = window.scrollY;
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (current >= sectionTop && current < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Adjust nav on resize
    window.addEventListener('resize', adjustNavLinkSpacing);
});

