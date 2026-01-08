/**
 * BuildDeploy Tech – Global Site Script
 * Handles:
 * - Mobile menu
 * - Dark mode (persistent)
 * - Active navigation
 * - Smooth scrolling
 * - Works with dynamic header/footer (no hacks)
 */

function initSiteFeatures() {
  /* ===============================
     Mobile Menu Toggle
  =============================== */
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenu.textContent = navLinks.classList.contains("active")
        ? "✕"
        : "☰";
    });
  }

  /* ===============================
     Dark Mode Toggle (Persistent)
  =============================== */
  const darkToggle = document.getElementById("dark-toggle");

  const applyDarkMode = (enabled) => {
    document.body.classList.toggle("dark-mode", enabled);
    if (darkToggle) {
      darkToggle.textContent = enabled ? "☀️" : "🌙";
    }
  };

  // Load saved preference
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  applyDarkMode(savedDarkMode);

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark-mode");
      applyDarkMode(isDark);
      localStorage.setItem("darkMode", isDark);
    });
  }

  /* ===============================
     Active Navigation Highlight
  =============================== */
  const currentPath = window.location.pathname
    .replace(/\/$/, "")
    .split("/")
    .pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPath = link
      .getAttribute("href")
      .replace(/\/$/, "")
      .split("/")
      .pop();

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  /* ===============================
     Smooth Scroll (Anchors)
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

/* =====================================
   Init after DOM + dynamic includes
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Observe DOM changes (for header/footer loaded via fetch)
  const observer = new MutationObserver(() => {
    if (
      document.querySelector(".nav-links") &&
      document.querySelector(".mobile-menu")
    ) {
      initSiteFeatures();
      observer.disconnect(); // run once only
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Fallback (in case header is static)
  initSiteFeatures();
});
