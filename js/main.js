/*
    One-Page Photography Website JavaScript
    Author: Uğur Soğancı
*/

// Global variable for the slideshow
let slideIndex = 1;

// Initialize lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing lightbox...");
    
    // Initialize slideshow
    showSlides(slideIndex);
    
    // Setup direct click handlers on gallery images
    setupGalleryClicks();
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fixed class to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission (in a real app, you'd send to a server)
            showNotification('Your message has been sent successfully!', 'success');
            this.reset();
        });
    }

    // Close lightbox when X is clicked
    const closeBtn = document.querySelector('.lightbox .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeLightbox();
        });
    }
    
    // Close lightbox when clicking outside of content (on the dark background)
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === this) {
                closeLightbox();
            }
        });
    }
    
    // Setup prev/next buttons
    const prevBtn = document.querySelector('.prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            plusSlides(-1);
        });
    }
    
    const nextBtn = document.querySelector('.next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            plusSlides(1);
        });
    }
    
    // Handle keyboard events (Esc to close, arrows for navigation)
    window.addEventListener('keydown', function(event) {
        if (lightbox && lightbox.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    plusSlides(-1);
                    break;
                case 'ArrowRight':
                    plusSlides(1);
                    break;
            }
        }
    });
    
    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to the DOM
        document.body.appendChild(notification);
        
        // Add show class after a small delay (for transition effect)
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            // Remove from DOM after transition
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

// Setup gallery click handlers
function setupGalleryClicks() {
    console.log("Setting up gallery click handlers");
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            console.log(`Gallery item ${index + 1} clicked`);
            openLightbox();
            currentSlide(index + 1);
        });
    });
}

// Open the lightbox
function openLightbox() {
    console.log("Opening lightbox");
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'block';
        // Prevent page scrolling while lightbox is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Lightbox element not found");
    }
}

// Close the lightbox
function closeLightbox() {
    console.log("Closing lightbox");
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        // Re-enable page scrolling
        document.body.style.overflow = 'auto';
    }
}

// Next/previous controls
function plusSlides(n) {
    console.log(`Moving slides by ${n}`);
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    console.log(`Going to slide ${n}`);
    showSlides(slideIndex = n);
}

// Show the current slide
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('slides');
    
    if (!slides.length) {
        console.error("No slides found!");
        return;
    }
    
    console.log(`Showing slide ${n} of ${slides.length}`);
    
    // Loop back to the first slide if beyond the last slide
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    // Go to the last slide if going back from the first slide
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    // Show the current slide
    slides[slideIndex - 1].style.display = 'block';
} 