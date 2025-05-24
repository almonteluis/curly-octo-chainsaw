// Function to toggle the navigation menu's visibility
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

// Add event listener to the hamburger icon
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  } else {
    console.error("Hamburger icon not found!");
  }
});

// Implement smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const targetId = link.getAttribute("href").substring(1); // Get the target section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start",
      });
    }

    // Close the menu after clicking a link (for mobile view)
    document.querySelector("nav ul").classList.remove("active");
  });
});

// Debugging the filterProjects function
function filterProjects(category) {
  console.log(`Filtering projects by category: ${category}`);
  const projects = document.querySelectorAll(".project");
  projects.forEach((project) => {
    console.log(`Project category: ${project.dataset.category}`);
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "block"; // Show matching projects
    } else {
      project.style.display = "none"; // Hide non-matching projects
    }
  });
}

// Add event listeners to filter buttons
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterProjects(category);
  });
});

// Function to display a lightbox for project images
function openLightbox(imageSrc) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${imageSrc}" alt="Project Image" />
      <button class="lightbox-close" aria-label="Close lightbox">×</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Close lightbox on button click or outside click
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
      lightbox.remove();
    }
  });
}

// Add event listeners to project images
document.querySelectorAll(".project img").forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.src);
  });

});

// Function to validate the contact form
function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  let isValid = true;

  // Validate name field
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  if (!nameInput.value.trim()) {
    nameError.textContent = "Name is required.";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Validate email field
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate message field
  const messageInput = document.getElementById("message");
  const messageError = document.getElementById("message-error");
  if (!messageInput.value.trim()) {
    messageError.textContent = "Message is required.";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  // If the form is valid, show a success message
  if (isValid) {
    alert("Thank you for your message! We will get back to you soon.");
    document.querySelector("form").reset(); // Reset the form
  }
}

// Add event listener to the form
document.querySelector("form").addEventListener("submit", validateForm);

// Real-time validation for inputs
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (input.value.trim()) {
      errorElement.textContent = ""; // Clear error message if input is valid
    }
  });
});