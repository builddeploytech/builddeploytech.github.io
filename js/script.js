/* =====================================================
   BuildDeploy Tech – Main JS (FINAL CLEAN & OPTIMIZED VERSION)
   Compatible with your new Premium Light CSS
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderAndFooter();
  initScrollAnimations();
  initMobileMenu();
  initFloatingWhatsApp();
  initHeaderScrollEffect();
  initTracking();
});

/* ===============================
   LOAD HEADER & FOOTER
================================ */
function loadHeaderAndFooter() {
  const headerEl = document.getElementById("header-placeholder");
  const footerEl = document.getElementById("footer-placeholder");

  if (headerEl) {
    fetch("/includes/header.html")
      .then(res => res.text())
      .then(data => { headerEl.innerHTML = data; })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footerEl) {
    fetch("/includes/footer.html")
      .then(res => res.text())
      .then(data => { footerEl.innerHTML = data; })
      .catch(err => console.error("Error loading footer:", err));
  }
}

/* ===============================
   SCROLL ANIMATIONS (Fade Up)
================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-fade-up");
  
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Performance optimization
      }
    });
  }, { 
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach(el => observer.observe(el));
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

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu && navMenu.classList.contains("open")) {
      if (!navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove("open");
      }
    }
  });

  // Optional: Close menu when clicking any nav link (good UX)
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

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

/* ===============================
   FLOATING WHATSAPP BUTTON
================================ */
function initFloatingWhatsApp() {
  // Agar already exist karta hai toh skip
  if (document.querySelector(".floating-whatsapp")) return;

  const waBtn = document.createElement("a");
  waBtn.href = "https://wa.me/916392930918?text=Hi%20BuildDeploy%20Tech,%20I%20want%20to%20discuss%20my%20project!";
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

    // WhatsApp Click Tracking
    if (link.href.includes("wa.me")) {
      if (typeof gtag === "function") {
        gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: "whatsapp_button",
          transport_type: "beacon"
        });
      }
    }

    // Contact / Quote Click Tracking
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
   OPTIONAL: Dropdown Click Support for Mobile
   (Agar future mein chahiye toh use kar sakte ho)
================================ */
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle("mobile-open");
  }
}

// Keyboard accessibility (Escape key to close mobile menu)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) navMenu.classList.remove("open");
  }
});
