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

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const subject = document.getElementById("subject").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const html = `
            <h4>Contact - A Class Plumbing.</h4>
            <p><b>Name: </b> ${name}</p>
            <p><b>Subject: </b> ${subject}</p>
            <p><b>Email: </b> ${email}</p>
            <p><b>Message: </b> ${message}</p>
            <br>
        `;

      const data = {
        sender: {
          name: "Name",
          email: "info@domain.ca",
        },
        to: [
          {
            email: "to@domain.ca",
            name: "A Class Plumbing Admin",
          },
        ],
        subject: "New Contact Request",
        htmlContent: html,
      };

      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "api-key": "api-key",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          // Assuming you have an endpoint to handle database insertion
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "insert-contact.php", true);
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              console.log("Contact saved to database.");
              window.location.href = "success-contact.html";
            } else if (xhr.readyState === 4) {
              window.location.href = "fail.html";
            }
          };
          xhr.send(
            `name=${name}&subject=${subject}&email=${email}&message=${message}`
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          window.location.href = "fail.html";
        });
    });

  // Initialize slider
  showSlides();
});
