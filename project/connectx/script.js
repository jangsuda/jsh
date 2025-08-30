const body = document.body;
const THEMES = ["light", "dark", "red"];

function applyTheme(mode) {
  THEMES.forEach((t) =>
    body.classList.remove(`theme-${t}`)
  );
  body.classList.add(`theme-${mode}`);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const systemTheme = prefersDark
    ? "dark"
    : "light";
  applyTheme(systemTheme);
}
