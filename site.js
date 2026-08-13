/* Theme toggle + scroll reveal — shared across pages. */
(function () {
    "use strict";

    var root = document.documentElement;
    var toggle = document.getElementById("themeToggle");

    if (toggle) {
        toggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
        });
    }

    var items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        Array.prototype.forEach.call(items, function (el) { el.classList.add("is-visible"); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    Array.prototype.forEach.call(items, function (el, i) {
        el.style.transitionDelay = Math.min(i, 4) * 60 + "ms";
        observer.observe(el);
    });
})();
