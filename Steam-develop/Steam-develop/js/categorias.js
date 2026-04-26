async function renderGenres() {
    const url = 'https://games-details.p.rapidapi.com/gameinfo/single_game/730';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0f58250345msh76d0ec68163f91ep13bdddjsnc74afffc8320',

            'x-rapidapi-host': 'games-details.p.rapidapi.com'
        }
    };

    function getGenreIcon(genre) {
        const icons = {
            "FPS": "fas fa-bullseye",
            "Shooter": "fas fa-crosshairs",
            "Multiplayer": "fas fa-users",
            "Competitive": "fas fa-trophy",
            "Action": "fas fa-bolt",
            "Team-Based": "fas fa-people-group",
            "eSports": "fas fa-gamepad",
            "Tactical": "fas fa-chess-knight",
            "First-Person": "fas fa-eye",
            "PvP": "fas fa-swords",
            "Online Co-Op": "fas fa-network-wired",
            "Co-op": "fas fa-hands-helping",
            "Strategy": "fas fa-chess",
            "Military": "fas fa-helmet-safety",
            "War": "fas fa-explosion",
            "Difficult": "fas fa-skull-crossbones",
            "Trading": "fas fa-exchange-alt",
            "Realistic": "fas fa-camera",
            "Fast-Paced": "fas fa-forward-fast",
            "Moddable": "fas fa-tools",
            default: "fas fa-gamepad"
        };
        return icons[genre] || icons.default;
    }

    const customColors = ['var(--medio)', 'var(--fuerte)', 'var(--claro)','var(--grisMedio)','var(--grisOscuro)'];

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const gameDetails = data.data;

        if (!gameDetails.tags || !Array.isArray(gameDetails.tags)) {
            console.error("No se encontraron los géneros en la respuesta");
            return;
        }
        
        const genresContainer = document.getElementById('genres-list');
        genresContainer.innerHTML = `<h2 class="mb-5 mt-5 text-center text-light">Game Genres</h2>`;
        const row = document.createElement('div');
        row.className = 'row g-4';

        gameDetails.tags.forEach((genre, index) => {
           
            const col = document.createElement('div');
            col.className = 'col-11 col-sm-6 col-md-4 col-lg-3';

            const card = document.createElement('div');
            card.className = 'card genre-card h-100 text-center';
            card.style.backgroundColor = customColors[index % customColors.length];

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex justify-content-center align-items-center';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title mb-0 text-light';

            const link = document.createElement('a');
            link.href = 'genre.html';
            link.className = 'text-decoration-none text-light';
            link.onclick = (e) => {
                e.preventDefault();
                localStorage.setItem('selectedGenre', genre);
                window.location.href = 'genero.html';
            };

            const icon = document.createElement('i');
            icon.className = getGenreIcon(genre) + ' me-2';

            link.appendChild(icon);
            link.appendChild(document.createTextNode(genre));
            cardTitle.appendChild(link);
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        genresContainer.appendChild(row);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.genre-card').forEach(card => observer.observe(card));

         const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

    } catch (error) {
        console.error('Error al obtener los detalles del juego:', error);
    }
}

// Llamada inicial
document.addEventListener('DOMContentLoaded', renderGenres);

// Exporta para uso externo
window.renderGenres = renderGenres;


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

