const cards = document.querySelectorAll('.card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;
let images = Array.from(cards).map(card => card.src);

// Ouvrir la lightbox
cards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('show');
    lightbox.style.display = 'flex';
  });
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }
});

// Montrer une image
function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  lightboxImg.style.opacity = 0;
  lightboxImg.style.transform = 'scale(0.9)';
  setTimeout(() => {
    lightboxImg.src = images[currentIndex];
    lightboxImg.style.opacity = 1;
    lightboxImg.style.transform = 'scale(1)';
  }, 100);
}

// Navigation flèches
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

// Navigation au clavier
document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    if (e.key === 'Escape') {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
    }
  }
});

// Swipe mobile
let startX = 0;
lightboxImg.addEventListener('touchstart', e => startX = e.touches[0].clientX);
lightboxImg.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) showImage(currentIndex - 1);
  if (startX - endX > 50) showImage(currentIndex + 1);
});
