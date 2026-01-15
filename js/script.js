/* =====================================================
   BuildDeploy Tech – Main JS
   Handles:
   - Header/Footer include
   - Scroll animations
   - Dark mode
   - Floating WhatsApp
   ===================================================== */

/* ===============================
   LOAD HEADER & FOOTER
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-placeholder", "/includes/header.html");
  loadHTML("footer-placeholder", "/includes/footer.html");

  initScrollAnimations();
  initDarkMode();
  initFloatingWhatsApp();
});

function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  fetch(file)
    .then(res => res.text())
    .then(data => el.innerHTML = data)
    .catch(err => console.error("Error loading", file, err));
}

/* ===============================
   SCROLL ANIMATIONS
================================ */
function initScrollAnimations() {
  const animated = document.querySelectorAll(".animate-fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animated.forEach(el => observer.observe(el));
}

/* ===============================
   DARK MODE
================================ */
function initDarkMode() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  document.addEventListener("click", e => {
    if (e.target.closest(".dark-toggle")) {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    }
  });
}

/* ===============================
   FLOATING WHATSAPP
================================ */
function initFloatingWhatsApp() {
  const btn = document.createElement("a");
  btn.href =
    "https://wa.me/919695842280?text=Hi%20BuildDeploy%20Tech,%20I%20want%20to%20discuss%20my%20project!";
  btn.target = "_blank";
  btn.className = "floating-whatsapp";
  btn.innerHTML = "💬";

  document.body.appendChild(btn);
}
/* ===============================
   WHATSAPP CLICK TRACKING (GA4)
================================ */
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");

  if (!link) return;

  if (link.href && link.href.includes("wa.me")) {
    if (typeof gtag === "function") {
      gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: link.href,
        transport_type: "beacon"
      });
    }
  }
});

