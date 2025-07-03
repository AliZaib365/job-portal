 // Sample data for jobs
 const jobsData = [
    { id: 1, title: "Senior Frontend Developer", skills: "React, TypeScript, Redux", company: "TechCorp", location: "San Francisco, CA", applications: 24, newToday: 3, posted: "May 15, 2023", status: "active" },
    { id: 2, title: "Product Marketing Manager", skills: "Digital Marketing, SEO, Analytics", company: "Digital Solutions", location: "New York, NY", applications: 18, newToday: 1, posted: "May 10, 2023", status: "active" },
    { id: 3, title: "UX/UI Designer", skills: "Figma, Sketch, User Research", company: "Creative Labs", location: "Remote", applications: 32, newToday: 5, posted: "May 5, 2023", status: "active" },
    { id: 4, title: "Data Scientist", skills: "Python, SQL, Machine Learning", company: "AI Innovations", location: "Boston, MA", applications: 12, newToday: 0, posted: "Apr 28, 2023", status: "pending" },
    { id: 5, title: "Customer Support Specialist", skills: "Customer Service, CRM, Zendesk", company: "CustomerFirst", location: "Chicago, IL", applications: 45, newToday: 0, posted: "Apr 15, 2023", status: "closed" },
    { id: 6, title: "Backend Engineer", skills: "Node.js, MongoDB, AWS", company: "CloudTech", location: "Austin, TX", applications: 15, newToday: 2, posted: "May 18, 2023", status: "active" },
    { id: 7, title: "HR Manager", skills: "Recruitment, Employee Relations", company: "TalentHub", location: "Remote", applications: 8, newToday: 0, posted: "May 12, 2023", status: "active" },
    { id: 8, title: "DevOps Engineer", skills: "Docker, Kubernetes, CI/CD", company: "InfraSystems", location: "Seattle, WA", applications: 22, newToday: 4, posted: "May 8, 2023", status: "active" },
    { id: 9, title: "Content Writer", skills: "SEO, Blogging, Copywriting", company: "ContentMasters", location: "Remote", applications: 17, newToday: 1, posted: "Apr 30, 2023", status: "pending" },
    { id: 10, title: "Sales Executive", skills: "B2B Sales, CRM, Negotiation", company: "SalesForce", location: "Chicago, IL", applications: 28, newToday: 0, posted: "Apr 22, 2023", status: "closed" },
    { id: 11, title: "Mobile Developer", skills: "Flutter, Dart, Firebase", company: "AppWorks", location: "Remote", applications: 19, newToday: 3, posted: "May 20, 2023", status: "active" },
    { id: 12, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 13, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 14, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 15, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 16, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 17, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 18, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 19, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" },
    { id: 20, title: "Product Manager", skills: "Agile, Scrum, Roadmapping", company: "ProductLabs", location: "San Francisco, CA", applications: 14, newToday: 0, posted: "May 14, 2023", status: "active" }
  ];

  // Sample data for applications
  const applicationsData = [
    { id: 1, name: "John Smith", email: "john.smith@example.com", job: "Senior Frontend Developer", company: "TechCorp", applied: "May 20, 2023", status: "Under Review" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", job: "Product Marketing Manager", company: "Digital Solutions", applied: "May 18, 2023", status: "Interview Scheduled" },
    { id: 3, name: "Michael Brown", email: "michael.b@example.com", job: "UX/UI Designer", company: "Creative Labs", applied: "May 17, 2023", status: "Shortlisted" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", job: "Data Scientist", company: "AI Innovations", applied: "May 15, 2023", status: "Rejected" },
    { id: 5, name: "Robert Wilson", email: "robert.w@example.com", job: "Customer Support Specialist", company: "CustomerFirst", applied: "May 10, 2023", status: "Hired" },
    { id: 6, name: "Jennifer Lee", email: "jennifer.l@example.com", job: "Backend Engineer", company: "CloudTech", applied: "May 19, 2023", status: "Under Review" },
    { id: 7, name: "David Kim", email: "david.k@example.com", job: "HR Manager", company: "TalentHub", applied: "May 16, 2023", status: "Interview Scheduled" },
    { id: 8, name: "Lisa Wong", email: "lisa.w@example.com", job: "DevOps Engineer", company: "InfraSystems", applied: "May 14, 2023", status: "Shortlisted" },
    { id: 9, name: "James Miller", email: "james.m@example.com", job: "Content Writer", company: "ContentMasters", applied: "May 12, 2023", status: "Under Review" },
    { id: 10, name: "Emma Garcia", email: "emma.g@example.com", job: "Sales Executive", company: "SalesForce", applied: "May 8, 2023", status: "Rejected" },
    { id: 11, name: "Daniel Chen", email: "daniel.c@example.com", job: "Mobile Developer", company: "AppWorks", applied: "May 21, 2023", status: "Under Review" },
    { id: 12, name: "Olivia Taylor", email: "olivia.t@example.com", job: "Product Manager", company: "ProductLabs", applied: "May 17, 2023", status: "Interview Scheduled" }
  ];

  // Pagination variables
  let currentJobsPage = 1;
  let currentApplicationsPage = 1;
  const rowsPerPage = 5;

  // Initialize the tables
  document.addEventListener('DOMContentLoaded', function() {
    renderJobsTable();
    renderApplicationsTable();
    
    // Tab functionality
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Here you would filter the data based on the selected tab
        currentJobsPage = 1;
        renderJobsTable();
      });
    });
  });

  // Render jobs table with pagination
  function renderJobsTable() {
    const start = (currentJobsPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = jobsData.slice(start, end);
    
    const jobsTableBody = document.getElementById('jobsTableBody');
    jobsTableBody.innerHTML = '';
    
    paginatedData.forEach(job => {
      const row = document.createElement('tr');
      
      // Determine status class
      let statusClass = '';
      if (job.status === 'active') statusClass = 'active';
      else if (job.status === 'pending') statusClass = 'pending';
      else if (job.status === 'closed') statusClass = 'closed';
      
      // Determine new applications color
      let newAppsColor = job.newToday > 0 ? 'var(--success)' : 'var(--gray)';
      let newAppsText = job.newToday > 0 ? `+${job.newToday} new today` : 'No new today';
      
      row.innerHTML = `
        <td>
          <div style="font-weight: 600;">${job.title}</div>
          <div style="font-size: 13px; color: var(--gray);">${job.skills}</div>
        </td>
        <td>
          <div class="user-info">
            <div class="user-avatar">${job.company.substring(0, 2)}</div>
            <div>
              <div class="user-name">${job.company}</div>
              <div class="user-email">${job.location}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 600;">${job.applications}</div>
          <div style="font-size: 12px; color: ${newAppsColor};">${newAppsText}</div>
        </td>
        <td>${job.posted}</td>
        <td><span class="status ${statusClass}">${job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span></td>
        <td>
          <div class="actions">
            <button class="action-btn" title="View Applications">
              <i class="fas fa-users"></i>
            </button>
            <button class="action-btn" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      
      jobsTableBody.appendChild(row);
    });
    
    // Render jobs pagination
    renderPagination('jobsPagination', jobsData.length, currentJobsPage);
  }

  // Render applications table with pagination
  function renderApplicationsTable() {
    const start = (currentApplicationsPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = applicationsData.slice(start, end);
    
    const applicationsTableBody = document.getElementById('applicationsTableBody');
    applicationsTableBody.innerHTML = '';
    
    paginatedData.forEach(app => {
      const row = document.createElement('tr');
      
      // Determine status class
      let statusClass = '';
      if (app.status === 'Under Review' || app.status === 'Shortlisted' || app.status === 'Interview Scheduled') statusClass = 'active';
      else if (app.status === 'Hired') statusClass = 'success';
      else if (app.status === 'Rejected') statusClass = 'rejected';
      
      row.innerHTML = `
        <td>
          <div class="user-info">
            <div class="user-avatar">${app.name.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <div class="user-name">${app.name}</div>
              <div class="user-email">${app.email}</div>
            </div>
          </div>
        </td>
        <td>${app.job}</td>
        <td>${app.company}</td>
        <td>${app.applied}</td>
        <td><span class="status ${statusClass}">${app.status}</span></td>
        <td>
          <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;">
            <i class="fas fa-file-pdf"></i> View CV
          </button>
        </td>
        <td>
          <div class="actions">
            <button class="action-btn" title="View Profile">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn" title="Contact">
              <i class="fas fa-envelope"></i>
            </button>
            ${app.status === 'Rejected' ? 
              `<button class="action-btn" title="Reconsider">
                <i class="fas fa-redo"></i>
              </button>` : 
              `<button class="action-btn" title="Reject">
                <i class="fas fa-times"></i>
              </button>`}
          </div>
        </td>
      `;
      
      applicationsTableBody.appendChild(row);
    });
    
    // Render applications pagination
    renderPagination('applicationsPagination', applicationsData.length, currentApplicationsPage);
  }

  // Render pagination controls
  function renderPagination(elementId, totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const paginationContainer = document.getElementById(elementId);
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;
    if (currentPage === 1) prevButton.classList.add('disabled');
    prevButton.addEventListener('click', () => {
      if (elementId === 'jobsPagination') {
        currentJobsPage = Math.max(1, currentJobsPage - 1);
        renderJobsTable();
      } else {
        currentApplicationsPage = Math.max(1, currentApplicationsPage - 1);
        renderApplicationsTable();
      }
    });
    paginationContainer.appendChild(prevButton);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage, endPage;
    
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }
    
    // First page and ellipsis if needed
    if (startPage > 1) {
      const firstPageButton = document.createElement('button');
      firstPageButton.className = 'pagination-btn';
      firstPageButton.textContent = '1';
      firstPageButton.addEventListener('click', () => {
        if (elementId === 'jobsPagination') {
          currentJobsPage = 1;
          renderJobsTable();
        } else {
          currentApplicationsPage = 1;
          renderApplicationsTable();
        }
      });
      paginationContainer.appendChild(firstPageButton);
      
      if (startPage > 2) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-dots';
        ellipsis.textContent = '...';
        paginationContainer.appendChild(ellipsis);
      }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'pagination-btn';
      if (i === currentPage) pageButton.classList.add('active');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        if (elementId === 'jobsPagination') {
          currentJobsPage = i;
          renderJobsTable();
        } else {
          currentApplicationsPage = i;
          renderApplicationsTable();
        }
      });
      paginationContainer.appendChild(pageButton);
    }
    
    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-dots';
        ellipsis.textContent = '...';
        paginationContainer.appendChild(ellipsis);
      }
      
      const lastPageButton = document.createElement('button');
      lastPageButton.className = 'pagination-btn';
      lastPageButton.textContent = totalPages;
      lastPageButton.addEventListener('click', () => {
        if (elementId === 'jobsPagination') {
          currentJobsPage = totalPages;
          renderJobsTable();
        } else {
          currentApplicationsPage = totalPages;
          renderApplicationsTable();
        }
      });
      paginationContainer.appendChild(lastPageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-btn';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    if (currentPage === totalPages) nextButton.classList.add('disabled');
    nextButton.addEventListener('click', () => {
      if (elementId === 'jobsPagination') {
        currentJobsPage = Math.min(totalPages, currentJobsPage + 1);
        renderJobsTable();
      } else {
        currentApplicationsPage = Math.min(totalPages, currentApplicationsPage + 1);
        renderApplicationsTable();
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Action buttons functionality
  document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
      const btn = e.target.closest('.action-btn');
      // Here you would implement the specific action for each button
      console.log('Action button clicked:', btn.title);
    }
    
    if (e.target.closest('.btn-outline') && e.target.closest('.btn-outline').textContent.includes('View CV')) {
      // Here you would open the CV in a modal or new tab
      console.log('Viewing CV for application');
    }
  });