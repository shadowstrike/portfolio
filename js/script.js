// Theme Toggle Functionality
(function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
})();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Optional: Add a simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Back to top functionality (if needed)
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--color-accent);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-size: 1.5rem;
        z-index: 1000;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Uncomment to enable back to top button
// createBackToTop();

// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.prevButton = element.querySelector('.carousel-button-prev');
        this.nextButton = element.querySelector('.carousel-button-next');
        this.indicators = element.querySelector('.carousel-indicators');
        this.counter = element.querySelector('.carousel-counter');
        this.fullscreenButton = null;
        this.isFullscreen = false;

        this.currentIndex = 0;
        this.slideCount = this.slides.length;

        this.init();
    }

    init() {
        // Create indicators
        if (this.indicators) {
            this.createIndicators();
        }

        // Create fullscreen button
        this.createFullscreenButton();

        // Add event listeners
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.goToPrevious());
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.goToNext());
        }

        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goToPrevious();
            if (e.key === 'ArrowRight') this.goToNext();
            if (e.key === 'Escape' && this.isFullscreen) this.exitFullscreen();
            if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
        });

        // Touch/swipe support
        this.addSwipeSupport();

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());

        // Auto-play (optional - uncomment to enable)
        // this.startAutoPlay(5000); // 5 seconds

        // Update initial state
        this.updateCarousel();
    }

    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });

        this.indicatorButtons = Array.from(this.indicators.children);
    }

    createFullscreenButton() {
        const container = this.carousel.querySelector('.carousel-container');
        if (!container) return;

        this.fullscreenButton = document.createElement('button');
        this.fullscreenButton.className = 'carousel-fullscreen-button';
        this.fullscreenButton.setAttribute('aria-label', 'Toggle fullscreen');
        this.fullscreenButton.innerHTML = `
            <svg class="fullscreen-icon fullscreen-icon-expand" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
            <svg class="fullscreen-icon fullscreen-icon-collapse" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/>
            </svg>
        `;
        this.fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
        container.appendChild(this.fullscreenButton);
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const elem = this.carousel;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    handleFullscreenChange() {
        this.isFullscreen = !!(document.fullscreenElement ||
                              document.webkitFullscreenElement ||
                              document.mozFullScreenElement ||
                              document.msFullscreenElement);

        this.carousel.classList.toggle('carousel-fullscreen', this.isFullscreen);

        if (this.fullscreenButton) {
            this.fullscreenButton.setAttribute('aria-label',
                this.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen');
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    goToNext() {
        if (this.currentIndex < this.slideCount - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    goToPrevious() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        // Move track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Update buttons
        if (this.prevButton) {
            this.prevButton.disabled = this.currentIndex === 0;
        }

        if (this.nextButton) {
            this.nextButton.disabled = this.currentIndex === this.slideCount - 1;
        }

        // Update indicators
        if (this.indicatorButtons) {
            this.indicatorButtons.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        // Update counter
        if (this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.slideCount}`;
        }
    }

    addSwipeSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diff = startX - currentX;
            const threshold = 50;

            if (diff > threshold) {
                this.goToNext();
            } else if (diff < -threshold) {
                this.goToPrevious();
            }

            isDragging = false;
        });

        // Mouse drag support for desktop
        this.carousel.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            this.carousel.style.cursor = 'grabbing';
        });

        this.carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });

        this.carousel.addEventListener('mouseup', () => {
            if (!isDragging) return;

            const diff = startX - currentX;
            const threshold = 50;

            if (diff > threshold) {
                this.goToNext();
            } else if (diff < -threshold) {
                this.goToPrevious();
            }

            isDragging = false;
            this.carousel.style.cursor = 'grab';
        });

        this.carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            this.carousel.style.cursor = 'grab';
        });
    }

    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.slideCount - 1) {
                this.goToNext();
            } else {
                this.goToSlide(0); // Loop back to start
            }
        }, interval);

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoPlay(interval);
        });
    }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));

    // Initialize image zoom modal
    initImageZoom();
});

// ==========================================
// IMAGE ZOOM MODAL
// ==========================================

function initImageZoom() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.innerHTML = `
        <div class="image-zoom-overlay"></div>
        <div class="image-zoom-content">
            <button class="image-zoom-close" aria-label="Close">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <button class="image-zoom-nav image-zoom-prev" aria-label="Previous image" style="display: none;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <button class="image-zoom-nav image-zoom-next" aria-label="Next image" style="display: none;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
            <div class="image-zoom-controls">
                <button class="image-zoom-control" id="zoom-in" aria-label="Zoom in">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                    </svg>
                </button>
                <button class="image-zoom-control" id="zoom-out" aria-label="Zoom out">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6"/>
                    </svg>
                </button>
                <button class="image-zoom-control" id="zoom-reset" aria-label="Reset zoom">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                </button>
            </div>
            <div class="image-zoom-wrapper">
                <img class="image-zoom-img" src="" alt="">
            </div>
            <p class="image-zoom-caption"></p>
            <p class="image-zoom-counter" style="display: none;"></p>
        </div>
    `;
    document.body.appendChild(modal);

    const overlay = modal.querySelector('.image-zoom-overlay');
    const closeBtn = modal.querySelector('.image-zoom-close');
    const zoomedImg = modal.querySelector('.image-zoom-img');
    const zoomedCaption = modal.querySelector('.image-zoom-caption');
    const zoomInBtn = modal.querySelector('#zoom-in');
    const zoomOutBtn = modal.querySelector('#zoom-out');
    const zoomResetBtn = modal.querySelector('#zoom-reset');
    const wrapper = modal.querySelector('.image-zoom-wrapper');
    const prevBtn = modal.querySelector('.image-zoom-prev');
    const nextBtn = modal.querySelector('.image-zoom-next');
    const counter = modal.querySelector('.image-zoom-counter');

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let carouselImages = [];
    let currentCarouselIndex = 0;

    // Function to update image transform
    function updateTransform() {
        zoomedImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        zoomedImg.style.cursor = scale > 1 ? 'grab' : 'default';
    }

    // Function to show carousel image
    function showCarouselImage(index) {
        if (carouselImages.length === 0) return;

        currentCarouselIndex = index;
        const imgData = carouselImages[index];
        zoomedImg.src = imgData.src;
        zoomedImg.alt = imgData.alt;
        zoomedCaption.textContent = imgData.caption;
        counter.textContent = `${index + 1} / ${carouselImages.length}`;

        // Reset zoom when switching images
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();
    }

    // Function to open modal
    function openModal(imgSrc, imgAlt, caption, carouselData = null) {
        // Reset carousel state
        carouselImages = [];
        currentCarouselIndex = 0;

        if (carouselData) {
            // Carousel mode
            carouselImages = carouselData.images;
            currentCarouselIndex = carouselData.startIndex;
            showCarouselImage(currentCarouselIndex);
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            counter.style.display = 'block';
        } else {
            // Single image mode
            zoomedImg.src = imgSrc;
            zoomedImg.alt = imgAlt;
            zoomedCaption.textContent = caption || imgAlt;
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            counter.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset zoom
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();
    }

    // Zoom in
    zoomInBtn.addEventListener('click', () => {
        scale = Math.min(scale + 0.5, 5);
        updateTransform();
    });

    // Zoom out
    zoomOutBtn.addEventListener('click', () => {
        scale = Math.max(scale - 0.5, 1);
        if (scale === 1) {
            posX = 0;
            posY = 0;
        }
        updateTransform();
    });

    // Reset zoom
    zoomResetBtn.addEventListener('click', () => {
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();
    });

    // Mouse wheel zoom
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        scale = Math.max(1, Math.min(5, scale + delta));
        if (scale === 1) {
            posX = 0;
            posY = 0;
        }
        updateTransform();
    });

    // Drag to pan (when zoomed in)
    zoomedImg.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            zoomedImg.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateTransform();
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            zoomedImg.style.cursor = scale > 1 ? 'grab' : 'default';
        }
    });

    // Touch support for mobile
    let initialDistance = 0;
    let initialScale = 1;

    wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            // Pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            initialDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            initialScale = scale;
        } else if (e.touches.length === 1 && scale > 1) {
            // Pan
            isDragging = true;
            startX = e.touches[0].clientX - posX;
            startY = e.touches[0].clientY - posY;
        }
    });

    wrapper.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            // Pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            scale = Math.max(1, Math.min(5, initialScale * (distance / initialDistance)));
            if (scale === 1) {
                posX = 0;
                posY = 0;
            }
            updateTransform();
        } else if (e.touches.length === 1 && isDragging) {
            // Pan
            posX = e.touches[0].clientX - startX;
            posY = e.touches[0].clientY - startY;
            updateTransform();
        }
    }, { passive: false });

    wrapper.addEventListener('touchend', () => {
        isDragging = false;
        initialDistance = 0;
    });

    // Carousel navigation
    prevBtn.addEventListener('click', () => {
        if (carouselImages.length > 0 && currentCarouselIndex > 0) {
            showCarouselImage(currentCarouselIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (carouselImages.length > 0 && currentCarouselIndex < carouselImages.length - 1) {
            showCarouselImage(currentCarouselIndex + 1);
        }
    });

    // Add click listeners to all images in project sections
    const clickableImages = document.querySelectorAll('.project-section img, .image-grid-item img, .image-stack-item img, .image-container img');
    clickableImages.forEach(img => {
        // Skip small images (like icons) - only zoom larger content images
        if (img.naturalWidth > 200 || img.width > 200) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                // Check if this image is part of a carousel
                const carouselSlide = img.closest('.carousel-slide');
                if (carouselSlide) {
                    const carousel = carouselSlide.closest('.carousel');
                    const allSlides = Array.from(carousel.querySelectorAll('.carousel-slide'));
                    const currentIndex = allSlides.indexOf(carouselSlide);

                    // Build carousel data
                    const images = allSlides.map(slide => {
                        const slideImg = slide.querySelector('img');
                        const slideCaption = slide.querySelector('.carousel-caption');
                        return {
                            src: slideImg.src,
                            alt: slideImg.alt,
                            caption: slideCaption?.textContent || slideImg.alt
                        };
                    });

                    openModal(null, null, null, {
                        images: images,
                        startIndex: currentIndex
                    });
                } else {
                    // Single image mode
                    const caption = img.parentElement.querySelector('.image-caption')?.textContent || img.alt;
                    openModal(img.src, img.alt, caption);
                }
            });
        }
    });

    // Close modal on overlay click
    overlay.addEventListener('click', closeModal);

    // Close modal on close button click
    closeBtn.addEventListener('click', closeModal);

    // Close modal on ESC key and arrow keys for carousel
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft' && carouselImages.length > 0 && currentCarouselIndex > 0) {
            showCarouselImage(currentCarouselIndex - 1);
        } else if (e.key === 'ArrowRight' && carouselImages.length > 0 && currentCarouselIndex < carouselImages.length - 1) {
            showCarouselImage(currentCarouselIndex + 1);
        }
    });
}

// Animated Grid Cells
function initAnimatedGrid() {
    console.log('Initializing animated grid...');
    console.log('Body element:', document.body);
    console.log('Document ready state:', document.readyState);

    // Create container for animated grid cells
    const container = document.createElement('div');
    container.className = 'animated-grid-cells';

    // Insert at the beginning of body
    if (document.body.firstChild) {
        document.body.insertBefore(container, document.body.firstChild);
    } else {
        document.body.appendChild(container);
    }

    console.log('Container created and added:', container);

    // Configuration
    const cellSize = 60; // Match CSS
    const numCells = 20; // Number of animated cells (increased since some will be rejected)
    const animationTypes = ['shine', 'float', 'pulse', 'shine float', 'shine pulse'];

    // Get viewport dimensions
    const getViewportDimensions = () => ({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Check if position overlaps with content areas
    function isInContentArea(x, y) {
        // Get all content containers
        const contentSelectors = [
            '.container',
            '.container-small',
            '.project-grid',
            '.hero',
            '.work',
            '.about',
            '.contact',
            '.project-section'
        ];

        for (const selector of contentSelectors) {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                const rect = element.getBoundingClientRect();
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

                // Adjust for scroll position
                const elementTop = rect.top + scrollY;
                const elementBottom = rect.bottom + scrollY;
                const elementLeft = rect.left + scrollX;
                const elementRight = rect.right + scrollX;

                // Add padding around content (60px = one cell width)
                const padding = 60;

                // Check if cell overlaps with content area (including padding)
                if (x >= elementLeft - padding &&
                    x <= elementRight + padding &&
                    y >= elementTop - padding &&
                    y <= elementBottom + padding) {
                    return true;
                }
            }
        }
        return false;
    }

    // Create grid cells
    function createGridCells() {
        const { width, height } = getViewportDimensions();

        // Clear existing cells
        container.innerHTML = '';

        // Calculate grid dimensions
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        // Create array of random positions
        const positions = [];
        let attempts = 0;
        const maxAttempts = numCells * 10; // Prevent infinite loop

        for (let i = 0; i < numCells && attempts < maxAttempts; i++) {
            attempts++;

            // Generate random grid position
            const col = Math.floor(Math.random() * cols);
            const row = Math.floor(Math.random() * rows);

            const x = col * cellSize;
            const y = row * cellSize;

            // Check if position already used (avoid overlap)
            const posKey = `${col}-${row}`;
            if (positions.includes(posKey)) {
                i--; // Try again
                continue;
            }

            // Check if position is in content area
            if (isInContentArea(x, y)) {
                i--; // Try again
                continue;
            }

            positions.push(posKey);

            // Create cell element
            const cell = document.createElement('div');
            cell.className = 'grid-cell';

            // Assign random animation type
            const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
            cell.classList.add(...animationType.split(' '));

            // Position the cell
            cell.style.left = `${x}px`;
            cell.style.top = `${y}px`;

            container.appendChild(cell);
        }

        console.log('Created', positions.length, 'grid cells (avoided content areas)');
    }

    // Initialize on load
    createGridCells();

    // Recreate cells on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createGridCells, 500);
    });

    // Recreate cells when content loads (for dynamic content)
    window.addEventListener('load', () => {
        setTimeout(() => {
            createGridCells();
            console.log('Grid cells recreated after page load');
        }, 100);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedGrid);
} else {
    initAnimatedGrid();
}
