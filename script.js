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

//formulario de contacto

 // Número de WhatsApp al que se enviarán los datos (cambia esto por tu número)
    const NUMERO_WHATSAPP = '5492226442380'; // Formato: código país + número sin espacios ni guiones

    // Función para detectar si es dispositivo móvil
    function esDispositivoMovil() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Función para limpiar el formulario
    function limpiarFormulario() {
        document.getElementById('formularioInscripcion').reset();
    }

    // Función para formatear el nombre del curso
    function formatearCurso(valor) {
        const cursos = {
            'informatica': 'Informática',
            'electricista': 'Electricista',
            'administracion': 'Administración',
            'seguridad_higiene': 'Seguridad e higiene',
            'cocina': 'Cocina'
        };
        return cursos[valor] || valor;
    }

    // Función principal para enviar por WhatsApp
    function enviarPorWhatsApp(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const curso = document.getElementById('curso').value;
        const comentario = document.getElementById('comentario').value.trim();

        // Construir el mensaje
        let mensaje = `*NUEVA INSCRIPCIÓN*\n\n`;
        mensaje += `*Nombre:* ${nombre}\n`;
        if (telefono) {
            mensaje += `*Teléfono:* ${telefono}\n`;
        }
        mensaje += `*Email:* ${email}\n`;
        mensaje += `*Curso:* ${formatearCurso(curso)}\n`;
        if (comentario) {
            mensaje += `*Comentarios:* ${comentario}\n`;
        }

        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);

        // Determinar la URL según el dispositivo
        let urlWhatsApp;
        if (esDispositivoMovil()) {
            // Para móviles: usa la app de WhatsApp
            urlWhatsApp = `whatsapp://send?phone=${NUMERO_WHATSAPP}&text=${mensajeCodificado}`;
        } else {
            // Para PC: usa WhatsApp Web
            urlWhatsApp = `https://web.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${mensajeCodificado}`;
        }

        // Abrir WhatsApp
        const ventana = window.open(urlWhatsApp, '_blank');

        // Verificar si se pudo abrir la ventana (para detectar si tiene WhatsApp Web)
        if (!ventana || ventana.closed || typeof ventana.closed === 'undefined') {
            // Si no se pudo abrir (bloqueado por popup o no disponible)
            alert('No se pudo abrir WhatsApp. Por favor, asegúrate de:\n\n' +
                  '• Permitir ventanas emergentes en este sitio\n' +
                  '• Tener WhatsApp Web abierto en tu navegador\n' +
                  '• Haber iniciado sesión en WhatsApp Web');
        } else {
            // Si desde PC, dar un momento y verificar si WhatsApp Web está disponible
            if (!esDispositivoMovil()) {
                setTimeout(() => {
                    alert('Si WhatsApp Web no se abrió:\n\n' +
                          '1. Visita https://web.whatsapp.com\n' +
                          '2. Escanea el código QR con tu teléfono\n' +
                          '3. Vuelve a enviar el formulario');
                }, 2000);
            }
        }

        // Opcional: limpiar el formulario después de enviar
        // limpiarFormulario();
    }

    // Agregar el evento submit al formulario
    document.getElementById('formularioInscripcion').addEventListener('submit', enviarPorWhatsApp);

