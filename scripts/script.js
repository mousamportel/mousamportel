let cursor = document.querySelector(".cursor");
let smallCursor = document.querySelector(".small-cursor");
let scrollToTop = document.querySelector(".scroll-to-top");
document.onmousemove = (e) => {
  let x = e.clientX + "px";
  let y = e.clientY + "px";
  cursor.animate(
    {
      top: y,
      left: x,
    },
    { fill: "forwards", duration: 100 }
  );
  smallCursor.animate(
    {
      top: y,
      left: x,
    },
    { fill: "forwards", duration: 500 }
  );
};

window.onscroll = () => {
  if (window.scrollY > 250) {
    scrollToTop.style.display = "grid";
  } else {
    scrollToTop.style.display = "none";
  }
  const nav = document.querySelector(".nav-links-items");
  if (nav.classList.contains("nav-links-item-shown")) {
    nav.classList.remove("nav-links-item-shown");
  }
};
scrollToTop.onclick = () => {
  window.scrollTo({
    top: 0,
    scrollBehavior: "smooth",
  });
};
function toggleNav() {
  const nav = document.querySelector(".nav-links-items");
  nav.classList.toggle("nav-links-item-shown");
}

let loader = document.querySelector(".loader-screen");
window.onload = () => {
  loader.remove();
};
