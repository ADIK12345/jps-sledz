const images = Array.from(document.querySelectorAll(".swiper-wrapper img"));
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let focusTrap;
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  modalImg.src = images[index].src;
  modal.classList.add("open");
  modal.removeAttribute("inert");
  modal.setAttribute("aria-hidden", "false");
  focusTrap = trapFocus(modal);

  document.body.style.overflow = "hidden";
}

function closeModal() {
  closeBtn.blur();
  focusTrap();
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("inert", "");
  document.body.style.overflow = "";
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex].src;
}

images.forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));

  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // zapobiega przewijaniu przy spacji
      // e.stopPropagation(); // blokuje Swipera przed reakcją
      openModal(i);
    }
  });
});

closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Kliknięcie w tło zamyka modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Klawiatura
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});
