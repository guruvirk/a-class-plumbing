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

  // document
  //   .getElementById("contactForm")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();

  //     const name = document.getElementById("name").value;
  //     const subject = document.getElementById("subject").value;
  //     const email = document.getElementById("email").value;
  //     const message = document.getElementById("message").value;

  //     const html = `
  //           <h4>Contact - A Class Plumbing.</h4>
  //           <p><b>Name: </b> ${name}</p>
  //           <p><b>Subject: </b> ${subject}</p>
  //           <p><b>Email: </b> ${email}</p>
  //           <p><b>Message: </b> ${message}</p>
  //           <br>
  //       `;

  //     const data = {
  //       sender: {
  //         name: "Name",
  //         email: "info@domain.ca",
  //       },
  //       to: [
  //         {
  //           email: "to@domain.ca",
  //           name: "A Class Plumbing Admin",
  //         },
  //       ],
  //       subject: "New Contact Request",
  //       htmlContent: html,
  //     };

  //     fetch("https://api.brevo.com/v3/smtp/email", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //         "api-key": "api-key",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log("Success:", result);
  //         // Assuming you have an endpoint to handle database insertion
  //         const xhr = new XMLHttpRequest();
  //         xhr.open("POST", "insert-contact.php", true);
  //         xhr.setRequestHeader(
  //           "Content-Type",
  //           "application/x-www-form-urlencoded"
  //         );
  //         xhr.onreadystatechange = function () {
  //           if (xhr.readyState === 4 && xhr.status === 200) {
  //             console.log("Contact saved to database.");
  //             window.location.href = "success-contact.html";
  //           } else if (xhr.readyState === 4) {
  //             window.location.href = "fail.html";
  //           }
  //         };
  //         xhr.send(
  //           `name=${name}&subject=${subject}&email=${email}&message=${message}`
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         window.location.href = "fail.html";
  //       });
  //   });

  // Initialize slider
  showSlides();
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  const dropdownToggles = document.querySelectorAll(".dropdown > a ");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      // e.preventDefault(); // Prevent default anchor behavior if necessary

      // Close other open dropdowns
      closeOtherDropdowns();

      const dropdownMenu = this.nextElementSibling; // Get the dropdown menu
      dropdownMenu.classList.toggle("dropdown"); // Toggle the 'dropdown' class to show/hide
    });
  });

  // Function to close other dropdowns
  function closeOtherDropdowns() {
    dropdownToggles.forEach((toggle) => {
      const dropdownMenu = toggle.nextElementSibling;
      if (
        dropdownMenu !== null &&
        dropdownMenu.classList.contains("dropdown")
      ) {
        dropdownMenu.classList.remove("dropdown");
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    // Close dropdowns if click is outside any dropdown
    if (!e.target.closest(".dropdown")) {
      closeOtherDropdowns();
    }

    // Check if the clicked element is a link inside a dropdown
    if (e.target.closest(".dropdown-item > a")) {
      e.preventDefault(); // Prevent the default link behavior
      let href = e.target.closest(".dropdown-item > a").getAttribute("href");
      if (href) {
        window.open(href, "_blank"); // Open link in a new tab
      }
    }
  });

  function closeOtherDropdowns() {
    // Implement your logic to close other dropdowns here
    // For example:
    let openDropdowns = document.querySelectorAll(".dropdown.show");
    openDropdowns.forEach(function (dropdown) {
      dropdown.classList.remove("show");
    });
  }
});

function submitForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName")?.value || '';
  const lastName = document.getElementById("lastName")?.value || '';
  const email = document.getElementById("email")?.value || '';
  const phone = document.getElementById("phone")?.value || '';
  const address = document.getElementById("address")?.value || '';
  const message = document.getElementById("message")?.value || '';
  const startDate = document.getElementById("startDate")?.value || '';
  const startTime = document.querySelector(
    'input[name="startTime"]:checked'
  )?.value || '';

  const html = `
      <h4>Contact - A Class Plumbing.</h4>
      <p><b>Name: </b> ${firstName} ${lastName}</p>
      <p><b>Email: </b> ${email}</p>
      <p><b>Phone: </b> ${phone}</p>
      <p><b>Address of Service: </b> ${address}</p>
      <p><b>Tell Us All About It: </b> ${message}</p>
      <p><b>Desired Start Date: </b> ${startDate}</p>
      <p><b>Time to Start: </b> ${startTime}</p>
      <br>
  `;
  const emailkey = document.getElementById("emailkey").innerHTML;
  const key = atob(emailkey);
  const data = {
    sender: {
      name: "A Class Plumbing",
      email: "aclassplumbing99@gmail.com",
    },
    to: [
      {
        email: "harpalkhara123@gmail.com",
        name: "Harpal Khara",
      },
    ],
    subject: "New Contact Request",
    htmlContent: html,
  };

  fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": key,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Email sent:", result);
      if (result.messageId) {
        window.location.href = "success-contact.html";
      } else {
        window.location.href = "fail.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.href = "fail.html";
    });
}