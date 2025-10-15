const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  spaceBetween: 20,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  a11y: {
    enabled: true,
    prevSlideMessage: "Poprzedni slajd",
    nextSlideMessage: "Następny slajd",
    firstSlideMessage: "To jest pierwszy slajd",
    lastSlideMessage: "To jest ostatni slajd",
    paginationBulletMessage: "Przejdź do slajdu {{index}}",
  },
  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
