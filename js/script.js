/* =====================================================
   BuildDeploy Tech – Main JS (FINAL CLEAN & OPTIMIZED VERSION)
   ===================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderAndFooter();

  initScrollAnimations();
  initMobileMenu();
  initFloatingWhatsApp();
  initHeaderScrollEffect();
  initTracking();
});

/* ===============================
   LOAD HEADER & FOOTER
================================ */
async function loadHeaderAndFooter() {
  const headerEl = document.getElementById("header-placeholder");
  const footerEl = document.getElementById("footer-placeholder");

  try {
    if (headerEl) {
      const headerRes = await fetch("/includes/header.html");
      headerEl.innerHTML = await headerRes.text();
    }

    if (footerEl) {
      const footerRes = await fetch("/includes/footer.html");
      footerEl.innerHTML = await footerRes.text();
    }
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}

/* ===============================
   SCROLL ANIMATIONS (FIXED + SAFE)
================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-fade-up");

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach(el => observer.observe(el));

  // 🔥 FALLBACK FIX
  setTimeout(() => {
    animatedElements.forEach(el => {
      if (!el.classList.contains("visible")) {
        el.classList.add("visible");
      }
    });
  }, 800);
}

/* ===============================
   MOBILE MENU TOGGLE + DROPDOWN SUPPORT
================================ */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("open");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu && navMenu.classList.contains("open")) {
      if (!navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove("open");
      }
    }
  });

  // Close menu on link click
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
}

/* ===============================
   HEADER SCROLL EFFECT
================================ */
function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ===============================
   FLOATING WHATSAPP BUTTON
================================ */
function initFloatingWhatsApp() {
  if (document.querySelector(".floating-whatsapp")) return;

  const waBtn = document.createElement("a");

  waBtn.href =
    "https://wa.me/916392930918?text=Hi%20BuildDeploy%20Tech,%20I%20want%20to%20discuss%20my%20project!";

  waBtn.target = "_blank";
  waBtn.rel = "noopener noreferrer";
  waBtn.className = "floating-whatsapp";
  waBtn.setAttribute("aria-label", "Chat on WhatsApp");

  waBtn.innerHTML = `<i class="fab fa-whatsapp"></i>`;

  document.body.appendChild(waBtn);
}

/* ===============================
   GA4 EVENT TRACKING
================================ */
function initTracking() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link || !link.href) return;

    // WhatsApp Tracking
    if (link.href.includes("wa.me")) {
      if (typeof gtag === "function") {
        gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: "whatsapp_button",
          transport_type: "beacon"
        });
      }
    }

    // Contact / Quote Tracking
    const text = (link.innerText || "").toLowerCase().trim();
    const href = link.getAttribute("href") || "";

    if (
      href.includes("contact.html") ||
      text.includes("contact") ||
      text.includes("quote") ||
      text.includes("consultation") ||
      text.includes("get started")
    ) {
      if (typeof gtag === "function") {
        gtag("event", "contact_click", {
          event_category: "conversion",
          event_label: href || text,
          transport_type: "beacon"
        });
      }
    }
  });
}

/* ===============================
   DROPDOWN SUPPORT
================================ */
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);

  if (dropdown) {
    dropdown.classList.toggle("mobile-open");
  }
}

/* ===============================
   ESC KEY SUPPORT
================================ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");

    if (navMenu) {
      navMenu.classList.remove("open");
    }
  }
});
