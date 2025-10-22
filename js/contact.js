document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const fields = {
    name: document.getElementById("contact-name"),
    email: document.getElementById("contact-email"),
    subject: document.getElementById("contact-subject"),
    message: document.getElementById("contact-message"),
  };

  const errors = {
    name: document.getElementById("test-contact-error-name"),
    email: document.getElementById("test-contact-error-email"),
    subject: document.getElementById("test-contact-error-subject"),
    message: document.getElementById("test-contact-error-message"),
  };

  const successBox = document.getElementById("contact-success");

  const showError = (field, msg) => {
    errors[field].textContent = msg;
    fields[field].setAttribute("aria-invalid", "true");
  };

  const clearErrors = () => {
    Object.values(errors).forEach((element) => (element.textContent = ""));
    Object.values(fields).forEach((element) =>
      element.removeAttribute("aria-invalid")
    );
    successBox.hidden = true;
    successBox.classList.remove("fade-in");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;
    const { name, email, subject, message } = fields;

    if (!name.value.trim()) {
      showError("name", "Full name is required.");
      valid = false;
    }

    if (!email.value.trim()) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError("email", "Enter a valid email address.");
      valid = false;
    }

    if (!subject.value.trim()) {
      showError("subject", "Subject is required.");
      valid = false;
    }

    const msg = message.value.trim();
    if (!msg) {
      showError("message", "Message is required.");
      valid = false;
    } else if (msg.length < 10) {
      showError("message", "Message must be at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    // Success
    successBox.hidden = false;
    successBox.textContent = "Thank you — your message was sent successfully.";
    successBox.classList.add("fade-in");
    form.reset();
    successBox.focus?.();
  });

  // Clear individual error as user types
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => {
      if (fields[key].value.trim()) {
        errors[key].textContent = "";
        fields[key].removeAttribute("aria-invalid");
      }
    });
  });
});

const themeToggle = document.getElementById("theme-toggle");

//  THEME TOGGLE
const userPref = localStorage.getItem("theme");
if (userPref === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !isExpanded);
  navMenu.classList.toggle("show");
});

// Keyboard support (Enter / Space)
navToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    navToggle.click();
  }
});
