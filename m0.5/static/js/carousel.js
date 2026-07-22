class VideoCarousel {
  constructor(config) {
    this.containerId = config.containerId;
    this.videos = config.videos; // Array of video objects: [{src: 'video.mp4', caption: 'Caption text'}]
    this.loadCaptionsFromFile = config.loadCaptionsFromFile || false;
    this.videoNames = config.videoNames || []; // For loading captions from files
    
    this.currentIndex = 0;
    this.captions = {};
    this.isInitialized = false;
    
    this.init();
  }

  async init() {
    this.setupElements();
    
    if (this.loadCaptionsFromFile) {
      await this.loadAllCaptions();
    } else {
      // Use provided captions
      this.videos.forEach((video, index) => {
        this.captions[index] = video.caption;
      });
    }
    
    this.setupEventListeners();
    this.updateCarousel(0, false);
    this.isInitialized = true;
    
    // Restore transition after initialization
    setTimeout(() => {
      this.carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }, 100);
  }

  setupElements() {
    const container = document.getElementById(this.containerId);
    this.carouselTrack = container.querySelector('.carousel-track');
    this.slides = container.querySelectorAll('.carousel-slide');
    this.prevBtn = container.querySelector('.carousel-btn-prev');
    this.nextBtn = container.querySelector('.carousel-btn-next');
    this.indicators = container.querySelectorAll('.indicator');
    this.captionElement = container.querySelector('.video-caption');
    this.totalSlides = this.slides.length;

    this.carouselTrack.style.width = `${this.totalSlides * 100}%`;
    this.slides.forEach(slide => {
      slide.style.width = `${100 / this.totalSlides}%`;
    });
  }

  async loadCaption(videoName) {
    try {
      const response = await fetch(`./static/videos/dataset/${videoName}.txt`);
      if (response.ok) {
        const caption = await response.text();
        return caption.trim();
      }
    } catch (error) {
      console.log('Could not load caption for:', videoName);
    }
    return videoName; // Fallback to filename if caption loading fails
  }

  async loadAllCaptions() {
    for (let i = 0; i < this.videoNames.length; i++) {
      this.captions[i] = await this.loadCaption(this.videoNames[i]);
    }
    this.updateCaptionDisplay(0);
  }

  updateCaptionDisplay(index) {
    if (this.captionElement && this.captions[index]) {
      this.captionElement.innerHTML = this.captions[index];
    }
  }

  updateCarousel(index, animated = true) {
    this.currentIndex = index;
    
    // Calculate transform percentage
    const translateX = -(this.currentIndex * (100 / this.totalSlides));
    
    // Apply transition only if animated
    if (animated) {
      this.carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    } else {
      this.carouselTrack.style.transition = 'none';
    }
    
    // Move the carousel track
    this.carouselTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update active slide
    this.slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (i === this.currentIndex) {
        slide.classList.add('active');
        // Play the current video
        video.currentTime = 0;
        video.play().catch(e => {
          console.log('Auto-play prevented:', e);
        });
      } else {
        slide.classList.remove('active');
        // Pause other videos
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Update indicators
    this.indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === this.currentIndex);
    });

    // Update caption display
    this.updateCaptionDisplay(this.currentIndex);
  }

  nextSlide() {
    const newIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel(newIndex);
  }

  prevSlide() {
    const newIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel(newIndex);
  }

  setupEventListeners() {
    // Button events
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.prevBtn.addEventListener('click', () => this.prevSlide());

    // Indicator events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.updateCarousel(index);
      });
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    this.carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isDragging = true;
    }, { passive: true });

    this.carouselTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      const dragDistance = diff / window.innerWidth * 100;
      const baseTranslateX = -(this.currentIndex * (100 / this.totalSlides));
      this.carouselTrack.style.transition = 'none';
      this.carouselTrack.style.transform = `translateX(${baseTranslateX - dragDistance}%)`;
    }, { passive: true });

    this.carouselTrack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      } else {
        this.updateCarousel(this.currentIndex);
      }
    }, { passive: true });

    // Video ended events
    this.slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      video.addEventListener('ended', () => {
        if (index === this.currentIndex) {
          video.currentTime = 0;
          video.play().catch(e => {
            console.log('Auto-play prevented:', e);
          });
        }
      });
    });
  }
}