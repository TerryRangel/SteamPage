document.addEventListener('DOMContentLoaded', () => {
  const selectedGenre = localStorage.getItem('selectedGenre');
  const container = document.getElementById('genre-results');

  if (!selectedGenre) {
    container.innerHTML = `<h2 class="text-light text-center mt-5 mb-4">No genre selected.</h2>`;
    return;
  }

  // Set para guardar IDs ya mostrados y evitar repeticiones
  const idsMostrados = new Set();

 const shuffleBtn = document.createElement('button');
shuffleBtn.id = 'shuffle-btn';
shuffleBtn.innerHTML = `<i class="fas fa-shuffle"></i>`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '65c9f687acmsh1f46c6ec6f2f10ap14d6c5jsnf43a816b1de5',
      'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
  };

  async function fetchGames(minimos = 9) {
    const letras = 'abcdefghijklmnopqrstuvwxyz'.split('').sort(() => 0.5 - Math.random());

    const juegos = new Map();
    const vistos = new Set();

    let letraIndex = 0;
    const concurrency = 5;

    async function procesarLetra(letra) {
      try {
        const res = await fetch(`https://games-details.p.rapidapi.com/search?sugg=${letra}`, options);
        const data = await res.json();
        const lista = data.data?.search || [];

        const detallesPromises = lista.map(async juego => {
          const id = juego.id || juego.appid || juego.game_id;
          if (!id || vistos.has(id) || idsMostrados.has(id)) return;  // Ignorar si ya mostrado antes
          vistos.add(id);

          try {
            const resDetalles = await fetch(`https://games-details.p.rapidapi.com/gameinfo/single_game/${id}`, options);
            const detalles = await resDetalles.json();
            const tags = detalles.data?.tags?.map(t => t.toLowerCase()) || [];

            if (tags.includes(selectedGenre.toLowerCase())) {
              juegos.set(id, { ...juego, ...detalles.data });
            }
          } catch { /* Silenciar error individual */ }
        });

        await Promise.allSettled(detallesPromises);
      } catch { /* Error en fetch de búsqueda */ }
    }

    while (juegos.size < minimos && letraIndex < letras.length) {
      const lote = letras.slice(letraIndex, letraIndex + concurrency);
      await Promise.allSettled(lote.map(procesarLetra));
      letraIndex += concurrency;
    }

    return Array.from(juegos.values()).slice(0, minimos);
  }

  async function cargarJuegos() {
    container.innerHTML = `<h2 class="text-light text-center mt-5 mb-4">${selectedGenre}</h2>`;

    // Mostrar mensaje de carga
    let loadingMessage = document.createElement('div');
    loadingMessage.className = 'text-center my-5';
    loadingMessage.innerHTML = `
      <i class="fas fa-spinner fa-spin fa-3x text-light"></i>
      <p class="mt-3 text-light">Hold tight! We're searching for the best games.... (⌐■_■)</p>
    `;
    container.appendChild(loadingMessage);

    try {
      const juegos = await fetchGames(9);
      loadingMessage.remove();

      if (juegos.length === 0) {
        if (idsMostrados.size === 0) {
          container.innerHTML += `<p class="text-light text-center">Sorry, we couldn’t find any games under <strong>${selectedGenre}</strong> right now. (>_<)</p>`;
        } else {
          container.innerHTML += `<p class="text-light text-center">No more new games found for <strong>${selectedGenre}</strong>. Try refreshing the page! (•_•)</p>`;
        }

        // Insertar botón shuffle al final si no está
        if (!container.contains(shuffleBtn)) {
          container.appendChild(shuffleBtn);
        }

        return;
      }

      // Añadir juegos al set de ya mostrados
      juegos.forEach(game => idsMostrados.add(game.id || game.appid || game.game_id));

      // Crear fila nueva y limpiar la anterior (porque limpiamos el container completo arriba)
      const row = document.createElement("div");
      row.className = "row";

      juegos.forEach(game => {
        const imageUrl = game.image || game.header_image || "https://via.placeholder.com/300x150?text=No+Image";
        const gameName = game.name || "No name";
        const gameId = game.id || game.appid || game.game_id || "";
        const price = game.price || "N/A";

        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
          <div class="card bg-dark text-white card-game h-100">
            <img src="${imageUrl}" class="card-img-top" alt="${gameName}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${gameName}</h5>
              <p class="card-text">Price: ${price}</p>
              <a href="./detalles.html" class="btn btn-outline-light btn-sm mt-auto" onclick="guardarID('${gameId}')">Details</a>
            </div>
          </div>
        `;
        row.appendChild(col);
      });

      container.appendChild(row);

      // Insertar botón shuffle al final (si no está ya)
      if (!container.contains(shuffleBtn)) {
        container.appendChild(shuffleBtn);
      }

    } catch (e) {
      console.error('Error loading games:', e);
      loadingMessage.remove();
      container.innerHTML += `<p class="text-light text-center">Our pixel elves are working hard to fix it. Please try again later! (╯︵╰,)</p>`;
    }
  }

  shuffleBtn.addEventListener('click', () => {
    cargarJuegos();
  });

  // Carga inicial
  cargarJuegos();
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
