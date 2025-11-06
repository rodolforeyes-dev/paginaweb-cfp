function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("email").value = "";
  document.getElementById("curso").value = "";
  document.getElementById("comentario").value = "";
}
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