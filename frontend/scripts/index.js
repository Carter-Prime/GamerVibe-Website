"use strict";

const toggleMenu = () => {
  const nav_items = document.querySelectorAll(".nav_links");
  console.log(nav_items);

  nav_items.forEach((link) => {
    link.classList.toggle("nav_link_show");
  });
};
document.querySelector(".toggle_menu_btn").addEventListener("click", toggleMenu);

search_nav_link;
