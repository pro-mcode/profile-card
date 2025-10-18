const timeEl = document.querySelector('[data-testid="test-user-time"]');
const themeToggle = document.getElementById("theme-toggle");

function updateTime() {
  timeEl.textContent = Date.now();
}

updateTime(); // show current time
setInterval(updateTime, 1000); // update every second

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
