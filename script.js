// Function to show the Login dialog
function showLoginForm() {
    document.getElementById("loginDialog").style.display = "block";
    document.getElementById("dialogOverlay").style.display = "block";
}

// Function to show the Registration dialog
function showRegisterForm() {
    document.getElementById("registerDialog").style.display = "block";
    document.getElementById("dialogOverlay").style.display = "block";
}

// Function to close any open dialog
function closeDialog() {
    document.getElementById("loginDialog").style.display = "none";
    document.getElementById("registerDialog").style.display = "none";
    document.getElementById("dialogOverlay").style.display = "none";
    document.getElementById("loginMessage").style.display = "none";
    document.getElementById("registerMessage").style.display = "none";
}

// Function to handle user login
function login() {
    // Get email and password input values
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;

    // Retrieve registered user data from localStorage
    var registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    // Check if the registered user data exists
    if (registeredUser) {
        // Validate email and password against the stored data
        if (email === registeredUser.email && password === registeredUser.password) {
            // Hide the login dialog and login/register section
            document.getElementById("loginDialog").style.display = "none";
            document.getElementById("loginRegisterSection").style.display = "none";
            document.getElementById("dialogOverlay").style.display = "none";

            // Show the welcome section or proceed to the next page
            document.getElementById("welcomeSection").style.display = "block";

            // Hide the registration section to prevent it from appearing
            document.getElementById("registerDialog").style.display = "none";

            // Display success message with a celebration effect
            var welcomeMsg = document.getElementById("welcomeMessage");
            if (welcomeMsg) {
                welcomeMsg.innerText = "Logged in successfully!";
                welcomeMsg.style.display = "block";
                welcomeMsg.classList.add("celebrate");
            } else {
                console.error("Element with ID 'welcomeMessage' not found.");
            }

            // Redirect to the next page or handle login success here
            // Example: window.location.href = "next_page.html";
        } else {
            // Display an error message for invalid email or password
            var loginMsg = document.getElementById("loginMessage");
            if (loginMsg) {
                loginMsg.innerText = "Invalid email or password!";
                loginMsg.style.display = "block";
            } else {
                console.error("Element with ID 'loginMessage' not found.");
            }
        }
    } else {
        // No registered user found
        var loginMsg = document.getElementById("loginMessage");
        if (loginMsg) {
            loginMsg.innerText = "No registered users found. Please register first.";
            loginMsg.style.display = "block";
        } else {
            console.error("Element with ID 'loginMessage' not found.");
        }
    }
}


// Function to handle user registration
function register() {
    // Get form values
    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var email = document.getElementById("registerEmail").value.trim();
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var mobileNumber = document.getElementById("mobileNumber").value.trim();
    var country = document.getElementById("country").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var educationStatus = document.getElementById("educationStatus").value;
    var seekingJobElements = document.getElementsByName("seekingJob");
    var seekingJob = "";
    for (var i = 0; i < seekingJobElements.length; i++) {
        if (seekingJobElements[i].checked) {
            seekingJob = seekingJobElements[i].value;
            break;
        }
    }

    // Validate form fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobileNumber || !country || !dateOfBirth || !educationStatus || !seekingJob) {
        displayRegisterMessage("Please fill in all the fields.");
        return;
    }

    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayRegisterMessage("Please enter a valid email address.");
        return;
    }

    // Validate password length
    if (password.length < 6) {
        displayRegisterMessage("Password must be at least 6 characters long.");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        displayRegisterMessage("Passwords do not match.");
        return;
    }

    // Validate mobile number (basic validation)
    var mobilePattern = /^\d{7,15}$/;
    if (!mobilePattern.test(mobileNumber)) {
        displayRegisterMessage("Please enter a valid mobile number.");
        return;
    }

    // Check if user already exists
    var existingUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (existingUser && existingUser.email === email) {
        displayRegisterMessage("This email is already registered.");
        return;
    }

    // Create user object
    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password, // Note: In real applications, never store plain passwords
        mobileNumber: mobileNumber,
        country: country,
        dateOfBirth: dateOfBirth,
        educationStatus: educationStatus,
        seekingJob: seekingJob
    };

    // Store user data in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(user));

    // Simulate sending email notification
    // In real applications, you would send an email via server-side code
    displayRegisterMessage("Registered successfully! Please check your email.");

    // Optionally, close the dialog after some time
    setTimeout(function() {
        document.getElementById("registerDialog").style.display = "none";
        // Clear the form
        document.getElementById("registerForm").reset();
        document.getElementById("registerMessage").style.display = "none";
    }, 3000);
}

// Helper function to display registration messages
function displayRegisterMessage(message) {
    var registerMsg = document.getElementById("registerMessage");
    registerMsg.innerText = message;
    registerMsg.style.display = "block";
}

// Function to show specific sections
function showSection(section) {
    // Hide all sections
    document.getElementById("homeContent").style.display = "none";
    document.getElementById("aboutContent").style.display = "none";
    document.getElementById("placesContent").style.display = "none";
    document.getElementById("contactContent").style.display = "none";

    // Show the selected section
    document.getElementById(section + "Content").style.display = "block";
}

// Handle Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Handle form submission logic here
    alert("Thank you for contacting us!");
    // Reset form
    document.getElementById("contactForm").reset();
});
