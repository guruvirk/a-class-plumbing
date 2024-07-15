document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".testimonial-slide-wrapper");
  const totalSlides = slides.length;

  function showSlides() {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
  }

  function slideLeft() {
    if (slideIndex === 0) {
      slideIndex = totalSlides - 1;
    } else {
      slideIndex--;
    }
    showSlides();
  }

  function slideRight() {
    if (slideIndex === totalSlides - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    showSlides();
  }

  // Attach event listeners to arrow elements
  document
    .querySelector(".testimonial-slider-left")
    .addEventListener("click", slideLeft);
  document
    .querySelector(".testimonial-slider-right")
    .addEventListener("click", slideRight);

  // Initialize slider
  showSlides();
});
