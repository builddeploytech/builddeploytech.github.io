/**
 * BuildDeploy Tech – Premium Global Site Script (2026 Edition)
 * Features:
 *   - Advanced Mobile Menu (slide-in overlay)
 *   - Dark Mode (persistent + system preference + smooth toggle)
 *   - Active Navigation Highlight (works on sub-pages)
 *   - Smooth Scrolling for anchors
 *   - Scroll-based Fade-Up Animations (staggered, performant)
 *   - Scroll-to-Top Button (optional)
 *   - Works perfectly with dynamic header/footer via fetch
 */

function initSiteFeatures() {
  // ======================================
  // Mobile Menu – Slide-in Overlay
  // ======================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenu");

  if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
    // Open menu
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.style.right = "0%";
      document.body.style.overflow = "hidden"; // Prevent scroll behind
      mobileMenuBtn.classList.add("active"); // For hamburger → X animation
    });

    // Close menu
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.style.right = "-100%";
      document.body.style.overflow = "";
      mobileMenuBtn.classList.remove("active");
    });

    // Close on outside click (optional enhancement)
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.style.right = "-100%";
        document.body.style.overflow = "";
        mobileMenuBtn.classList.remove("active");
      }
    });
  }

  // ======================================
  // Dark Mode Toggle (Persistent + System Preference)
  // ======================================
  const darkToggle = document.getElementById("dark-toggle");
  const toggleIcon = darkToggle ? darkToggle.querySelector(".toggle-icon") : null;

  const applyDarkMode = (enabled) => {
    if (enabled) {
      document.documentElement.classList.add("dark-mode"); // Better to use <html> for global vars
      if (toggleIcon) {
        toggleIcon.textContent = "☀️";
        toggleIcon.style.transform = "rotate(180deg)";
      }
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      if (toggleIcon) {
        toggleIcon.textContent = "🌙";
        toggleIcon.style.transform = "rotate(0deg)";
      }
      localStorage.setItem("theme", "light");
    }
  };

  // Load saved or system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    applyDarkMode(true);
  } else {
    applyDarkMode(false);
  }

  // Toggle listener
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark-mode");
      applyDarkMode(!isDark);
    });
  }

  // ======================================
  // Active Navigation Highlight (Improved for sub-pages)
  // ======================================
  const currentPath = window.location.pathname
    .replace(/\/$/, "") // Remove trailing slash
    .split("/")
    .pop() || "index.html";

  document.querySelectorAll(".nav-links a, .nav-link-mobile").forEach((link) => {
    const linkHref = link.getAttribute("href");
    const linkPath = linkHref
      .replace(/\/$/, "")
      .split("/")
      .pop();

    // Exact match or startsWith for sub-pages (e.g. /services/web-development.html highlights /services.html)
    if (linkPath === currentPath || 
        (linkHref.includes("/services/") && currentPath.includes(".html") && currentPath !== "services.html") ||
        (linkHref.includes("/Blogs/") && currentPath.includes(".html") && currentPath !== "index.html")) {
      link.classList.add("active");
    }
  });

  // ======================================
  // Smooth Scrolling for Internal Anchors
  // ======================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      if (targetId) {
        const target = document.getElementById(targetId);
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

  // ======================================
  // Scroll Animations – Fade-Up with Stagger
  // ======================================
  const animatedElements = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || "0"; // Use data-delay="200" etc. in HTML
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("show");
            observer.unobserve(el); // Performance: observe only once
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit earlier
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for very old browsers
    animatedElements.forEach((el) => el.classList.add("show"));
  }

  // ======================================
  // Optional: Scroll-to-Top Button
  // Add this HTML in footer if you want: <button id="scrollToTop" class="fixed bottom-8 right-24 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg opacity-0 transition-opacity">↑</button>
  // ======================================
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.remove("opacity-0");
        scrollToTopBtn.classList.add("opacity-100");
      } else {
        scrollToTopBtn.classList.add("opacity-0");
        scrollToTopBtn.classList.remove("opacity-100");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// ======================================
// Initialize after DOM + Dynamic Includes (header/footer)
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  // MutationObserver to detect when dynamic header/footer loads
  const observer = new MutationObserver(() => {
    if (
      document.querySelector("#mobileMenuBtn") ||
      document.querySelector("#dark-toggle")
    ) {
      initSiteFeatures();
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Immediate call as fallback
  initSiteFeatures();
});

// Re-init on page change (for SPA-like feel, though not SPA)
window.addEventListener("popstate", initSiteFeatures);
