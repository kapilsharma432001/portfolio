"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

