# Abdul Malik's Portfolio Website

## Overview
This is my personal portfolio, showcasing professional experience, skills, and personal interests. The website features a responsive design with a dark/light theme toggle and a tabbed interface for different sections of content.

## Project Structure 

Portfolio/
├── index.html # Main HTML file
├── assets/ # Assets directory
│ ├── css/ # CSS stylesheets
│ │ └── style.css # Main stylesheet
│ ├── js/ # JavaScript files
│ │ └── script.js # Main JavaScript functionality
│ ├── images/ # Image assets
│ └── resume/ # Resume files
└── README.md # Project documentation

## Features

### 1. Responsive Design
- Mobile-first approach with responsive breakpoints
- Adapts to different screen sizes (mobile, tablet, desktop)
- Sidebar collapses on smaller screens

### 2. Theme Toggle
- Dark/light theme switching
- Theme preference saved in localStorage
- Custom styling for both themes

### 3. Navigation System
- Tab-based navigation between different sections
- Smooth transitions between content areas
- Active tab highlighting

### 4. Content Sections

    #### About
    - Personal introduction and background
    - Professional focus areas with icons
    - Personal interests and hobbies

    #### Resume
    - Tools expertise
    - Professional experience timeline
    - Education history
    - Technical skills with progress indicators
    - Language proficiency
    - Downloadable PDF resume

    #### Portfolio
    - Project showcase with filtering capability
    - Categories: Projects, Learning, Competitions
    - Visual thumbnails with hover effects


## How It Works

### Navigation System
The website uses a tab-based navigation system. When a navigation item is clicked:
1. The active class is removed from all navigation links
2. The active class is added to the clicked link
3. The corresponding content section is displayed
4. The page scrolls to the top

### Theme Toggle
The theme toggle button switches between dark and light themes:
1. The current theme is retrieved from localStorage or defaults to dark
2. When clicked, it toggles between themes
3. The theme preference is saved to localStorage
4. The button icon changes to reflect the current theme

### Portfolio Filtering
The portfolio section includes filtering functionality:
1. Projects can be filtered by category (Projects, Learning, Competitions)
2. Filter buttons highlight the active category
3. Only projects matching the selected category are displayed

### Responsive Behavior
The website adapts to different screen sizes:
1. On mobile devices, the sidebar collapses and can be toggled
2. Layout adjusts using CSS Grid and Flexbox
3. Font sizes and spacing scale appropriately
4. Navigation becomes more compact on smaller screens
