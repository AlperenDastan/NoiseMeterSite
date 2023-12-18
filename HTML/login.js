const baseUrl = "https://noisemeterrestapi.azurewebsites.net/api/Login"; // Replace with your API URL

// Function to make API call for user authentication
function authenticateUser(username, password) {
    const userData = {
        Username: username,
        Password: password
    };

    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.text(); // Assuming the response is plain text (the user's name)
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
}

async function handleLogin(username, password) {
    try {
        const userName = await authenticateUser(username, password);

        if (userName) {
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userName", userName); // Store the user's name
            // Call this function wherever appropriate to update the user's name display
            updateNavbar();
            window.location.href = "Front.html";
        } else {
            displayErrorMessage("Wrong username or password");
            sessionStorage.setItem("isLoggedIn", "false");
        }
    } catch (error) {
        displayErrorMessage("Error during login: " + error.message);
    }
}



// Function to display error message
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
}

// Rest of your JavaScript code for event listeners, etc...


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
            const username = e.target.username.value;
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
