/* ---------- THEME ---------- */
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (
  saved === "dark" ||
  (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  root.setAttribute("data-theme", "dark");
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  isDark
    ? root.removeAttribute("data-theme")
    : root.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

/* ---------- MOBILE MENU ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);

/* ---------- SCROLL REVEAL ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- CONTACT FORM (mailto) ---------- */
const CONTACT_EMAIL = "you@example.com"; // <-- change this
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

/* ---------- YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
