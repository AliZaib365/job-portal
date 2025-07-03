document.addEventListener('DOMContentLoaded', function() {
  // Toggle Sidebar
  const toggleSidebar = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  
  function toggleSidebarVisibility() {
    sidebar.classList.toggle('show');
    sidebarOverlay.classList.toggle('show');
    document.body.classList.toggle('sidebar-open');
  }
  
  toggleSidebar.addEventListener('click', toggleSidebarVisibility);
  mobileMenuToggle.addEventListener('click', toggleSidebarVisibility);
  sidebarOverlay.addEventListener('click', toggleSidebarVisibility);
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992 && !sidebar.contains(e.target)) {
      if (sidebar.classList.contains('show')) {
        toggleSidebarVisibility();
      }
    }
  });

  // Toggle Submenus
  document.querySelectorAll('.has-submenu').forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target === this || e.target.classList.contains('fa-angle-down')) {
        this.classList.toggle('active');
      }
    });
  });

  // Initialize Charts
  const jobsCtx = document.getElementById('jobsChart').getContext('2d');
  const jobsChart = new Chart(jobsCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Job Postings',
          data: [120, 190, 170, 220, 260, 240, 300],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Applications',
          data: [80, 150, 130, 180, 200, 220, 250],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Profile dropdown
  const profileBtn = document.getElementById('profileDropdownBtn');
  const dropdown = document.getElementById('profileDropdown');
  
  profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  // Notification popup
  const notifIcon = document.getElementById('notificationIcon');
  const notifPopup = document.getElementById('notificationPopup');
  
  notifIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    notifPopup.classList.toggle('show');
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    dropdown.classList.remove('show');
    notifPopup.classList.remove('show');
  });

  // Search bar functionality
  document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    const val = document.getElementById('searchInput').value.trim();
    if(val){
      alert('Search: ' + val);
    }
  });

  // Responsive: close dropdowns/popups on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      dropdown.classList.remove('show');
      notifPopup.classList.remove('show');
    }
  });
  
  // Show/hide mobile menu toggle based on screen size
  function checkMobileMenu() {
    if (window.innerWidth <= 992) {
      mobileMenuToggle.style.display = 'flex';
    } else {
      mobileMenuToggle.style.display = 'none';
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    }
  }
  
  // Initial check
  checkMobileMenu();
  
  // Check on resize
  window.addEventListener('resize', checkMobileMenu);
});