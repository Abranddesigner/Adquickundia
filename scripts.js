document.addEventListener('DOMContentLoaded', () => {
  // Toggle Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });

  // Dropdown Menu Toggle
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = toggle.parentElement;
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      
      // Close other open dropdowns
      document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('active');
        }
      });

      // Toggle current dropdown
      dropdownMenu.classList.toggle('active');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown') && !e.target.classList.contains('home-link')) {
      document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        menu.classList.remove('active');
      });
    }
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

  // Text Animation on Scroll
  const animatedElements = document.querySelectorAll('.animated-text');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hide');
      } else {
        entry.target.classList.add('hide');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    observer.observe(element);
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
