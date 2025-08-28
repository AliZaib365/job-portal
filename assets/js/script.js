// --- About Page Animations and Effects ---
document.addEventListener('DOMContentLoaded', function () {
  // Algorithm visualization animation
  setTimeout(function () {
    const matchLine = document.querySelector('.about-match-line');
    if (matchLine) {
      matchLine.style.width = 'calc(100% - 320px)';
    }

    setTimeout(function () {
      const matchPercentage = document.querySelector('.about-match-percentage');
      if (matchPercentage) {
        matchPercentage.style.opacity = '1';
      }

      // Animate the job seeker and employer moving toward center
      const jobSeeker = document.querySelector('.about-job-seeker');
      const employer = document.querySelector('.about-employer');
      if (jobSeeker) jobSeeker.style.left = '0px';
      if (employer) employer.style.right = '0px';

      // Create sparkle effects
      const sparkles = document.querySelectorAll('.about-sparkle');
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
    }, 1000);
  }, 1000);

  // Animate algorithm steps on scroll
  const algorithmSteps = document.querySelectorAll('.about-algorithm-step');
  const algorithmVisual = document.querySelector('.about-algorithm-visual');
  const teamMembers = document.querySelectorAll('.about-team-member');
  const statItems = document.querySelectorAll('.about-stat-item');

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('about-algorithm-step')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.transition = 'all 0.6s ease';
        } else if (entry.target.classList.contains('about-algorithm-visual')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.transition = 'all 0.8s ease';
        } else if (entry.target.classList.contains('about-team-member')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        } else if (entry.target.classList.contains('about-stat-item')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';

          // Animate counting up for stats
          const statNumber = entry.target.querySelector('h3');
          if (statNumber) {
            // Get number, keeping any trailing chars (K, M, %, +)
            const originalText = statNumber.innerText;
            const target = parseInt(originalText.replace(/\D/g, ''));
            let count = 0;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const suffix = originalText.replace(/[0-9]/g, '');
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
        }
      }
    });
  }, observerOptions);

  // Observe elements
  algorithmSteps.forEach(step => observer.observe(step));
  if (algorithmVisual) observer.observe(algorithmVisual);
  teamMembers.forEach(member => observer.observe(member));
  statItems.forEach(item => observer.observe(item));
});
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add('fade-in');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  animateOnScroll();

  const heroElements = document.querySelectorAll('.hero .animate');
  heroElements.forEach(el => {
    el.classList.add('fade-in');
  });
});

window.addEventListener('scroll', animateOnScroll);

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

function toggleMobileSidebar() {
  const sidebar = document.getElementById('mobileSidebar');
  sidebar.classList.toggle('show');
}

function openEnrollForm() {
  document.getElementById('enrollModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeEnrollForm() {
  document.getElementById('enrollModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

function submitEnrollForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enrollmentData = {
    companyName: formData.get('companyName'),
    address: formData.get('address'),
    phoneNumber: formData.get('phoneNumber')
  };
  console.log('Enrollment Data:', enrollmentData);
  showToast('🎉 You’re enrolled! We’ll be in touch soon with your next steps.', 'success');
  closeEnrollForm();
  event.target.reset();
}

document.getElementById('enrollModal').addEventListener('click', function (event) {
  if (event.target === this) closeEnrollForm();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeEnrollForm();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

function showToast(message, type = 'info', duration = 5000) {
  const toastContainer = document.getElementById('toastContainer');
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
// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
      const answer = item.querySelector('.faq-answer');
      item.classList.remove('active');
      answer.style.maxHeight = null;
      answer.style.paddingBottom = "0px";
    });

    // Toggle current FAQ
    if (!isActive) {
      faqItem.classList.add('active');
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "110px";
      faqAnswer.style.paddingBottom = "20px";
    } else {
      faqItem.classList.remove('active');
      faqAnswer.style.maxHeight = null;
      faqAnswer.style.paddingBottom = "0px";
    }
  });
});
// Feedback Button Functionality
// Feedback Button Functionality
const feedbackButton = document.getElementById('feedbackButton');
const feedbackModal = document.getElementById('feedbackModal');
const feedbackOverlay = document.getElementById('feedbackOverlay');
const feedbackForm = document.getElementById('feedbackForm');
const cancelFeedback = document.getElementById('cancelFeedback');
const feedbackFile = document.getElementById('feedbackFile');
const fileName = document.getElementById('fileName');

// Toggle feedback modal
function toggleFeedbackModal() {
  feedbackModal.classList.toggle('show');
  feedbackOverlay.classList.toggle('show');
}

feedbackButton.addEventListener('click', toggleFeedbackModal);

// Also handle clicks directly on the icon if needed
const feedbackIcon = feedbackButton.querySelector('i');
feedbackIcon.addEventListener('click', toggleFeedbackModal);

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
  if (e.target.files.length > 0) {
    fileName.textContent = e.target.files[0].name;
    fileName.style.display = 'block';
  } else {
    fileName.style.display = 'none';
  }
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

  // Show success message
  showToast('Thank you for your feedback! We appreciate your input.', 'success');

  // Reset form and close modal
  feedbackForm.reset();
  fileName.style.display = 'none';
  feedbackModal.classList.remove('show');
  feedbackOverlay.classList.remove('show');
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (!feedbackModal.contains(e.target) && e.target !== feedbackButton && e.target !== feedbackIcon) {
    feedbackModal.classList.remove('show');
    feedbackOverlay.classList.remove('show');
  }
});
const punchlines = document.querySelectorAll('.punchline');
let index = 0;

function showNextPunchline() {
  punchlines.forEach(p => p.classList.remove('active'));
  punchlines[index].classList.add('active');
  index = (index + 1) % punchlines.length;
}

// Show first line immediately
showNextPunchline();
setInterval(showNextPunchline, 3000);

// About
