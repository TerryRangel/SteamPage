const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);
const formatDate = date => date.toISOString().split('T')[0];
let searchTerm = "";

const startDate = formatDate(oneMonthAgo);
const endDate = formatDate(today);

const sections = [
    {
        title: "Monthly top 10",
        elementId: "game-list",
        ordering: "-playtime",
        dateRange: `${startDate},${endDate}`,
        page_size: 10,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-gamepad me-2"></i>Similar games: ${game.suggestions_count}</p>
            <p class="card-text"><i class="fas fa-calendar-alt me-2"></i>  ${game.released}</p>
        `,
        filter: game => game.playtime > 0 && game.reviews_count > 0
    },
    {
        title: "Top sales",
        elementId: "top-sales-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
           <p class="card-text"><i class="fas fa-bookmark me-2"></i>Saved by: ${game.added} users</p>
        `
    },
    {
        title: "Top rated",
        elementId: "top-rated-list",
        ordering: "-rating",
        page_size: 8,
        displayFields: game => `
        <p class="card-text"><i class="fas fa-star me-2"></i> Rating: ${game.rating}</p>
        <p class="card-text"><i class="fas fa-medal me-2"></i> Rating Top: ${game.rating_top}</p>
        `
    },
    {
        title: "More players",
        elementId: "most-played-list",
        ordering: "-rating_top",
        page_size: 8,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-chart-line me-2"></i> Popularity: ${game.rating_top} / 5</p>
        `
    },
    {
        title: "Most saved by users",
        elementId: "most-added-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-list-check me-2"></i> Added to list: ${game.added}</p>
        `
    },
    {
        title: "With more reviews",
        elementId: "most-reviewed-list",
        ordering: "-metacritic",
        page_size: 8,
        displayFields: game => `
        <p class="card-text"><i class="fas fa-comments me-2"></i> Reviews: ${game.metacritic || 'N/A'}</p>
        `
    }
];

function createGameCard(game, contentHTML, rankingBadge = "") {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm position-relative hover-effect">
                ${rankingBadge}
                <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${game.name}</h5>
                        ${contentHTML}
                    </div>
                    <button class="btn btn-primary mt-3" onclick="window.location.href='detallesTop.html?id=${game.id}'">
                        Details
                    </button>       
                </div>
            </div>
        </div>
    `;
}

async function loadGames() {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block"; 

    for (const section of sections) {
        try {
            const url = new URL(`https://api.rawg.io/api/games`);
            url.searchParams.set("key", apiKey);
            url.searchParams.set("ordering", section.ordering);
            url.searchParams.set("page_size", section.page_size);
            if (section.dateRange) {
                url.searchParams.set("dates", section.dateRange);
            }

            const res = await fetch(url.toString());
            const data = await res.json();

            const container = document.getElementById(section.elementId);
            container.innerHTML = "";

            data.results.forEach((game, index) => {
                if (!game.background_image) return;

                const gameName = game.name.toLowerCase();

                if (!searchTerm || gameName.includes(searchTerm)) {
                    const extraInfo = section.displayFields(game);
                    const medal = `#${index + 1}`;
                    const rankingBadge = `<span class="ranking-badge position-absolute top-0 start-0 m-2">${medal}</span>`;

                    let cardHTML = createGameCard(game, extraInfo, rankingBadge);

                    if (searchTerm) {
                        cardHTML = cardHTML.replace(
                            '<div class="card-body d-flex flex-column justify-content-between">',
                            `<div class="card-body d-flex flex-column justify-content-between">
                                <p class="badge bg-info mb-2">Group: ${section.title}</p>`
                        );
                    }

                    container.innerHTML += cardHTML; 
                    spinner.style.display = "none"; 
                }
            });

            if (searchTerm && container.innerHTML.trim() === "") {
                document.getElementById(section.elementId).previousElementSibling.style.display = "none";
            }

        } catch (err) {
            console.error(`Error cargando juegos para ${section.title}:`, err);
        }
    }

   
}

document.addEventListener("DOMContentLoaded", loadGames);

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