document.addEventListener('DOMContentLoaded', () => {
  // Toggle Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('show');
    });
  }

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
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('active');
      }
    });
  });

  // Close dropdowns when clicking outside, but exclude home-link
  document.addEventListener('click', (e) => {
    const isHomeLink = e.target.classList.contains('home-link') || e.target.closest('.home-link');
    const isDropdown = e.target.closest('.dropdown');

    if (!isDropdown && !isHomeLink) {
      document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });

  // Ensure Home link works without interference
  const homeLink = document.querySelector('.home-link');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      // Allow default behavior (navigate to index.html)
    });
  }

  // Big Banner Slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  if (bannerSlides.length > 0) {
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
  }

  // Small Banner Slider
  const smallBannerSlides = document.querySelectorAll('.small-banner-slide');
  if (smallBannerSlides.length > 0) {
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
  }

  // Form Submission
  const form = document.querySelector('#contactForm');
  const submitButton = document.querySelector('#submitButton');
  if (submitButton && form) {
    submitButton.addEventListener('click', () => {
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.reportValidity();
        }
      });
      if (isValid) {
        const name = document.querySelector('#name').value;
        const address = document.querySelector('#address').value;
        const mobile = document.querySelector('#mobile').value;
        const email = document.querySelector('#email').value;
        const content = document.querySelector('#content').value;
        const message = `Order Details:\nName: ${name}\nAddress: ${address}\nMobile: ${mobile}\nEmail: ${email}\nContent: ${content}`;
        const whatsappUrl = `https://wa.me/9887359001?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    });
  }

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
  // Detect if the device is mobile or desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile, attempt to open UPI app
    const upiId = "8440048355-2@ybl";
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("AD Quick India")}&am=${price}&cu=INR&tn=${encodeURIComponent("Payment for " + plan)}`;
    
    // Create a temporary link element to trigger UPI app
    const link = document.createElement('a');
    link.href = upiUrl;
    link.click();

    // Fallback in case UPI app doesn't open (after 2 seconds)
    setTimeout(() => {
      alert("Could not open UPI app. Please ensure a UPI app (like Google Pay, PhonePe) is installed, or use the QR code on a desktop device.");
    }, 2000);
  } else {
    // On desktop, show QR code popup
    const qrPopup = document.querySelector('#qrPopup');
    const qrCodeImg = document.querySelector('#qrCodeImg');
    
    if (qrPopup && qrCodeImg) {
      // Set the QR code image
      qrCodeImg.src = "https://ik.imagekit.io/kamalprp/WhatsApp%20Image%202025-06-15%20at%2010.51.28%20PM.jpeg?updatedAt=1750008128436";
      qrPopup.style.display = 'flex';
    }
  }
}

function closeQRPopup() {
  const qrPopup = document.querySelector('#qrPopup');
  if (qrPopup) {
    qrPopup.style.display = 'none';
  }
}
