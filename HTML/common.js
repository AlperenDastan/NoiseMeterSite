// common.js

// Function to update the navigation bar based on the user's login status
function updateNavbar() {
    // Retrieve the login status from sessionStorage
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Locate the logout button and dashboard link elements
    const logoutButton = document.getElementById("logoutButton");
    const dashboardLink = document.getElementById("dashboardLink");

    // Display or hide the logout button and dashboard link based on the login status
    if (logoutButton) {
        logoutButton.style.display = isLoggedIn ? "block" : "none";
    }
    if (dashboardLink) {
        dashboardLink.style.display = isLoggedIn ? "block" : "none";
    }
}

// Function to handle the logout process
function handleLogout() {
    // Update sessionStorage to reflect that the user is not logged in
    sessionStorage.setItem("isLoggedIn", "false");

    // Update the navbar to reflect the logout status
    updateNavbar();

    // Redirect the user to the login page after logging out
    window.location.href = "Index.html";
}

// Function to handle clicks on the logo
function handleLogoClick() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Redirect to the front page if logged in, otherwise redirect to the login page
    window.location.href = isLoggedIn ? "Front.html" : "Index.html";
}


// Function to handle clicks on the Home link
function handleHomeClick() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Redirect to the appropriate page based on the login status
    if (isLoggedIn) {
        window.location.href = "Front.html"; // Redirect to Front.html when logged in
    } else {
        window.location.href = "Index.html"; // Redirect to Index.html when logged out
    }
}


// Add an event listener for when the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Update the navbar to reflect the current login status as soon as the page loads
    updateNavbar();
});
