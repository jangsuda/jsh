// <disable drag>
var omitformtags = [
  "input",
  "textarea",
  "select",
];
omitformtags = omitformtags.join("|");

function disableselect(e) {
  if (
    omitformtags.indexOf(
      e.target.tagName.toLowerCase()
    ) == -1
  )
    return false;
}

function reEnable() {
  return true;
}

if (typeof document.onselectstart != "undefined")
  document.onselectstart = new Function(
    "return false"
  );
else {
  document.onmousedown = disableselect;
  document.onmouseup = reEnable;
}
// </disable drag>

const body = document.body;
const THEMES = ["light", "dark", "red"];

function applyTheme(mode) {
  THEMES.forEach((t) =>
    body.classList.remove(`theme-${t}`)
  );
  body.classList.add(`theme-${mode}`);

  localStorage.setItem("theme", mode);
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

document
  .getElementById("lightMode")
  ?.addEventListener("click", () =>
    applyTheme("light")
  );
document
  .getElementById("darkMode")
  ?.addEventListener("click", () =>
    applyTheme("dark")
  );
document
  .getElementById("redMode")
  ?.addEventListener("click", () =>
    applyTheme("red")
  );
