
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  let cartCount = 0;
  const menuItems = document.querySelectorAll('.menu-item');
  const contactForm = document.getElementById('contactForm');
  const viewFullMenuBtn = document.getElementById('viewFullMenu');
  
  // Create scroll to top button
  createScrollToTopButton();
  
  // Handle navigation links smooth scrolling
  setupSmoothScrolling();
  
  // Initialize animations
  initAnimations();
  
  // Add event listeners to menu items
  menuItems.forEach(item => {
      const addToCartBtn = item.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', function() {
          addToCart(item.querySelector('h4').textContent);
      });
  });
  
  // Handle contact form submission
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          submitContactForm();
      });
  }
  
  // Handle "View Full Menu" button click
  if (viewFullMenuBtn) {
      viewFullMenuBtn.addEventListener('click', function(e) {
          e.preventDefault();
          openFullMenu();
      });
  }
  
  // Make navbar sticky on scroll
  makeStickyNavbar();
});

/**
* Function to create and handle the scroll-to-top button
*/
function createScrollToTopButton() {
  // Create button element
  const scrollToTopBtn = document.createElement('div');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollToTopBtn);
  
  // Show button when page is scrolled down
  window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          scrollToTopBtn.classList.add('active');
      } else {
          scrollToTopBtn.classList.remove('active');
      }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

/**
* Function to set up smooth scrolling for navigation links
*/
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          // Only apply to links that point to an ID
          const href = this.getAttribute('href');
          if (href.startsWith('#') && href !== '#') {
              e.preventDefault();
              
              const targetId = href.substring(1);
              const targetElement = document.getElementById(targetId);
              
              if (targetElement) {
                  // Calculate position accounting for navbar height
                  const navbarHeight = document.querySelector('.navbar').offsetHeight;
                  const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navbarHeight;
                  
                  // Scroll to the target element
                  window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                  });
                  
                  // Close mobile menu if open
                  const navbarCollapse = document.querySelector('.navbar-collapse');
                  if (navbarCollapse.classList.contains('show')) {
                      document.querySelector('.navbar-toggler').click();
                  }
              }
          }
      });
  });
}

/**
* Function to initialize animations
*/
function initAnimations() {
  // Add animation to elements when they come into view
  const animatedElements = document.querySelectorAll('.feature-box, .menu-item, .testimonial, .location-card');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.2
  });
  
  animatedElements.forEach(element => {
      observer.observe(element);
  });
}

/**
* Function to add items to cart
* @param {string} itemName - The name of the item being added to cart
*/
function addToCart(itemName) {
  cartCount++;
  updateCartBadge();
  showNotification(`${itemName} added to cart!`);
}

/**
* Function to update the cart badge with the current count
*/
function updateCartBadge() {
  // Check if cart badge exists, if not create it
  let cartBadge = document.querySelector('.cart-count');
  
  if (!cartBadge) {
      const navbarNav = document.querySelector('.navbar-nav');
      
      // Create cart icon in navbar
      const cartItem = document.createElement('li');
      cartItem.className = 'nav-item position-relative';
      cartItem.innerHTML = `
          <a class="nav-link" href="#" id="cartIcon">
              <i class="fas fa-shopping-cart"></i>
          </a>
          <div class="cart-count">0</div>
      `;
      
      navbarNav.appendChild(cartItem);
      cartBadge = cartItem.querySelector('.cart-count');
      
      // Add event listener to cart icon
      document.getElementById('cartIcon').addEventListener('click', function(e) {
          e.preventDefault();
          openCart();
      });
  }
  
  // Update cart badge count
  cartBadge.textContent = cartCount;
}

/**
* Function to display notification
* @param {string} message - The message to display in the notification
*/
function showNotification(message) {
  // Remove any existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
      existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
      notification.classList.add('show');
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          notification.remove();
      }, 500);
  }, 3000);
}

/**
* Function to handle contact form submission
*/
function submitContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Show loading spinner
  submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (would be replaced with actual AJAX request)
  setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      // Clear form
      form.reset();
      
      // Show success message
      showNotification('Your message has been sent successfully!');
  }, 2000);
}

/**
* Function to open cart modal (placeholder for actual implementation)
*/
function openCart() {
  if (cartCount === 0) {
      showNotification('Your cart is empty!');
  } else {
      // This would be replaced with actual cart functionality
      showNotification(`You have ${cartCount} item(s) in your cart.`);
  }
}

/**
* Function to open full menu modal
*/
function openFullMenu() {
  // Create modal if it doesn't exist
  let menuModal = document.getElementById('fullMenuModal');
  
  if (!menuModal) {
      menuModal = document.createElement('div');
      menuModal.id = 'fullMenuModal';
      menuModal.className = 'menu-modal';
      menuModal.innerHTML = `
          <div class="menu-modal-content">
              <span class="menu-close">&times;</span>
              <h2 class="menu-modal-title">Our Complete Menu</h2>
              <div class="row">
                  <div class="col-md-6">
                      <h4>Main Dishes</h4>
                      <ul class="list-group mb-4">
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Butter Chicken
                              <span class="price">₹249</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Chicken Tikka Masala
                              <span class="price">₹269</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Paneer Tikka
                              <span class="price">₹199</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Chana Masala
                              <span class="price">₹179</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Dal Makhani
                              <span class="price">₹159</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Palak Paneer
                              <span class="price">₹189</span>
                          </li>
                      </ul>
                      
                      <h4>Rice & Biryani</h4>
                      <ul class="list-group mb-4">
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Chicken Biryani
                              <span class="price">₹299</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Vegetable Biryani
                              <span class="price">₹249</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Jeera Rice
                              <span class="price">₹129</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Plain Rice
                              <span class="price">₹99</span>
                          </li>
                      </ul>
                  </div>
                  <div class="col-md-6">
                      <h4>South Indian</h4>
                      <ul class="list-group mb-4">
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Masala Dosa
                              <span class="price">₹149</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Plain Dosa
                              <span class="price">₹129</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Idli Sambar
                              <span class="price">₹119</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Vada Sambar
                              <span class="price">₹99</span>
                          </li>
                      </ul>
                      
                      <h4>Breads</h4>
                      <ul class="list-group mb-4">
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Garlic Naan
                              <span class="price">₹69</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Butter Naan
                              <span class="price">₹59</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Plain Naan
                              <span class="price">₹49</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                              Roti
                              <span class="price">₹39</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      `;
      
      document.body.appendChild(menuModal);
      
      // Add close functionality
      const closeBtn = menuModal.querySelector('.menu-close');
      closeBtn.addEventListener('click', function() {
          menuModal.style.display = 'none';
      });
      
      // Close modal when clicking outside the content
      menuModal.addEventListener('click', function(e) {
          if (e.target === menuModal) {
              menuModal.style.display = 'none';
          }
      });
  }
  
  // Show modal
  menuModal.style.display = 'block';
}

/**
* Function to make navbar sticky and change color on scroll
*/
function makeStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(29, 53, 87, 0.95)';
          navbar.style.padding = '10px 0';
      } else {
          navbar.style.backgroundColor = 'var(--dark)';
          navbar.style.padding = '15px 0';
      }
  });
}