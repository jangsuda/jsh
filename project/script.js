const ROOT = document.documentElement;

document.oncontextmenu = function () {
  return false;
};

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

filterSelection("all");
function filterSelection(c) {
  const links = document.querySelectorAll(
    ".container a"
  );

  links.forEach((link) => {
    const filterDiv =
      link.querySelector(".filterDiv");
    if (!filterDiv) return;

    const filterClasses =
      filterDiv.className.split(" ");

    if (
      c === "all" ||
      filterClasses.includes(c)
    ) {
      w3AddClass(link, "show");
    } else {
      w3RemoveClass(link, "show");
    }
  });
}

function updateMargins() {
  const container =
    document.querySelector(".container");
  const links = Array.from(
    container.querySelectorAll("a")
  );

  const visibleLinks = links.filter((a) =>
    a.querySelector(".filterDiv.show")
  );

  visibleLinks.forEach((el, index) => {
    el.style.marginRight = $span - 1;

    if (
      (index + 1) % 3 === 0 ||
      index === visibleLinks.length - 1
    ) {
      el.style.marginRight = "0";
    }
  });
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById(
  "BtnContainer"
);
var btns =
  btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current =
      document.getElementsByClassName("active");
    current[0].className =
      current[0].className.replace(" active", "");
    this.className += " active";
  });
}

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
