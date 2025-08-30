const $bigBall = document.querySelector(
  ".cursor__ball--big"
);
const $smallBall = document.querySelector(
  ".cursor__ball--small"
);
const $hoverables =
  document.querySelectorAll(".hoverable");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const body = document.body;
    const hero = document.getElementById("hero");
    const THEMES = ["light", "dark", "red"];

    function applyTheme(mode) {
      THEMES.forEach((t) =>
        body.classList.remove(`theme-${t}`)
      );
      body.classList.add(`theme-${mode}`);

      if (hero) {
        hero.src = `/img/hero-${mode}.png`;
      }

      localStorage.setItem("theme", mode);
    }

    const savedTheme =
      localStorage.getItem("theme");
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
  }
);
