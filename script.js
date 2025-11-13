//limpiar formulario contacto
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("email").value = "";
  document.getElementById("curso").value = "";
  document.getElementById("comentario").value = "";
}
//fin formulario

// Carrusel reutilizable con auto-play y pausa al pasar el mouse
document.querySelectorAll('.carousel').forEach(carrusel => {
  const track = carrusel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carrusel.querySelector('.next');
  const prevButton = carrusel.querySelector('.prev');

  let currentIndex = 0;
  let intervalId = null;
  const autoPlayInterval = 4000; // tiempo entre slides (ms)

  function updateCarousel() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Botones manuales
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Auto-play
  function startAutoPlay() {
    if (!intervalId) {
      intervalId = setInterval(nextSlide, autoPlayInterval);
    }
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Pausar al pasar el mouse sobre el carrusel
  carrusel.addEventListener('mouseenter', stopAutoPlay);
  carrusel.addEventListener('mouseleave', startAutoPlay);

  // Ajustar al redimensionar pantalla
  window.addEventListener('resize', updateCarousel);

  // Iniciar
  updateCarousel();
  startAutoPlay();
});

// ========================================
// NAVBAR RESPONSIVE - MENÚ HAMBURGUESA
// ========================================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const contactIcons = document.querySelector('.contact-icons');
const menuOverlay = document.querySelector('.menu-overlay');
const menuIcon = menuToggle.querySelector('i');

// Función para abrir/cerrar el menú
function toggleMenu() {
    menu.classList.toggle('active');
    contactIcons.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Cambiar icono hamburguesa por X
    if (menu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Evento click en el botón hamburguesa
menuToggle.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en el overlay
menuOverlay.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Cerrar menú al redimensionar la ventana a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        toggleMenu();
    }
});

// ========================================
// CARRUSELES MÚLTIPLES
// ========================================

// Seleccionar todos los carruseles de la página
const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.card');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    let cardsPerView = 3;

    // Función para actualizar cards visibles según el ancho de pantalla
    function updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) {
            cardsPerView = 1;
        } else if (width <= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateCarousel();
    }

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const totalCards = cards.length;
        const maxIndex = totalCards - cardsPerView;

        // Limitar el índice actual
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        // Calcular el desplazamiento
        const offset = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${offset}px)`;

        // Actualizar estado de botones
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = cards.length - cardsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Soporte táctil para móviles
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }

    // Inicializar y actualizar al cambiar tamaño
    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView();
});