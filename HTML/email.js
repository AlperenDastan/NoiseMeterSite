User
function sendMail(event) {
    event.preventDefault();
    // Clear error messages
    clearErrorMessages();

    var params = {
        from_name: document.getElementById("fullname").value,
        num: document.getElementById("num").value,
        email_id: document.getElementById("email_id").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    }

    // Validation checks
    if (!params.from_name) {
        displayErrorMessage("fullname-error", "Please enter your name.");
        return;
    }
    if (!params.email_id || !isValidEmail(params.email_id)) {
        displayErrorMessage("email-error", "Please enter a valid email address.");
        return;
    }
    if (!params.num) {
        displayErrorMessage("num-error", "Please enter your phone number.");
        return;
    }
    if (!params.subject) {
        displayErrorMessage("subject-error", "Please enter the subject.");
        return;
    }
    if (!params.message) {
        displayErrorMessage("message-error", "Please enter your message.");
        return;
    }

    emailjs.send("gmail", "template_f7ebgjp", params)
    .then(function (res) {
        console.log("Email sent successfully"); // Debugging
        var emailStatus = document.getElementById("emailStatus");
        if (emailStatus) {
            emailStatus.style.display = "block";
            emailStatus.textContent = "Email Sent!";
        }
        document.getElementById("emailForm").reset(); // Reset form
    })
    .catch(function (error) {
        console.error("Email could not be sent:", error);
    });
}

function isValidEmail(email) {
    // Simple email validation regex
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);Q
}

function displayErrorMessage(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrorMessages() {
    var errorMessages = document.querySelectorAll(".error-msg");
    errorMessages.forEach(function (element) {
        element.textContent = "";
    });
}