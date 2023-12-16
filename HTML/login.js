// Function to update the navigation bar based on the user's login status
function updateNavbar() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Update the display of the logout button and dashboard link based on login status
    document.getElementById("logoutButton").style.display = isLoggedIn ? "block" : "none";
    document.getElementById("dashboardLink").style.display = isLoggedIn ? "block" : "none";

    // Hide the error message by default
    document.getElementById("errorMessage").style.display = "none";
}

// Function to authenticate the user
function authentication(username, password) {
    // Return true if credentials match, else false
    return username === "admin" && password === "Admin";
}

// Function to handle user login
function handleLogin(username, password) {
    // Check if the username and password are correct
    if (authentication(username, password)) {
        // Set the session as logged in
        sessionStorage.setItem("isLoggedIn", "true");
        
        // Update the navbar to reflect the login status
        updateNavbar();

        // Redirect to the front page after successful login
        window.location.href = "Front.html";
    } else {
        // If login fails, display an error message
        const errorMessageElement = document.getElementById("errorMessage");
        errorMessageElement.textContent = "Wrong username or password";
        errorMessageElement.style.display = "block";
        
        // Set the session as not logged in
        sessionStorage.setItem("isLoggedIn", "false");
    }
}

// Function to handle user logout
function handleLogout() {
    // Remove the login status from the session
    sessionStorage.removeItem("isLoggedIn");

    // Update the navbar to reflect the logout status
    updateNavbar();
}

// Adding an event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Attach an event listener to the login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            // Prevent the default form submission behavior
            e.preventDefault();

            // Get the username and password from the form
            const username = e.target.username.value.toLowerCase();
            const password = e.target.password.value;

            // Handle the login process
            handleLogin(username, password);
        });
    }

    // Attach an event listener to the logout button
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function (e) {
            // Prevent the default button behavior
            e.preventDefault();

            // Handle the logout process
            handleLogout();
        });
    }

    // Update the navbar immediately when the page loads
    updateNavbar();
});
