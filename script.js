const totalElement = document.getElementById("total");
let currentTotal = 0;
let history = [];

function updateTotal(value) {
  currentTotal += value;
  history.push(currentTotal);
  totalElement.textContent = currentTotal;
}

function undoLastAction() {
  if (history.length > 0) {
    history.pop();
    currentTotal = history.length > 0 ? history[history.length - 1] : 0;
    totalElement.textContent = currentTotal;
  }
}

function resetTotal() {
  currentTotal = 0;
  history = [];
  totalElement.textContent = currentTotal;
}

function toggleDarkMode() {
  const html = document.documentElement;
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");

  const isDark = html.classList.toggle("dark-mode");
  body.classList.toggle("dark-mode", isDark);

  // Update emoji
  toggleBtn.textContent = isDark ? "🌞" : "🌙";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("keydown", function (event) {
  // Ctrl + Z to undo
  if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    undoLastAction();
  }

  // R to reset (without Ctrl or Cmd)
  if (event.key === "r" && !(event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    resetTotal();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  // Decide initial theme
  let useDark = false;

  if (savedTheme === "dark") {
    useDark = true;
  } else if (savedTheme === "light") {
    useDark = false;
  } else {
    // No saved theme — use system preference
    useDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.documentElement.classList.toggle("dark-mode", useDark);
  document.body.classList.toggle("dark-mode", useDark);
  toggleBtn.textContent = useDark ? "🌞" : "🌙";
});
