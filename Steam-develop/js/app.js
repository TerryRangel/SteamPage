function mostrarSpinner(container) {
    container.innerHTML = `
        <div class="spinner-container text-center my-5">
        <i class="fas fa-spinner fa-spin fa-3x text-light"></i>
        <p class="mt-3 text-light">Rolling dice for awesome games... (ಠ‿↼)</p>
        </div>
    `;
}

const url = 'https://games-details.p.rapidapi.com/media/screenshots/730?limit=20&offset=0';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '0f58250345msh76d0ec68163f91ep13bdddjsnc74afffc8320',
        'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
};

const letrasDisponibles = 'abcdefghijklmnopqrstuvwxyz'.split('');

function obtenerLetrasAlAzar(cantidad = 3) {
    const letrasSeleccionadas = new Set();

    while (letrasSeleccionadas.size < cantidad) 
    {
        const indice = Math.floor(Math.random() * letrasDisponibles.length);
        letrasSeleccionadas.add(letrasDisponibles[indice]);
    }

    return Array.from(letrasSeleccionadas);
}

async function fetchMultipleSearches() 
{
    const letrasBusqueda = obtenerLetrasAlAzar(3);
    console.log('Letras usadas para búsqueda:', letrasBusqueda);

    const juegosMap = new Map();

    for (const letra of letrasBusqueda) 
    {
        const url = `https://games-details.p.rapidapi.com/search?sugg=${letra}`;
        try 
        {
            const response = await fetch(url, options);
            const result = await response.json();

            if (response.status === 200 && result.message === "success") 
            {
                const juegos = result.data.search;
                juegos.forEach(juego => 
                {
                    if (!juegosMap.has(juego.name)) {
                        juegosMap.set(juego.name, juego);
                    }
                });
            } else {
                console.error(`Error en la respuesta de la API para letra "${letra}":`, result);
            }
        } catch (error) {
        console.error(`Error al obtener juegos para letra "${letra}":`, error);
        }
    }

    return Array.from(juegosMap.values()).slice(0, 10);
}

function guardarID(id) {
    localStorage.setItem('juegoID', id);
}

async function cargarJuegos() {
    const container = document.getElementById("populares-container");
    mostrarSpinner(container);
    const juegos = await fetchMultipleSearches();
    container.innerHTML = '';

    juegos.forEach(juego => {
        const card = document.createElement("div");
        card.className = "card bg-dark text-white card-game";
        card.innerHTML = `
            <div class="card-inner">
                <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
                <div class="card-body">
                    <h5 class="card-title">${juego.name}</h5>
                    <p class="card-text precio">Price: ${juego.price}</p>
                    <a href="./detalles.html" class="btn btn-outline-light btn-sm" onclick="guardarID('${juego.id}')">Details</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function activarFlechasCarrusel() 
{
    const container = document.getElementById("populares-container");
    const left = document.querySelector(".arrow.left");
    const right = document.querySelector(".arrow.right");
    const scrollAmount = 430;

    left.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    right.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
}

async function cargarMasJuegos() {
  const container = document.getElementById("recomendados-container");
  mostrarSpinner(container);
  const juegos = await fetchMultipleSearches();
  container.innerHTML = '';

  juegos.forEach(juego => {
    const card = document.createElement("div");
    card.className = "card bg-dark text-white card-game";
    card.innerHTML = `
        <div class="card-inner">
            <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
            <div class="card-body">
                <h5 class="card-title">${juego.name}</h5>
                <p class="card-text precio">Price: ${juego.price}</p>
                <a href="./detalles.html" class="btn btn-outline-light btn-sm" onclick="guardarID('${juego.id}')">Details</a>
            </div>
        </div>
    `;
    container.appendChild(card);
  });
}

function activarFlechasCarruselRecomendados() 
{
    const container = document.getElementById("recomendados-container");
    const left = document.getElementById("arrow-left-more");
    const right = document.getElementById("arrow-right-more");
    const scrollAmount = 430;

    left.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    right.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
}

function setupCarouselScroll(containerId, leftButtonSelector, rightButtonSelector, scrollAmount = 600) 
{
    const container = document.getElementById(containerId);
    const leftButton = document.querySelector(leftButtonSelector);
    const rightButton = document.querySelector(rightButtonSelector);

    if (!container || !leftButton || !rightButton) return;

    // Manejadores de scroll
    leftButton.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Mostrar/ocultar flechas según posición del scroll
    function updateArrowVisibility() {
        if (container.scrollLeft <= 0) {
            leftButton.classList.add('hidden');
        } else {
            leftButton.classList.remove('hidden');
        }

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
            rightButton.classList.add('hidden');
        } else {
            rightButton.classList.remove('hidden');
        }
    }

    // Llamar al inicio y en cada scroll
    updateArrowVisibility();
    container.addEventListener('scroll', updateArrowVisibility);

    // También después de que se carguen dinámicamente los elementos
    const observer = new MutationObserver(updateArrowVisibility);
    observer.observe(container, { childList: true });
}

setupCarouselScroll("populares-container", ".trending-section .arrow.left", ".trending-section .arrow.right");
setupCarouselScroll("recomendados-container", "#arrow-left-more", "#arrow-right-more");


document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  cargarJuegos().then(activarFlechasCarrusel);
  cargarMasJuegos().then(activarFlechasCarruselRecomendados);
  cargarCollage();
});

/* Partículas */
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('particleContainer');
  const particleCount = 150;
  
  const colors = [
    'rgba(255, 255, 255, 0.7)',
    'rgba(100, 200, 255, 0.7)',
    'rgba(255, 100, 200, 0.7)',
    'rgba(100, 255, 200, 0.7)'
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    const opacity = Math.random() * 0.6 + 0.1;
    particle.style.opacity = opacity;

    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;

    container.appendChild(particle);
  }

  function randomGlow() {
    const particles = document.querySelectorAll('.particle');
    const visibleParticles = Array.from(particles).filter(p => {
      const rect = p.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    });

    if (visibleParticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleParticles.length);
      const particle = visibleParticles[randomIndex];
      
      particle.classList.add('glow');

      const glowTime = Math.random() * 1000 + 500;

      setTimeout(() => {
        particle.classList.remove('glow');
      }, glowTime);
    }
  }

  setInterval(randomGlow, Math.random() * 300 + 200);

  container.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 100) {
        particle.classList.add('glow');
        setTimeout(() => {
          particle.classList.remove('glow');
        }, 500);
      }
    });
  });
});

/* Brillo del Logo*/
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;
  
  navbar.style.backdropFilter = `blur(${Math.min(12, scrollY / 10)}px)`;
  navbar.style.webkitBackdropFilter = `blur(${Math.min(12, scrollY / 10)}px)`;
});

/* COMETA */
const cometConfig = {
  minCount: 7,      // Mínimo de cometas simultáneas
  maxCount: 17,      // Máximo de cometas simultáneas
  minDelay: 20000,  // Tiempo mínimo entre grupos (ms)
  maxDelay: 20000,  // Tiempo máximo entre grupos
  minSpeed: 6,      // Animación más lenta (s)
  maxSpeed: 10,     // Animación más rápida (s)
  colors: [         // Colores personalizados
    'rgba(102, 126, 234, 0.8)',  // Azul brand
    'rgba(118, 75, 162, 0.8)',   // Violeta brand
    'rgba(255, 154, 158, 0.8)',  // Rosa/accent
    'rgba(255, 255, 255, 0.8)'   // Blanco
  ]
};

function createAdvancedShootingStars() {
  const container = document.querySelector('.shooting-stars');
  container.innerHTML = '';
  
  const count = Math.floor(Math.random() * (cometConfig.maxCount - cometConfig.minCount + 1)) + cometConfig.minCount;
  
  for (let i = 0; i < count; i++) {
    const comet = document.createElement('div');
    comet.className = 'shooting-star';
    
    // Configuración aleatoria
    const topPos = Math.random() * 80 + 10;
    const delay = Math.random() * 10;
    const length = Math.random() * 100 + 50;
    const speed = Math.random() * (cometConfig.maxSpeed - cometConfig.minSpeed) + cometConfig.minSpeed;
    const color = cometConfig.colors[Math.floor(Math.random() * cometConfig.colors.length)];
    
    // Aplicar estilos
    comet.style.cssText = `
      top: ${topPos}%;
      animation-delay: ${delay}s;
      animation-duration: ${speed}s;
      width: ${length}px;
      background: linear-gradient(90deg, transparent, ${color});
    `;
    
    container.appendChild(comet);
  }
  
  // Siguiente grupo de cometas
  const nextDelay = Math.random() * (cometConfig.maxDelay - cometConfig.minDelay) + cometConfig.minDelay;
  setTimeout(createAdvancedShootingStars, nextDelay);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Primera ejecución después de 3s
  setTimeout(createAdvancedShootingStars, 3000);
});