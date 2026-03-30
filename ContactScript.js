// Header navigation bar functionality-----------------------------------------------

// Hamburger menu animation function
function myFunction(x) {
  x.classList.toggle("change");
}
// Navigation bar toggle function
function toggleNavbar() {
  var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}


// Contact form validation functionality-----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");
  
  // Initialize EmailJS with your PUBLIC KEY
  emailjs.init("AKP5yJ2L8ChjtMKGG"); // Replace with your actual public key
  console.log("EmailJS initialized");

  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const thankYouMessage = document.getElementById("thankYouMessage");

  console.log("Form element:", form);
  console.log("Thank you message element:", thankYouMessage);

  if (!form) {
    console.error("No form with id 'contactForm' found.");
    return;
  }

  let errorContainer = document.getElementById("formErrors");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "formErrors";
    errorContainer.style.display = "none";
    errorContainer.setAttribute("aria-live", "polite");
    form.parentNode.insertBefore(errorContainer, form); 
  }

  form.addEventListener("submit", function (event) {
    console.log("Form submitted");
    event.preventDefault(); 

    // clear previous errors
    errorContainer.innerHTML = "";
    errorContainer.style.display = "none";

    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput || !emailRegex.test(String(emailInput.value).trim())) {
      errors.push("Please enter a valid email address.");
    }
    if (!subjectInput || String(subjectInput.value).trim().length < 3) {
      errors.push("Subject must be at least 3 characters long.");
    }
    if (!messageInput || String(messageInput.value).trim().length < 6) {
      errors.push("Message must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      const ul = document.createElement("ul");
      errors.forEach(err => {
        const li = document.createElement("li");
        li.textContent = err;
        ul.appendChild(li);
      });
      errorContainer.appendChild(ul);
      errorContainer.style.display = "block";
      if (!emailRegex.test(String(emailInput.value || "").trim())) emailInput.focus();
      else if (String(subjectInput.value).trim().length < 3) subjectInput.focus();
      else messageInput.focus();
      return;
    }

    console.log("Validation passed, sending email...");

    // Send email using EmailJS
    const serviceID = "contact_service"; 
    const templateID = "contact_form"; 

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        console.log('Email sent successfully!');
        form.style.display = "none";
        console.log("Form hidden");
        
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
          console.log("Thank you message displayed");
          const heading = thankYouMessage.querySelector("h1,h2,h3");
          if (heading && heading.focus) {
            heading.focus();
          }
        } else {
          console.error("Thank you message element not found!");
        }
        form.reset();
      }, (error) => {
        console.error('Email send failed:', error);
        errorContainer.innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
        errorContainer.style.display = "block";
      });
  });
});