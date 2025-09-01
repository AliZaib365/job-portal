// ===== MAIN APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initAboutPageAnimations();
    initScrollAnimations();
    initHeaderBehavior();
    initModals();
    initFAQToggle();
    initApplicationForm();
    initCareerAdviceSection();
    initPunchlineRotator();
});

// ===== MODULE: ABOUT PAGE ANIMATIONS =====
function initAboutPageAnimations() {
    const matchLine = document.querySelector('.about-match-line');
    const matchPercentage = document.querySelector('.about-match-percentage');
    const jobSeeker = document.querySelector('.about-job-seeker');
    const employer = document.querySelector('.about-employer');
    const sparkles = document.querySelectorAll('.about-sparkle');
    
    if (!matchLine) return; // Exit if not on about page
    
    setTimeout(() => {
        // Animate match line
        matchLine.style.width = 'calc(100% - 320px)';
        
        setTimeout(() => {
            // Show match percentage
            if (matchPercentage) {
                matchPercentage.style.opacity = '1';
            }
            
            // Move job seeker and employer toward center
            if (jobSeeker) jobSeeker.style.left = '0px';
            if (employer) employer.style.right = '0px';
            
            // Animate sparkles with staggered timing
            animateSparkles(sparkles);
        }, 1000);
    }, 1000);
    
    // Set up scroll animations for algorithm steps
    initAlgorithmScrollAnimations();
}

function animateSparkles(sparkles) {
    sparkles.forEach((sparkle, index) => {
        setTimeout(() => {
            sparkle.style.opacity = '1';
            sparkle.style.transform = 'scale(2.5)';
            setTimeout(() => {
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'scale(1)';
            }, 600);
        }, index * 300);
    });
}

function initAlgorithmScrollAnimations() {
    const algorithmSteps = document.querySelectorAll('.about-algorithm-step');
    const algorithmVisual = document.querySelector('.about-algorithm-visual');
    const teamMembers = document.querySelectorAll('.about-team-member');
    const statItems = document.querySelectorAll('.about-stat-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleIntersectingElement(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    algorithmSteps.forEach(step => observer.observe(step));
    if (algorithmVisual) observer.observe(algorithmVisual);
    teamMembers.forEach(member => observer.observe(member));
    statItems.forEach(item => observer.observe(item));
}

function handleIntersectingElement(element) {
    if (element.classList.contains('about-algorithm-step') || 
        element.classList.contains('about-algorithm-visual')) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        element.style.transition = 'all 0.6s ease';
    } 
    else if (element.classList.contains('about-team-member')) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    } 
    else if (element.classList.contains('about-stat-item')) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        animateStatCounter(element);
    }
}

function animateStatCounter(statItem) {
    const statNumber = statItem.querySelector('h3');
    if (!statNumber) return;
    
    const originalText = statNumber.innerText;
    const target = parseInt(originalText.replace(/\D/g, ''));
    const suffix = originalText.replace(/[0-9]/g, '');
    
    let count = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            statNumber.innerText = originalText;
            clearInterval(timer);
        } else {
            statNumber.innerText = Math.floor(count) + suffix;
        }
    }, duration / steps);
}

// ===== MODULE: SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Initial animation check
    animateOnScroll();
    
    // Animate hero elements immediately
    const heroElements = document.querySelectorAll('.hero .animate');
    heroElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Set up scroll listener
    window.addEventListener('scroll', animateOnScroll);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// ===== MODULE: HEADER BEHAVIOR =====
function initHeaderBehavior() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MODULE: MODALS =====
function initModals() {
    initEnrollModal();
    initFeedbackModal();
    initSmoothScrolling();
}

function initEnrollModal() {
    const enrollModal = document.getElementById('enrollModal');
    if (!enrollModal) return;
    
    // Form submission
    enrollModal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const enrollmentData = {
            companyName: formData.get('companyName'),
            address: formData.get('address'),
            phoneNumber: formData.get('phoneNumber')
        };
        
        console.log('Enrollment Data:', enrollmentData);
        showToast('🎉 You\'re enrolled! We\'ll be in touch soon with your next steps.', 'success');
        closeEnrollForm();
        e.target.reset();
    });
}

function openEnrollForm() {
    document.getElementById('enrollModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeEnrollForm() {
    document.getElementById('enrollModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initFeedbackModal() {
    const feedbackButton = document.getElementById('feedbackButton');
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackOverlay = document.getElementById('feedbackOverlay');
    const feedbackForm = document.getElementById('feedbackForm');
    const cancelFeedback = document.getElementById('cancelFeedback');
    const feedbackFile = document.getElementById('feedbackFile');
    const fileName = document.getElementById('fileName');
    
    if (!feedbackButton) return;
    
    // Toggle feedback modal
    feedbackButton.addEventListener('click', toggleFeedbackModal);
    
    // Handle clicks on the icon if needed
    const feedbackIcon = feedbackButton.querySelector('i');
    if (feedbackIcon) {
        feedbackIcon.addEventListener('click', toggleFeedbackModal);
    }
    
    // Close modal when overlay is clicked
    feedbackOverlay.addEventListener('click', () => {
        feedbackModal.classList.remove('show');
        feedbackOverlay.classList.remove('show');
    });
    
    // Close modal when cancel button is clicked
    cancelFeedback.addEventListener('click', () => {
        feedbackModal.classList.remove('show');
        feedbackOverlay.classList.remove('show');
    });
    
    // Show selected file name
    feedbackFile.addEventListener('change', (e) => {
        fileName.textContent = e.target.files.length > 0 ? e.target.files[0].name : '';
        fileName.style.display = e.target.files.length > 0 ? 'block' : 'none';
    });
    
    // Handle form submission
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('feedbackName').value,
            email: document.getElementById('feedbackEmail').value,
            message: document.getElementById('feedbackMessage').value,
            file: feedbackFile.files[0] ? feedbackFile.files[0].name : 'No file attached'
        };
        
        console.log('Feedback submitted:', formData);
        showToast('Thank you for your feedback! We appreciate your input.', 'success');
        
        // Reset form and close modal
        feedbackForm.reset();
        fileName.style.display = 'none';
        feedbackModal.classList.remove('show');
        feedbackOverlay.classList.remove('show');
    });
}

function toggleFeedbackModal() {
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackOverlay = document.getElementById('feedbackOverlay');
    
    feedbackModal.classList.toggle('show');
    feedbackOverlay.classList.toggle('show');
}

// ===== MODULE: FAQ TOGGLE =====
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    const answer = item.querySelector('.faq-answer');
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    answer.style.paddingBottom = "0px";
                }
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
                faqAnswer.style.paddingBottom = "20px";
            } else {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                faqAnswer.style.paddingBottom = "0px";
            }
        });
    });
}

// ===== MODULE: APPLICATION FORM =====
function initApplicationForm() {
    const form = document.getElementById('find-job-applicationForm');
    if (!form) return;
    
    const fileUploads = document.querySelectorAll('.find-job-file-upload');
    const progressBar = document.getElementById('find-job-progressBar');
    const nextBtn = document.getElementById('find-job-nextBtn');
    const prevBtn = document.getElementById('find-job-prevBtn');
    const submitBtn = document.getElementById('find-job-submitBtn');
    const successMessage = document.getElementById('find-job-successMessage');
    const formSections = document.querySelectorAll('.find-job-form-section');
    const progressSteps = document.querySelectorAll('.find-job-progress-step');
    const skillsInput = document.getElementById('find-job-skillsInput');
    const skillsContainer = document.getElementById('find-job-skillsContainer');
    const addExperienceBtn = document.getElementById('find-job-addExperience');
    const addEducationBtn = document.getElementById('find-job-addEducation');
    const experienceEntries = document.getElementById('find-job-experienceEntries');
    const educationEntries = document.getElementById('find-job-educationEntries');
    const returnHomeBtn = document.getElementById('find-job-returnHome');
    
    let currentSection = 0;
    const totalSections = formSections.length;
    
    // Initialize form
    populateYearDropdowns();
    updateProgress();
    showSection(currentSection);
    
    // Set up file upload functionality
    initFileUploads(fileUploads);
    
    // Skills input functionality
    if (skillsInput && skillsContainer) {
        skillsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                e.preventDefault();
                addSkillTag(this.value.trim(), skillsContainer);
                this.value = '';
            }
        });
    }
    
    // Add experience and education entries
    if (addExperienceBtn && experienceEntries) {
        addExperienceBtn.addEventListener('click', () => {
            addFormEntry(experienceEntries, '.find-job-experience-entry', 'Remove');
        });
    }
    
    if (addEducationBtn && educationEntries) {
        addEducationBtn.addEventListener('click', () => {
            addFormEntry(educationEntries, '.find-job-education-entry', 'Remove');
        });
    }
    
    // Current job checkbox functionality
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('find-job-current-job')) {
            const entry = e.target.closest('.find-job-experience-entry');
            const endMonth = entry.querySelector('.find-job-end-month');
            const endYear = entry.querySelector('.find-job-end-year');
            
            endMonth.disabled = e.target.checked;
            endYear.disabled = e.target.checked;
            
            if (e.target.checked) {
                endMonth.value = '';
                endYear.value = '';
            }
        }
    });
    
    // Form navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                updateProgress();
                
                if (currentSection === totalSections - 1) {
                    nextBtn.style.display = 'none';
                    submitBtn.style.display = 'block';
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSection--;
            showSection(currentSection);
            updateProgress();
            
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateSection(currentSection)) {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // In a real application, handle form data submission here
            console.log('Form submitted successfully!');
        }
    });
    
    // Return home button
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', function() {
            // In a real application, redirect to home page
        });
    }
    
    // Helper functions
    function showSection(index) {
        formSections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
        
        if (prevBtn) {
            prevBtn.style.display = index === 0 ? 'none' : 'block';
        }
    }
    
    function validateSection(index) {
        const section = formSections[index];
        const inputs = section.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        // Reset errors
        section.querySelectorAll('.find-job-error-message').forEach(error => {
            error.style.display = 'none';
        });
        section.querySelectorAll('.find-job-form-control.find-job-error').forEach(input => {
            input.classList.remove('find-job-error');
        });
        
        // Validate each input
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim() && !input.disabled) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            } else if (input.id === 'find-job-phone' && input.value && !isValidPhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        });
        
        // Special validation for skills
        if (index === 3 && skillsContainer && skillsContainer.children.length === 0) {
            document.getElementById('find-job-skillsError').style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        input.classList.add('find-job-error');
        
        // Find or create error message element
        let errorElement = input.nextElementSibling;
        while (errorElement && !errorElement.classList.contains('find-job-error-message')) {
            errorElement = errorElement.nextElementSibling;
        }
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'find-job-error-message';
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    function updateProgress() {
        const progress = (currentSection / (totalSections - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        progressSteps.forEach((step, index) => {
            if (index < currentSection) {
                step.classList.add('find-job-completed');
                step.classList.remove('find-job-active');
            } else if (index === currentSection) {
                step.classList.add('find-job-active');
                step.classList.remove('find-job-completed');
            } else {
                step.classList.remove('find-job-active', 'find-job-completed');
            }
        });
    }
    
    function populateYearDropdowns() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 50;
        
        // Populate year dropdowns
        const yearDropdowns = document.querySelectorAll('.find-job-start-year, .find-job-end-year, .find-job-graduation-year');
        
        yearDropdowns.forEach(dropdown => {
            // Clear existing options except the first one
            while (dropdown.options.length > 1) {
                dropdown.remove(1);
            }
            
            // Add years
            for (let year = currentYear; year >= startYear; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                dropdown.appendChild(option);
            }
        });
    }
}

function initFileUploads(fileUploads) {
    fileUploads.forEach(upload => {
        const input = upload.querySelector('.find-job-file-upload-input');
        
        upload.addEventListener('click', () => {
            input.click();
        });
        
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                upload.querySelector('.find-job-file-upload-text').textContent = this.files[0].name;
                upload.classList.add('find-job-dragover');
                setTimeout(() => upload.classList.remove('find-job-dragover'), 2000);
            }
        });
        
        // Drag and drop functionality
        upload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('find-job-dragover');
        });
        
        upload.addEventListener('dragleave', function() {
            this.classList.remove('find-job-dragover');
        });
        
        upload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.add('find-job-dragover');
            
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                upload.querySelector('.find-job-file-upload-text').textContent = e.dataTransfer.files[0].name;
                
                setTimeout(() => {
                    this.classList.remove('find-job-dragover');
                }, 1000);
            }
        });
    });
}

function addSkillTag(skill, container) {
    const skillTag = document.createElement('div');
    skillTag.className = 'find-job-skill-tag';
    skillTag.innerHTML = `
        ${skill}
        <span class="find-job-skill-tag-remove">
            <i class="fas fa-times"></i>
        </span>
    `;
    
    skillTag.querySelector('.find-job-skill-tag-remove').addEventListener('click', function() {
        skillTag.remove();
    });
    
    container.appendChild(skillTag);
}

function addFormEntry(container, entrySelector, removeText) {
    const firstEntry = container.querySelector(entrySelector);
    const newEntry = firstEntry.cloneNode(true);
    
    // Clear input values in the new entry
    newEntry.querySelectorAll('input, textarea, select').forEach(input => {
        input.value = '';
    });
    
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'find-job-btn find-job-btn-secondary';
    removeBtn.innerHTML = `<i class="fas fa-trash"></i> ${removeText}`;
    removeBtn.addEventListener('click', function() {
        if (container.querySelectorAll(entrySelector).length > 1) {
            newEntry.remove();
        }
    });
    
    newEntry.appendChild(removeBtn);
    container.appendChild(newEntry);
}

// ===== MODULE: CAREER ADVICE SECTION =====
function initCareerAdviceSection() {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.career-advice-accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other accordion items
            document.querySelectorAll('.career-advice-accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.career-advice-accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            accordionItem.classList.toggle('active');
            
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });
    
    // Story slider functionality
    initStorySlider();
    
    // Animate elements on scroll
    initCareerAdviceScrollAnimations();
    
    // Handle mobile menu
    initMobileMenu();
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', handleCareerAdviceResize);
    handleCareerAdviceResize(); // Initial call
}

function initStorySlider() {
    const storyCards = document.querySelectorAll('.career-advice-story-card');
    const dots = document.querySelectorAll('.career-advice-slider-dot');
    const prevBtn = document.querySelector('.career-advice-slider-btn.prev');
    const nextBtn = document.querySelector('.career-advice-slider-btn.next');
    
    if (!storyCards.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        storyCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide
        storyCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % storyCards.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + storyCards.length) % storyCards.length;
        showSlide(currentSlide);
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSliderInterval();
        });
    });
    
    // Add click events to navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            startSliderInterval();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            startSliderInterval();
        });
    }
    
    function startSliderInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Start the slider
    startSliderInterval();
}

function initCareerAdviceScrollAnimations() {
    const animatedElements = document.querySelectorAll('.career-advice-tip-card, .career-advice-accordion-item, .career-advice-section-title');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.career-advice-mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function handleCareerAdviceResize() {
    // Adjust story slider height based on content
    const activeStory = document.querySelector('.career-advice-story-card.active');
    if (activeStory) {
        const storiesSlider = document.querySelector('.career-advice-stories-slider');
        storiesSlider.style.height = activeStory.scrollHeight + 'px';
    }
    
    // Close mobile menu if open on resize
    if (window.innerWidth > 768) {
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.querySelector('.career-advice-mobile-menu-btn');
        
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
        
        if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
        }
    }
}

// ===== MODULE: PUNCHLINE ROTATOR =====
function initPunchlineRotator() {
    const punchlines = document.querySelectorAll('.punchline');
    if (!punchlines.length) return;
    
    let index = 0;
    
    function showNextPunchline() {
        punchlines.forEach(p => p.classList.remove('active'));
        punchlines[index].classList.add('active');
        index = (index + 1) % punchlines.length;
    }
    
    // Show first line immediately
    showNextPunchline();
    setInterval(showNextPunchline, 3000);
}

// ===== UTILITY FUNCTIONS =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function showToast(message, type = 'info', duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const toastMessage = document.createElement('span');
    toastMessage.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    toast.appendChild(toastMessage);
    toast.appendChild(closeBtn);
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    if (duration) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Handle modal close events
document.addEventListener('click', function(e) {
    // Close modals when clicking outside
    const enrollModal = document.getElementById('enrollModal');
    if (enrollModal && e.target === enrollModal) {
        closeEnrollForm();
    }
    
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackButton = document.getElementById('feedbackButton');
    const feedbackIcon = feedbackButton ? feedbackButton.querySelector('i') : null;
    
    if (feedbackModal && !feedbackModal.contains(e.target) && 
        e.target !== feedbackButton && e.target !== feedbackIcon) {
        feedbackModal.classList.remove('show');
        document.getElementById('feedbackOverlay').classList.remove('show');
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEnrollForm();
        
        const feedbackModal = document.getElementById('feedbackModal');
        if (feedbackModal && feedbackModal.classList.contains('show')) {
            feedbackModal.classList.remove('show');
            document.getElementById('feedbackOverlay').classList.remove('show');
        }
    }
});

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}
  document.addEventListener('DOMContentLoaded', function() {
            // ----- Elements -----
            const tabs = document.querySelectorAll('.company-tab');
            const profileSection = document.getElementById('profile-section');
            const jobsSection = document.getElementById('jobs-section');
            const savedSection = document.getElementById('saved-section');
            const jobPostSection = document.getElementById('job-post-section');
            const jobPostForm = document.getElementById('jobPostForm');
            const successMessage = document.getElementById('success-message');
            const jobsContainer = document.getElementById('jobs-container');
            const savedJobsContainer = document.getElementById('saved-jobs-container');
            const companyEmptySaved = document.getElementById('company-empty-saved');
            const jobModal = document.getElementById('job-modal');
            const closeModal = document.getElementById('close-modal');
            const companyProfileEditBtn = document.getElementById('company-profile-edit-btn');
            const companyEditModal = document.getElementById('company-edit-modal');
            const companyEditClose = document.getElementById('company-edit-close');
            const companyEditSave = document.getElementById('company-edit-save');
            // Search
            const companySearchInput = document.getElementById('company-search-input');
            const companySearchBtn = document.getElementById('company-search-btn');
            const companyClearSearchBtn = document.getElementById('company-clear-search-btn');
            // Profile fields
            const companyProfileName = document.getElementById('company-profile-name');
            const companyProfileTagline = document.getElementById('company-profile-tagline');
            const companyProfileMission = document.getElementById('company-profile-mission');
            const companyProfileEmployees = document.getElementById('company-profile-employees');
            const companyProfileOpenPositions = document.getElementById('company-profile-open-positions');
            const companyProfileJobsPosted = document.getElementById('company-profile-jobs-posted');

            // ----- Storage -----
            let jobs = [
                {
                    id: 1,
                    title: "Senior Frontend Developer",
                    type: "fulltime",
                    location: "San Francisco, CA",
                    salary: "$120,000 - $150,000",
                    description: "We are looking for an experienced Frontend Developer to join our product team. You will be responsible for building the next generation of user interfaces for our SaaS platform.",
                    requirements: ["5+ years experience with React", "Strong knowledge of JavaScript/TypeScript", "Experience with state management libraries", "Familiarity with RESTful APIs", "Experience with testing frameworks"],
                    application: "Send your resume and portfolio to careers@techvision.com",
                    contact: "careers@techvision.com",
                    deadline: "2023-12-15",
                    posted: "2 days ago"
                },
                {
                    id: 2,
                    title: "DevOps Engineer",
                    type: "fulltime",
                    location: "Remote",
                    salary: "$110,000 - $140,000",
                    description: "Join our infrastructure team to build and maintain our cloud infrastructure. You'll work with cutting-edge technologies to ensure our systems are scalable and reliable.",
                    requirements: ["3+ years experience with AWS", "Knowledge of containerization (Docker, Kubernetes)", "Experience with CI/CD pipelines", "Infrastructure as Code (Terraform, CloudFormation)", "Scripting skills (Bash, Python)"],
                    application: "Apply through our website with your resume and cover letter",
                    contact: "devops-hiring@techvision.com",
                    deadline: "2023-12-20",
                    posted: "5 days ago"
                },
                {
                    id: 3,
                    title: "UX/UI Designer",
                    type: "contract",
                    location: "New York, NY",
                    salary: "$70 - $90 per hour",
                    description: "We're seeking a talented UX/UI Designer to help create intuitive and beautiful user experiences for our enterprise clients.",
                    requirements: ["Portfolio demonstrating UX/UI work", "Proficiency in Figma", "Experience with user research methods", "Knowledge of accessibility standards", "Understanding of responsive design"],
                    application: "Email your portfolio and resume to design@techvision.com",
                    contact: "design@techvision.com",
                    deadline: "2023-12-10",
                    posted: "1 week ago"
                }
            ];
            let savedJobs = JSON.parse(localStorage.getItem('companySavedJobs') || '[]');
            let profileData = JSON.parse(localStorage.getItem('companyProfileData') || '{}');

            // ----- Profile: Load from storage -----
            function loadProfile() {
                companyProfileName.childNodes[0].nodeValue = profileData.name || "TechVision Inc.";
                companyProfileTagline.textContent = profileData.tagline || "Technology & Software Development - Building the future through innovative solutions";
                companyProfileMission.textContent = profileData.mission || "At TechVision, we believe in the power of technology to transform businesses and improve lives. Our mission is to create innovative software solutions that empower organizations to reach their full potential. We value creativity, collaboration, and a commitment to excellence in everything we do.";
                companyProfileEmployees.textContent = profileData.employees || 154;
                companyProfileOpenPositions.textContent = profileData.openPositions || 8;
                companyProfileJobsPosted.textContent = profileData.jobsPosted || 32;
            }
            loadProfile();

            // ----- Tabs -----
            tabs.forEach((tab, i) => {
                tab.style.opacity = 0;
                setTimeout(() => {
                    tab.style.transition = 'opacity .7s cubic-bezier(.42,1.14,.76,1.06)';
                    tab.style.opacity = 1;
                }, 180 * i + 400);
            });
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('company-active'));
                    this.classList.add('company-active');
                    [profileSection, jobsSection, jobPostSection, savedSection].forEach(sec => sec.classList.remove('company-section-enter'));
                    profileSection.style.display = 'none';
                    jobsSection.style.display = 'none';
                    jobPostSection.style.display = 'none';
                    savedSection.style.display = 'none';
                    if (this.dataset.tab === 'profile') {
                        profileSection.style.display = 'block';
                        profileSection.classList.add('company-section-enter');
                    } else if (this.dataset.tab === 'jobs') {
                        jobsSection.style.display = 'block';
                        jobsSection.classList.add('company-section-enter');
                    } else if (this.dataset.tab === 'saved') {
                        savedSection.style.display = 'block';
                        savedSection.classList.add('company-section-enter');
                        renderSavedJobs();
                    } else {
                        jobPostSection.style.display = 'block';
                        jobPostSection.classList.add('company-section-enter');
                    }
                });
            });

            // ----- Search/Filter -----
            let jobSearchValue = '';
            companySearchBtn.addEventListener('click', function() {
                jobSearchValue = companySearchInput.value.trim();
                renderJobs();
            });
            companyClearSearchBtn.addEventListener('click', function() {
                jobSearchValue = '';
                companySearchInput.value = '';
                renderJobs();
            });
            companySearchInput.addEventListener('keyup', function(e){
                if(e.key === 'Enter'){
                    jobSearchValue = companySearchInput.value.trim();
                    renderJobs();
                }
            });

            // ----- Job Posting -----
            jobPostForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Validation
                let errors = [];
                if(!jobPostForm.jobTitle.value.trim()) errors.push("Job Title is required.");
                if(!jobPostForm.jobType.value) errors.push("Job Type is required.");
                if(!jobPostForm.jobLocation.value.trim()) errors.push("Location is required.");
                if(!jobPostForm.jobDescription.value.trim()) errors.push("Description is required.");
                if(!jobPostForm.jobRequirements.value.trim()) errors.push("Requirements are required.");
                if(!jobPostForm.applicationInstructions.value.trim()) errors.push("Application Instructions are required.");
                if(!jobPostForm.contactEmail.value.trim()) errors.push("Contact Email is required.");
                if(errors.length) {
                    alert(errors.join('\n'));
                    return;
                }
                const newJob = {
                    id: jobs.length + 1,
                    title: jobPostForm.jobTitle.value,
                    type: jobPostForm.jobType.value,
                    location: jobPostForm.jobLocation.value,
                    salary: jobPostForm.salaryRange.value,
                    description: jobPostForm.jobDescription.value,
                    requirements: jobPostForm.jobRequirements.value.split('\n').filter(item => item.trim() !== ''),
                    application: jobPostForm.applicationInstructions.value,
                    contact: jobPostForm.contactEmail.value,
                    deadline: jobPostForm.applicationDeadline.value || 'Open until filled',
                    posted: 'Just now'
                };
                jobs.unshift(newJob);
                renderJobs();
                successMessage.style.display = 'block';
                successMessage.classList.add('company-section-enter');
                jobPostForm.reset();
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                // Update jobs posted stat
                let jobsPosted = parseInt(companyProfileJobsPosted.textContent) || 0;
                companyProfileJobsPosted.textContent = jobsPosted + 1;
                profileData.jobsPosted = jobsPosted + 1;
                localStorage.setItem('companyProfileData', JSON.stringify(profileData));
            });

            // ----- Modal -----
            closeModal.addEventListener('click', function() {
                jobModal.classList.remove('company-section-enter');
                jobModal.style.display = 'none';
            });
            window.addEventListener('click', function(e) {
                if (e.target === jobModal) {
                    jobModal.classList.remove('company-section-enter');
                    jobModal.style.display = 'none';
                }
                if (e.target === companyEditModal) {
                    companyEditModal.style.display = 'none';
                }
            });

            // ----- Jobs Rendering -----
            function renderJobs() {
                jobsContainer.innerHTML = '';
                let filtered = jobs;
                if(jobSearchValue){
                    filtered = jobs.filter(job =>
                        job.title.toLowerCase().includes(jobSearchValue.toLowerCase()) ||
                        job.location.toLowerCase().includes(jobSearchValue.toLowerCase()) ||
                        getJobTypeLabel(job.type).toLowerCase().includes(jobSearchValue.toLowerCase())
                    );
                }
                filtered.forEach((job, i) => {
                    const jobCard = document.createElement('div');
                    jobCard.className = 'company-job-card';
                    jobCard.style.animationDelay = `${i * 0.1}s`;
                    jobCard.innerHTML = `
                        <button class="company-bookmark-btn ${isJobBookmarked(job.id) ? 'company-bookmarked' : ''}" title="Bookmark"><i class="fas fa-bookmark"></i></button>
                        <span class="company-job-type ${job.type}">${getJobTypeLabel(job.type)}</span>
                        <h3>${job.title}</h3>
                        <div class="company-job-details">
                            <div class="company-job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${job.location}</span>
                            </div>
                            <div class="company-job-detail">
                                <i class="fas fa-dollar-sign"></i>
                                <span>${job.salary}</span>
                            </div>
                            <div class="company-job-detail">
                                <i class="fas fa-clock"></i>
                                <span>${job.posted}</span>
                            </div>
                        </div>
                        <p>${job.description}</p>
                        <div class="company-job-salary">${job.salary}</div>
                        <a href="#" class="company-view-job-btn" data-job-id="${job.id}">View Details</a>
                    `;
                    jobsContainer.appendChild(jobCard);

                    // Bookmark logic
                    jobCard.querySelector('.company-bookmark-btn').addEventListener('click', function(e){
                        e.stopPropagation();
                        toggleBookmark(job.id);
                        renderJobs();
                    });

                    // View details
                    jobCard.querySelector('.company-view-job-btn').addEventListener('click', function(e){
                        e.preventDefault();
                        showJobDetails(job);
                    });
                });
            }
            function getJobTypeLabel(type) {
                const labels = {
                    'fulltime': 'Full-Time',
                    'parttime': 'Part-Time',
                    'contract': 'Contract',
                    'freelance': 'Freelance',
                    'internship': 'Internship',
                    'remote': 'Remote'
                };
                return labels[type] || type;
            }

            // ----- Saved Jobs -----
            function isJobBookmarked(jobId){
                return savedJobs.some(j => j.id === jobId);
            }
            function toggleBookmark(jobId){
                const job = jobs.find(j => j.id === jobId);
                if(isJobBookmarked(jobId)){
                    savedJobs = savedJobs.filter(j => j.id !== jobId);
                } else {
                    savedJobs.push(job);
                }
                localStorage.setItem('companySavedJobs', JSON.stringify(savedJobs));
                renderSavedJobs();
            }
            function renderSavedJobs(){
                savedJobsContainer.innerHTML = '';
                if(savedJobs.length === 0){
                    companyEmptySaved.style.display = 'block';
                } else {
                    companyEmptySaved.style.display = 'none';
                    savedJobs.forEach((job, i) => {
                        const jobCard = document.createElement('div');
                        jobCard.className = 'company-job-card';
                        jobCard.style.animationDelay = `${i * 0.1}s`;
                        jobCard.innerHTML = `
                            <button class="company-bookmark-btn company-bookmarked" title="Remove Bookmark"><i class="fas fa-bookmark"></i></button>
                            <span class="company-job-type ${job.type}">${getJobTypeLabel(job.type)}</span>
                            <h3>${job.title}</h3>
                            <div class="company-job-details">
                                <div class="company-job-detail">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${job.location}</span>
                                </div>
                                <div class="company-job-detail">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span>${job.salary}</span>
                                </div>
                                <div class="company-job-detail">
                                    <i class="fas fa-clock"></i>
                                    <span>${job.posted}</span>
                                </div>
                            </div>
                            <p>${job.description}</p>
                            <div class="company-job-salary">${job.salary}</div>
                            <a href="#" class="company-view-job-btn" data-job-id="${job.id}">View Details</a>
                        `;
                        savedJobsContainer.appendChild(jobCard);

                        jobCard.querySelector('.company-bookmark-btn').addEventListener('click', function(e){
                            e.stopPropagation();
                            toggleBookmark(job.id);
                            renderSavedJobs();
                        });
                        jobCard.querySelector('.company-view-job-btn').addEventListener('click', function(e){
                            e.preventDefault();
                            showJobDetails(job);
                        });
                    });
                }
            }

            // ----- Job Details Modal -----
            function showJobDetails(job) {
                document.getElementById('modal-job-type').className = `company-modal-job-type ${job.type}`;
                document.getElementById('modal-job-type').textContent = getJobTypeLabel(job.type);
                document.getElementById('modal-job-title').textContent = job.title;
                document.getElementById('modal-job-location').textContent = job.location;
                document.getElementById('modal-job-salary').textContent = job.salary;
                document.getElementById('modal-job-posted').textContent = `Posted ${job.posted}`;
                document.getElementById('modal-job-description').textContent = job.description;
                const requirementsList = document.getElementById('modal-job-requirements');
                requirementsList.innerHTML = '';
                job.requirements.forEach(req => {
                    const li = document.createElement('li');
                    li.textContent = req;
                    requirementsList.appendChild(li);
                });
                document.getElementById('modal-job-application').textContent = job.application;
                document.getElementById('modal-job-contact').textContent = job.contact;
                document.getElementById('modal-job-deadline').textContent = job.deadline;
                jobModal.classList.add('company-section-enter');
                jobModal.style.display = 'block';
            }

            // ----- Company Profile Edit Modal -----
            companyProfileEditBtn.addEventListener('click', function(){
                document.getElementById('edit-name').value = companyProfileName.childNodes[0].nodeValue.trim();
                document.getElementById('edit-tagline').value = companyProfileTagline.textContent.trim();
                document.getElementById('edit-employees').value = companyProfileEmployees.textContent.trim();
                document.getElementById('edit-open-positions').value = companyProfileOpenPositions.textContent.trim();
                document.getElementById('edit-jobs-posted').value = companyProfileJobsPosted.textContent.trim();
                document.getElementById('edit-mission').value = companyProfileMission.textContent.trim();
                companyEditModal.style.display = 'block';
            });
            companyEditClose.addEventListener('click', function(){
                companyEditModal.style.display = 'none';
            });
            companyEditSave.addEventListener('click', function(){
                profileData = {
                    name: document.getElementById('edit-name').value.trim(),
                    tagline: document.getElementById('edit-tagline').value.trim(),
                    employees: document.getElementById('edit-employees').value.trim(),
                    openPositions: document.getElementById('edit-open-positions').value.trim(),
                    jobsPosted: document.getElementById('edit-jobs-posted').value.trim(),
                    mission: document.getElementById('edit-mission').value.trim()
                };
                localStorage.setItem('companyProfileData', JSON.stringify(profileData));
                loadProfile();
                companyEditModal.style.display = 'none';
            });

            // ----- Initial Jobs Display -----
            renderJobs();
        });