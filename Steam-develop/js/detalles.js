const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '65c9f687acmsh1f46c6ec6f2f10ap14d6c5jsnf43a816b1de5',
        'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
};

async function obtenerDetallesJuego(id) {
    const url = `https://games-details.p.rapidapi.com/gameinfo/single_game/${id}`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);
        console.log(result.data.media.screenshot);

        document.querySelector(".title").textContent = result.data.name || "(╯°□°）╯︵ 404 Not Found";
        document.querySelector(".Publisher").textContent = (result.data.dev_details.publisher || "(´・ω・`)← Nothing to show here.");
        
        document.querySelector(".link").innerHTML = `Web site: ${
            result.data.external_links && result.data.external_links.length > 0
            ? `<a href="${result.data.external_links[0].link}" target="_blank">${
                (result.data.dev_details.franchise && result.data.dev_details.franchise.length > 0) 
                ? result.data.dev_details.franchise[0]
                : (result.data.name || "(°ロ°) !?← Where did it go?")
            }</a>`
            : (
            (result.data.dev_details.franchise && result.data.dev_details.franchise.length > 0) 
                ? result.data.dev_details.franchise[0]
                : (result.data.name || "(°ロ°) !?← Where did it go?")
            )
        }`;

        // Acordeones
        const panels = document.querySelectorAll(".panel");
        if (panels[0]) panels[0].innerHTML = `<p>${result.data.desc || "[ ×_× ] Information not found"}</p>`;
        if (panels[1]) panels[1].innerHTML = `<p>${result.data.tags ? result.data.tags.join(", ") : "(・・;)ゞ ← Sorry, I couldn't find that."}</p>`;
        if (panels[2]) panels[2].innerHTML = `<p>${result.data.sys_req.window.recomm || "(°ロ°) !?← Where did it go?"}</p>`;
        if (panels[3]) panels[3].innerHTML = `<p>${result.data.release_date || "(°ロ°) !? ← Where did it go?"}</p>`;

        // Carrusel
        const carouselInner = document.querySelector(".carousel-inner");

        if (result.data.media && result.data.media.screenshot && result.data.media.screenshot.length > 0 && carouselInner) {
            carouselInner.innerHTML = ""; // Limpiar contenido anterior

            result.data.media.screenshot.forEach((imgUrl, index) => {
                const item = document.createElement("div");
                item.className = `carousel-item${index === 0 ? " active" : ""}`;
                item.innerHTML = `<img src="${imgUrl}" class="d-block  mx-auto" alt="screenshot">`;
                carouselInner.appendChild(item);
            });
        }
    } catch (error) {
        console.error("Error al obtener los detalles del juego:", error);
    }
}

async function obtenerReviewsJuego(id) {
    const url = `https://games-details.p.rapidapi.com/reviews/mostrecent/${id}?limit=5&offset=0`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log("Reviews:", result);

        const container = document.querySelector(".reviews-container");
        if (!container) return;

        const reviews = result.data?.reviews;

        if (reviews && reviews.length > 0) {
            container.innerHTML = ""; // Limpiar contenido previo

            reviews.forEach(review => {
                const reviewEl = document.createElement("div");
                reviewEl.className = "review";

                reviewEl.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${review.user_profile}" alt="User Avatar" width="50" height="50" style="border-radius: 50%;">
                        <strong>${review.user_name || "Anon"}</strong>
                    </div>
                    <h4>${review.title || "No Title"}</h4>
                    <p><em>${review.date || "Unknown date"}</em></p>
                    <p>${review.content || "No review content."}</p>
                    <hr>
                `;

                container.appendChild(reviewEl);
            });
        } else {
            container.innerHTML = '<h3 style="text-align: center;">No reviews yet... Did everyone get disconnected? (⊙_☉)</h3>';

        }

    } catch (error) {
        console.error("Error al obtener las reviews:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const juegoID = localStorage.getItem('juegoID');
    console.log("juegoID:", juegoID); // Debug

    if (juegoID) {
        obtenerDetallesJuego(juegoID);
        obtenerReviewsJuego(juegoID);  // <-- Aquí llamamos a la función que obtiene las reviews
    }

    // Inicializar acordeones
    const accordions = document.querySelectorAll(".accordion");
    accordions.forEach((accordion) => {
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("active");
            const panel = accordion.nextElementSibling;
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