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

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) {
    modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; testimonialsItem && i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    if (modalImg) modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
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
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
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

// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; formInputs && i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {
//     // check form validation
//     if (form && form.checkValidity()) {
//       if (formBtn) formBtn.removeAttribute("disabled");
//     } else {
//       if (formBtn) formBtn.setAttribute("disabled", "");
//     }
//   });
// }

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to control sidebar visibility based on active page
function updateSidebarVisibility() {
  const sidebar = document.querySelector("[data-sidebar]");
  const activePage = document.querySelector("[data-page].active");
  
  if (activePage && sidebar) {
    const pageType = activePage.dataset.page;
    
    // Show sidebar only on about and resume pages
    if (pageType === "about" || pageType === "resume") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
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
  
  console.log("Page initialized with theme:", savedTheme); // Debug log
});