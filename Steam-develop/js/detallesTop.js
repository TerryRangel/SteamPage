const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

function getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadGameDetails() {
    const gameId = getGameIdFromUrl();
    if (!gameId) return;

    try {
        const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        const game = await res.json();

        // Título y Publisher
        document.querySelector('.title').textContent = game.name;
        document.querySelector('.Publisher').textContent = `Publisher: ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}`;
        
        // Link del sitio
        if (game.website) {
            document.querySelector('.link').innerHTML = `<a href="${game.website}" target="_blank">${game.website}</a>`;
        } else {
            document.querySelector('.link').textContent = 'No website available';
        }

        // Acordeones: description, categories, requirements, release date
        const accordionPanels = document.querySelectorAll('.accordion + .panel');

        // Description
        accordionPanels[0].innerHTML = `<p>${game.description_raw || 'No description available.'}</p>`;

        // Categories / Genres
        accordionPanels[1].innerHTML = `<p>${game.genres?.map(g => g.name).join(', ') || 'No categories available.'}</p>`;

        // Requirements
        const requirements = game.platforms?.map(p => {
            if (p.requirements?.minimum) {
                return `<strong>${p.platform.name}:</strong> ${p.requirements.minimum}`;
            }
            return null;
        }).filter(Boolean).join('<br>') || 'No requirements available.';
        accordionPanels[2].innerHTML = `<p>${requirements}</p>`;

        // Release Date
        accordionPanels[3].innerHTML = `<p>${game.released || 'No release date available.'}</p>`;

        // Imágenes del carrusel
        const screenshotRes = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`);
        const screenshots = await screenshotRes.json();
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = screenshots.results.map((shot, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${shot.image}" class="d-block w-50 mx-auto" alt="Screenshot ${index + 1}">
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando detalles:', error);
    }
}

document.addEventListener("DOMContentLoaded", loadGameDetails);

document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(acc => {
        acc.addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });
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