document.addEventListener('DOMContentLoaded', () => {
  // Toggle Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });

  // Big Banner Slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  let currentBannerSlide = 0;
  const showBannerSlide = (index) => {
    bannerSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };
  setInterval(() => {
    currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
    showBannerSlide(currentBannerSlide);
  }, 3000);
  showBannerSlide(currentBannerSlide);

  // Small Banner Slider
  const smallBannerSlides = document.querySelectorAll('.small-banner-slide');
  let currentSmallBannerSlide = 0;
  const showSmallBannerSlide = (index) => {
    smallBannerSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };
  setInterval(() => {
    currentSmallBannerSlide = (currentSmallBannerSlide + 1) % smallBannerSlides.length;
    showSmallBannerSlide(currentSmallBannerSlide);
  }, 3000);
  showSmallBannerSlide(currentSmallBannerSlide);

  // Form Submission
  const form = document.querySelector('#contactForm');
  const submitButton = document.querySelector('#submitButton');
  submitButton.addEventListener('click', () => {
    if (form.checkValidity()) {
      const name = document.querySelector('#name').value;
      const address = document.querySelector('#address').value;
      const mobile = document.querySelector('#mobile').value;
      const email = document.querySelector('#email').value;
      const content = document.querySelector('#content').value;
      const message = `Order Details:\nName: ${name}\nAddress: ${address}\nMobile: ${mobile}\nEmail: ${email}\nContent: ${content}`;
      const whatsappUrl = `https://wa.me/9887359001?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      form.reportValidity();
    }
  });
});

function handleBuyNow(plan, price) {
  const message = `I want to purchase the ${plan} for ₹${price}. Please provide payment details.`;
  const whatsappUrl = `https://wa.me/9887359001?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

function closeQRPopup() {
  document.querySelector('#qrPopup').style.display = 'none';
}
