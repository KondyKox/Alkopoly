document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".close-button");

  // Toggle menu
  const toggleMenu = () => {
    sideMenu.classList.toggle("open");
  };

  menuToggle.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
});
