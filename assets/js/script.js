'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// shared modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const toggleModal = function () {
  if (modalContainer) {
    // Toggle the active class on modal and overlay
    modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
    
    // Disable body scrolling when modal is open
    const body = document.body;
    if (modalContainer.classList.contains("active")) {
      // Store the current scroll position
      window.modalScrollPosition = window.scrollY;
      // Prevent background scrolling
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = `-${window.modalScrollPosition}px`;
    } else {
      // Reset scrolling and restore position
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      // Restore scroll position
      window.scrollTo(0, window.modalScrollPosition);
      
      // Reset modal scroll position when closing
      setTimeout(() => {
        if (document.querySelector(".project-modal")) {
          document.querySelector(".project-modal").scrollTop = 0;
        }
      }, 300);
    }
  }
}

// Add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", toggleModal);
}
if (overlay) {
  overlay.addEventListener("click", toggleModal);
}

// Project modal functionality
const projectItems = document.querySelectorAll("[data-project-item]");
const projectLinks = document.querySelectorAll("[data-project-link]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalGithubBtn = document.querySelector("[data-modal-github-btn]");
const modalWebsiteBtn = document.querySelector("[data-modal-website-btn]");

// Add click event to all project items
for (let i = 0; projectLinks && i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    
    const projectItem = this.closest("[data-project-item]");
    
    if (modalImg) {
      const imgSrc = projectItem.querySelector(".project-img img").src;
      const imgAlt = projectItem.querySelector(".project-img img").alt;
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;
    }
    
    if (modalTitle) modalTitle.innerHTML = projectItem.querySelector(".project-title").innerHTML;
    if (modalCategory) modalCategory.innerHTML = projectItem.querySelector(".project-category").innerHTML;
    
    // Set the GitHub button link to the project link
    if (modalGithubBtn) {
      const projectLink = this.getAttribute("href");
      modalGithubBtn.href = projectLink;
    }
    
    // Set the Website button link based on the project
    if (modalWebsiteBtn) {
      const projectTitle = projectItem.querySelector(".project-title").textContent;
      // Check if the project has a website attribute, otherwise hide the button
      const websiteLink = getWebsiteLinkForProject(projectTitle);
      if (websiteLink) {
        modalWebsiteBtn.href = websiteLink;
        modalWebsiteBtn.style.display = "flex";
      } else {
        modalWebsiteBtn.style.display = "none";
      }
    }
    
    if (modalText) {
      // Get the project details content
      const projectDetails = projectItem.querySelector(".project-details");
      if (projectDetails) {
        // Simply copy the content
        modalText.innerHTML = projectDetails.innerHTML;
      }
    }

    // Reset modal scroll position before opening
    if (document.querySelector(".project-modal")) {
      document.querySelector(".project-modal").scrollTop = 0;
    }

    toggleModal();
  });
}

// Function to get website links for projects
function getWebsiteLinkForProject(projectTitle) {
  // Map project titles to their website URLs
  const websiteLinks = {
    "ECB Interest Rate Predictor": "https://ecb-interest-rate-policy.streamlit.app/",
    "Gamified Financial Learning App": "https://moneywisedemo.netlify.app/",
    "Impact of Carbon Intensity on Mergers and Acquisitions": "https://github.com/leo-lightfoot/GreenAcquisition/blob/main/Energy_Sector_M_A.pdf",
    "Joust Website": "https://leo-lightfoot.github.io/joust-website/",
    "Fundo": "https://leo-lightfoot.github.io/fundo",
    "Brawlhalla": ""
  };
  
  return websiteLinks[projectTitle] || "";
}

// Testimonials functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");

// Add click event to all testimonials items
for (let i = 0; testimonialsItem && i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    if (modalImg) modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    toggleModal();
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; selectItems && i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; filterItems && i < filterItems.length; i++) {
    // Reset all items to inactive
    filterItems[i].classList.remove("active");

    // Show only the items that match the selected category
    if (selectedValue === "projects" && filterItems[i].dataset.category === "projects") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === "learning" && filterItems[i].dataset.category === "learning") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === "competitions" && filterItems[i].dataset.category === "competitions") {
      filterItems[i].classList.add("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn && filterBtn.length > 0 ? filterBtn[0] : null;

for (let i = 0; filterBtn && i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to control sidebar visibility based on active page
function updateSidebarVisibility() {
  const aboutSidebar = document.querySelector('[data-sidebar="about"]');
  const resumeSidebar = document.querySelector('[data-sidebar="resume"]');
  const activePage = document.querySelector(".active[data-page]");
  
  if (activePage && aboutSidebar && resumeSidebar) {
    const pageType = activePage.dataset.page;
    
    if (pageType === "about") {
      aboutSidebar.style.display = "block";
      resumeSidebar.style.display = "none";
    } else if (pageType === "resume") {
      aboutSidebar.style.display = "none";
      resumeSidebar.style.display = "block";
    } else {
      aboutSidebar.style.display = "none";
      resumeSidebar.style.display = "none";
    }
    
    console.log("Sidebar visibility updated for:", pageType);
  }
}

// FIXED: Navigation functionality - removed duplicate event listeners
// and ensured proper page switching
for (let i = 0; navigationLinks && i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Get the clicked link's text in lowercase
    const clickedPage = this.innerHTML.toLowerCase();
    
    // Remove active class from all navigation links
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    
    // Add active class to the clicked link
    this.classList.add("active");
    
    // Show the corresponding page and hide others
    for (let j = 0; pages && j < pages.length; j++) {
      if (clickedPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }
    
    // Update sidebar visibility based on active page
    updateSidebarVisibility();
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
    
    console.log("Navigated to:", clickedPage); // Debug log
  });
}

// FIXED: Theme toggle functionality
const themeBtn = document.querySelector("[data-theme-btn]");

// Apply the theme from localStorage or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// Set initial icon based on current theme
if (themeBtn) {
  themeBtn.innerHTML = savedTheme === "light" 
    ? '<ion-icon name="sunny-outline"></ion-icon>'
    : '<ion-icon name="moon-outline"></ion-icon>';

  // Theme toggle handler
  themeBtn.addEventListener("click", function() {
    // Get current theme
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    // Set new theme (opposite of current)
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // Update theme attribute on document
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update icon based on new theme
    this.innerHTML = newTheme === "light"
      ? '<ion-icon name="sunny-outline"></ion-icon>'
      : '<ion-icon name="moon-outline"></ion-icon>';
      
    console.log("Theme changed to:", newTheme); // Debug log
  });
}

// Initialize the page on load
document.addEventListener("DOMContentLoaded", function() {
  // Set the first page as active by default if none is active
  if (pages && pages.length > 0 && !document.querySelector("[data-page].active")) {
    pages[0].classList.add("active");
    if (navigationLinks && navigationLinks.length > 0) {
      navigationLinks[0].classList.add("active");
    }
  }
  
  // Update sidebar visibility for initial page
  updateSidebarVisibility();
  
  // Apply the theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  
  console.log("Page initialized with theme:", savedTheme);
  
  // Button functionality in modal
  // Prevent buttons clicks from opening the modal
  const modalButtons = document.querySelectorAll('.modal-github-btn, .modal-website-btn');
  
  modalButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Stop the event from bubbling up to parent elements
      e.stopPropagation();
    });
  });
  
  // Update links based on project - this is now handled in the main project click handler
  const modalGithubBtn = document.querySelector('.modal-github-btn');
  const modalWebsiteBtn = document.querySelector('.modal-website-btn');
});