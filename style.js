document.addEventListener('DOMContentLoaded', () => {
  // === Background Slideshow ===
  const slideshowContainer = document.querySelector('.background-slideshow');
  const files = [
    'assets/images/background/ucr.jpg',
    'assets/images/background/nova1.jpg',
    'assets/images/background/nova2.jpg',
    'assets/images/background/robot1.jpg',
    'assets/images/background/robot2.jpg',
    'assets/images/background/robot4.jpg',
    'assets/images/background/robot5.jpg',
    'assets/images/background/robot6.jpg',
    'assets/images/background/class2.jpg'
  ];
  let currentImage = '';

  slideshowContainer.style.transition = 'opacity 1.5s linear';
  slideshowContainer.style.opacity = 0.3;

  currentImage = files[0];
  slideshowContainer.style.backgroundImage = `url(${currentImage})`;
  slideshowContainer.style.opacity = 0.8;
  slideshowContainer.style.backgroundSize = 'cover';
  slideshowContainer.style.backgroundPosition = 'center';

  function changeBackground() {
    let newImage;
    do {
      newImage = files[Math.floor(Math.random() * files.length)];
    } while (newImage === currentImage && files.length > 1);
    currentImage = newImage;
    slideshowContainer.style.backgroundImage = `url(${currentImage})`;
    slideshowContainer.style.opacity = 0.8;
  }

  setTimeout(() => {
    slideshowContainer.style.opacity = 0;
    setTimeout(() => {
      changeBackground();
      setInterval(() => {
        slideshowContainer.style.opacity = 0;
        setTimeout(changeBackground, 800);
      }, 3700);
    }, 800);
  }, 8000);

  // === Project Reveal Animation ===
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('blurred');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    card.classList.add('blurred');
    observer.observe(card);
  });

  // === Experience Animation ===
  const timelineItems = document.querySelectorAll('.experience-section .timeline-item');
  const experienceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    experienceObserver.observe(item);
  });

  // === Workshops & Mentorships ===
  let workshopIndex = 0;
  const workshopSlides = document.querySelectorAll('.workshops-section .slide');
  const workshopNext = document.querySelector('.workshops-section .next');
  const workshopPrev = document.querySelector('.workshops-section .prev');
  const workshopDots = document.querySelectorAll('.workshops-section .dot');
  let workshopTimer;

  function showWorkshopSlide(index) {
    if (index >= workshopSlides.length) workshopIndex = 0;
    if (index < 0) workshopIndex = workshopSlides.length - 1;
    workshopSlides.forEach(slide => slide.classList.remove('active'));
    workshopDots.forEach(dot => dot.classList.remove('active'));
    workshopSlides[workshopIndex].classList.add('active');
    workshopDots[workshopIndex].classList.add('active');
  }

  function nextWorkshopSlide() {
    workshopIndex++;
    showWorkshopSlide(workshopIndex);
  }

  function prevWorkshopSlide() {
    workshopIndex--;
    showWorkshopSlide(workshopIndex);
  }

  function resetWorkshopTimer() {
    clearInterval(workshopTimer);
    workshopTimer = setInterval(nextWorkshopSlide, 3000);
  }

  workshopNext?.addEventListener('click', () => {
    nextWorkshopSlide();
    resetWorkshopTimer();
  });

  workshopPrev?.addEventListener('click', () => {
    prevWorkshopSlide();
    resetWorkshopTimer();
  });

  workshopDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      workshopIndex = i;
      showWorkshopSlide(workshopIndex);
      resetWorkshopTimer();
    });
  });

  showWorkshopSlide(workshopIndex);
  workshopTimer = setInterval(nextWorkshopSlide, 3000);

  // === Achievements ===
  let achievementIndex = 0;
  const achievementSlides = document.querySelectorAll('.achievements-slider .slide');
  const achievementNext = document.querySelector('.achievements-slider .next');
  const achievementPrev = document.querySelector('.achievements-slider .prev');
  const achievementDots = document.querySelectorAll('.achievements-slider .dot');
  let achievementTimer;

  function showAchievementSlide(index) {
    if (index >= achievementSlides.length) achievementIndex = 0;
    if (index < 0) achievementIndex = achievementSlides.length - 1;
    achievementSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      slide.style.display = 'none';
      slide.style.opacity = 0;
    });
    achievementDots.forEach(dot => dot.classList.remove('active'));
    achievementSlides[achievementIndex].classList.add('active');
    achievementSlides[achievementIndex].style.display = 'block';
    achievementSlides[achievementIndex].style.opacity = 1;
    achievementDots[achievementIndex].classList.add('active');
  }

  function nextAchievementSlide() {
    achievementIndex++;
    showAchievementSlide(achievementIndex);
  }

  function prevAchievementSlide() {
    achievementIndex--;
    showAchievementSlide(achievementIndex);
  }

  function resetAchievementTimer() {
    clearInterval(achievementTimer);
    achievementTimer = setInterval(nextAchievementSlide, 3000);
  }

  achievementNext?.addEventListener('click', () => {
    nextAchievementSlide();
    resetAchievementTimer();
  });

  achievementPrev?.addEventListener('click', () => {
    prevAchievementSlide();
    resetAchievementTimer();
  });

  achievementDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      achievementIndex = i;
      showAchievementSlide(achievementIndex);
      resetAchievementTimer();
    });
  });

  showAchievementSlide(achievementIndex);
  achievementTimer = setInterval(nextAchievementSlide, 3000);

  // === Scroll Triggered Animation ===
  const animatedElements = document.querySelectorAll('section, .skill-card, .project-card, .timeline-item, .publication-card, .slide, footer');
  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    element.classList.add('hidden');
    scrollObserver.observe(element);
  });
});
