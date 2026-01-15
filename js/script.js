/* =====================================================
   BuildDeploy Tech – Main JS (CLEAN VERSION)
   Handles:
   - Header/Footer include
   - Scroll animations
   - Floating WhatsApp
   - GA4 Tracking (WhatsApp + Contact)
   ===================================================== */

/* ===============================
   LOAD HEADER & FOOTER
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-placeholder", "/includes/header.html");
  loadHTML("footer-placeholder", "/includes/footer.html");

  initScrollAnimations();
  initFloatingWhatsApp();
});

function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  fetch(file)
    .then(res => res.text())
    .then(data => {
      el.innerHTML = data;
    })
    .catch(err => console.error("Error loading", file, err));
}

/* ===============================
   SCROLL ANIMATIONS
================================ */
function initScrollAnimations() {
  const animated = document.querySelectorAll(".animate-fade-up");

  if (!animated.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animated.forEach(el => observer.observe(el));
}

/* ===============================
   FLOATING WHATSAPP
================================ */
function initFloatingWhatsApp() {
  if (document.querySelector(".floating-whatsapp")) return;

  const btn = document.createElement("a");
  btn.href =
    "https://wa.me/919695842280?text=Hi%20BuildDeploy%20Tech,%20I%20want%20to%20discuss%20my%20project!";
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.className = "floating-whatsapp";
  btn.setAttribute("aria-label", "Chat on WhatsApp");
  btn.innerHTML = "💬";

  document.body.appendChild(btn);
}

/* ===============================
   WHATSAPP CLICK TRACKING (GA4)
================================ */
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link || !link.href) return;

  if (link.href.includes("wa.me")) {
    if (typeof gtag === "function") {
      gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: link.href,
        transport_type: "beacon"
      });
    }
  }
});

/* ===============================
   CONTACT CTA TRACKING (GA4)
================================ */
document.addEventListener("click", function (e) {
  const el = e.target.closest("a, button");
  if (!el) return;

  const text = (el.innerText || "").toLowerCase();
  const href = el.getAttribute("href") || "";

  // Email click
  if (href.startsWith("mailto:")) {
    if (typeof gtag === "function") {
      gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: "email_click",
        transport_type: "beacon"
      });
    }
    return;
  }

  // Contact CTA
  if (
    href.includes("contact.html") ||
    text.includes("contact") ||
    text.includes("get in touch") ||
    text.includes("free consultation")
  ) {
    if (typeof gtag === "function") {
      gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: href || text,
        transport_type: "beacon"
      });
    }
  }
});
