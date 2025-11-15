document.addEventListener('DOMContentLoaded', function () {
  // -- Dynamic testimonials data and renderer -------------------------------------------------
  const reviews = [
    {
      author: "Gaudi Louie",
      rating: 5,
      text: "Excellent service! They quickly fixed my leaking sink after I called them. They arrived promptly, offered a fair price, and provided excellent customer service. I highly recommend them for any plumbing needs!",
      date: "2024-06-11"
    },
    {
      author: "SAHIB DIGOH",
      rating: 5,
      text: "Excellent work if anyone want any work done related to plumbing please contact a class plumbing ltd they can fix any problem regarding to plumbing!",
      date: "2025-03-28"
    },
    {
      author: "Virpal Sandhu",
      rating: 5,
      text: "I recently contacted A class plumbing for a leak repair, and I was very impressed with their service. The technician arrived on time, was professional, and quickly diagnosed the issue...",
      date: "2024-11-09"
    },
    {
      author: "Shamsher Waraich",
      rating: 5,
      text: "I really Appreciate with A class plumbing ltd …very experienced ,,they did all work according to city codes requirements and building plan..Thanks all team",
      date: "2025-01-15"
    },
    {
      author: "Safina Ehsan",
      rating: 5,
      text: "I'm 100% satisfied from their work ,they're doing excellent job in Calgary, highly recommend",
      date: "2025-05-02"
    }
  ];

  function renderReviewsToSlider(reviewsList) {
    // Try to find the slider mask used on the homepage; fallback to an element with id 'testimonialsList'
    const mask = document.querySelector('.testimonial-slider .w-slider-mask') || document.getElementById('testimonialsList');
    if (!mask) return;

    mask.innerHTML = ''; // clear any static slides

    const maxSlides = 4; // keep homepage concise like original design
    const list = reviewsList.slice(0, maxSlides);
    const total = list.length;

    list.forEach((r, i) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide-wrapper w-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `${i + 1} of ${total}`);
      if (i > 0) slide.setAttribute('aria-hidden', 'true');
      slide.style.transform = 'translateX(0px)';
      slide.style.opacity = '1';

      const inner = document.createElement('div');
      inner.className = 'testimonial-box-3 white-card';

      // Review text
      const p = document.createElement('p');
      p.className = 'body-text m';
      p.innerHTML = r.text.replace(/\n/g, '<br/>');

      // Avatar / meta area
      const avatarWrapper = document.createElement('div');
      avatarWrapper.className = 'avatar-wrapper horizontal';

      const avatarLabel = document.createElement('div');
      avatarLabel.className = 'avatar-label-text-2';

      const nameWrap = document.createElement('div');
      nameWrap.className = 'body-text-2 m bold c-t-neutral-100';
      nameWrap.innerHTML = `<strong class="body-text m bold">${r.author}</strong>`;

      const source = document.createElement('div');
      source.className = 'body-text s';
      source.textContent = 'Google Review';

      avatarLabel.appendChild(nameWrap);
      avatarLabel.appendChild(source);
      avatarWrapper.appendChild(avatarLabel);

      // rating and date row (below text)
      const metaRow = document.createElement('div');
      metaRow.style.marginTop = '8px';
      metaRow.style.display = 'flex';
      metaRow.style.alignItems = 'center';
      metaRow.style.gap = '12px';

      const stars = document.createElement('div');
      stars.className = 'testimonial-rating';
      stars.setAttribute('aria-hidden', 'true');
      const filled = '★'.repeat(Math.max(0, Math.min(5, r.rating || 0)));
      const empty = '☆'.repeat(5 - Math.max(0, Math.min(5, r.rating || 0)));
      stars.textContent = filled + empty;
      stars.style.color = '#f9a01b';

      const dateEl = document.createElement('div');
      dateEl.className = 'testimonial-date';
      dateEl.style.fontSize = '12px';
      dateEl.style.color = '#888';
      try {
        const d = new Date(r.date);
        dateEl.textContent = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      } catch (e) {
        dateEl.textContent = r.date || '';
      }

      metaRow.appendChild(stars);
      metaRow.appendChild(dateEl);

      inner.appendChild(p);
      inner.appendChild(metaRow);
      inner.appendChild(avatarWrapper);
      slide.appendChild(inner);
      mask.appendChild(slide);
    });
  }

  // Render dynamic reviews into the slider before the slider code runs
  renderReviewsToSlider(reviews);
  // -----------------------------------------------------------------------------------------
  let slideIndex = 0;
  const slides = document.querySelectorAll('.testimonial-slide-wrapper');
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
  document.querySelector('.testimonial-slider-left').addEventListener('click', slideLeft);
  document.querySelector('.testimonial-slider-right').addEventListener('click', slideRight);

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

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });

  const dropdownToggles = document.querySelectorAll('.dropdown > a ');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      // e.preventDefault(); // Prevent default anchor behavior if necessary

      // Close other open dropdowns
      closeOtherDropdowns();

      const dropdownMenu = this.nextElementSibling; // Get the dropdown menu
      dropdownMenu.classList.toggle('dropdown'); // Toggle the 'dropdown' class to show/hide
    });
  });

  // Function to close other dropdowns
  function closeOtherDropdowns() {
    dropdownToggles.forEach((toggle) => {
      const dropdownMenu = toggle.nextElementSibling;
      if (dropdownMenu !== null && dropdownMenu.classList.contains('dropdown')) {
        dropdownMenu.classList.remove('dropdown');
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    // Close dropdowns if click is outside any dropdown
    if (!e.target.closest('.dropdown')) {
      closeOtherDropdowns();
    }

    // Check if the clicked element is a link inside a dropdown
    if (e.target.closest('.dropdown-item > a')) {
      e.preventDefault(); // Prevent the default link behavior
      let href = e.target.closest('.dropdown-item > a').getAttribute('href');
      if (href) {
        window.open(href, '_blank'); // Open link in a new tab
      }
    }
  });

  function closeOtherDropdowns() {
    // Implement your logic to close other dropdowns here
    // For example:
    let openDropdowns = document.querySelectorAll('.dropdown.show');
    openDropdowns.forEach(function (dropdown) {
      dropdown.classList.remove('show');
    });
  }
});

function submitForm(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName')?.value || '';
  const lastName = document.getElementById('lastName')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const address = document.getElementById('address')?.value || '';
  const message = document.getElementById('message')?.value || '';
  const startDate = document.getElementById('startDate')?.value || '';
  const startTime = document.querySelector('input[name="startTime"]:checked')?.value || '';

  if (!firstName || !phone) {
    alert('Please fill out all required fields before submitting.');
    return;
  }

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
  const emailkey = document.getElementById('emailkey').innerHTML;
  const key = atob(emailkey);
  const data = {
    sender: {
      name: 'A Class Plumbing',
      email: 'info@aclassplumbing.ca',
    },
    to: [
      {
        email: 'harpalkhara123@gmail.com',
        name: 'Harpal Khara',
      },
    ],
    subject: 'New Contact Request',
    htmlContent: html,
  };

  fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': key,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log('Email sent:', result);
      if (result.messageId) {
        window.location.href = 'success-contact.html';
      } else {
        window.location.href = 'fail.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      window.location.href = 'fail.html';
    });
}
