document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".bar__toggle");
  var panel = document.getElementById("menu-panel");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", function () {
    var open = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
