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
            alert('Returning to home page...');
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