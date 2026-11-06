// Travel Explorer: search, mobile navigation and contact form interactions.

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const cards = Array.from(document.querySelectorAll(".destination-card"));
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

function searchDestinations() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const searchableText = (
      card.innerText + " " + card.dataset.category
    ).toLowerCase();

    const matches = query === "" || searchableText.includes(query);
    card.hidden = !matches;

    if (matches) visibleCount++;
  });

  resultCount.textContent = `${visibleCount} destination${visibleCount === 1 ? "" : "s"}`;
  emptyMessage.hidden = visibleCount !== 0;
}

searchButton.addEventListener("click", searchDestinations);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchDestinations();
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  searchDestinations();
  searchInput.focus();
});

// Mobile navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Front-end demonstration form. No email is sent without a backend/email service.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const visitorName = document.getElementById("name").value.trim();
  formMessage.textContent = `Thank you, ${visitorName}! Your message has been received in this demo.`;
  contactForm.reset();
});
