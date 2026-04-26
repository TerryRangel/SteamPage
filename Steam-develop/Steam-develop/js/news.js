const newsPerPage = 9;
const maxNews = 100;
let currentPage = 1;
let allNews = [];
let filteredNews = [];

const fetchNews = async () => {
    const url = 'https://epic-games-store.p.rapidapi.com/getNews/locale/en/limit/100';
    const options = {
        method: 'GET',
        headers: {
          	'x-rapidapi-key': '44df0cede8msh6c81accb6f72542p1e343djsn7ab6aa5cb868',
            'x-rapidapi-host': 'epic-games-store.p.rapidapi.com'
        }
    };

    const container = document.getElementById('news-container');

    // Mostrar spinner dentro del contenedor de noticias
    container.innerHTML = `
        <div id="loading" style="text-align: center; padding: 40px;">
            <i class="fas fa-spinner fa-spin fa-3x" style="color: #555;"></i>
            <p style="margin-top: 15px; font-size: 1.2rem;">Loading legendary loot... (ง •̀_•́)ง</p>

        </div>
    `;

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Fetched news:', result);
        allNews = result.slice(0, maxNews);
        filteredNews = [];
        populateAuthorFilter();
        displayPage(currentPage);
        updateButtons();
    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = '<p>Error al cargar las noticias.</p>';
    }
};

const populateAuthorFilter = () => {
    const authorMap = new Map();

    allNews.forEach(news => {
        if (!news.author) return;

        const cleanName = news.author.trim().toLowerCase();
        if (!authorMap.has(cleanName)) {
            authorMap.set(cleanName, news.author.trim());
        }
    });

    const authors = Array.from(authorMap.values()).sort((a, b) => a.localeCompare(b));
    const select = document.getElementById('author-filter');
    select.innerHTML = '<option value="">All the authors</option>';

    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author.toLowerCase();
        option.textContent = author;
        select.appendChild(option);
    });
};

const applyFilters = () => {
    const selectedAuthor = document.getElementById('author-filter').value;
    const selectedOrder = document.getElementById('date-filter').value;

    filteredNews = allNews.filter(news => {
        const authorNormalized = (news.author || '').trim().toLowerCase();
        return selectedAuthor === '' || authorNormalized === selectedAuthor;
    });

    filteredNews.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return selectedOrder === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    currentPage = 1;
    displayPage(currentPage);
    updateButtons();
};

const displayPage = (page) => {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Quita el spinner o cualquier otro contenido

    const newsToShow = filteredNews.length ? filteredNews : allNews;
    const start = (page - 1) * newsPerPage;
    const end = start + newsPerPage;
    const pageNews = newsToShow.slice(start, end);

    pageNews.forEach(news => {
        const title = news.title || 'Título no disponible';
        const author = news.author || 'Autor desconocido';
        const date = new Date(news.date).toLocaleDateString() || '';
        const image = (news._images_ && news._images_.length > 0) ? news._images_[0] : 'https://via.placeholder.com/400x200?text=No+Image';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = news.content || '';
        let excerpt = tempDiv.querySelector('p') ? tempDiv.querySelector('p').textContent : '';
        if (excerpt.length > 150) excerpt = excerpt.substring(0, 150) + '...';

        const urlBase = 'https://www.epicgames.com';
        const newsUrl = news.url ? urlBase + news.url : '#';

        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <img src="${image}" alt="${title}" />
            <div class="news-content">
                <a href="${newsUrl}" target="_blank" rel="noopener" class="news-title">${title}</a>
                <div class="news-meta">By ${author} | ${date}</div>
                <p class="news-excerpt">${excerpt}</p>
                <a href="${newsUrl}" target="_blank" rel="noopener" class="news-link">Read more</a>
            </div>
        `;

        container.appendChild(card);
    });
};

const updateButtons = () => {
    const totalNews = filteredNews.length ? filteredNews : allNews;
    const totalPages = Math.ceil(totalNews.length / newsPerPage);
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
};

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    const totalNews = filteredNews.length ? filteredNews : allNews;
    const totalPages = Math.ceil(totalNews.length / newsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('author-filter').addEventListener('change', applyFilters);
document.getElementById('date-filter').addEventListener('change', applyFilters);

fetchNews();

/* Partículas */
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('particleContainer');
  const particleCount = 150; // Ajusta la cantidad de partículas
  
  // Colores para las partículas
  const colors = [
    'rgba(255, 255, 255, 0.7)',  // Blanco
    'rgba(100, 200, 255, 0.7)',  // Azul claro
    'rgba(255, 100, 200, 0.7)',  // Rosa
    'rgba(100, 255, 200, 0.7)'   // Verde agua
  ];

  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño aleatorio entre 1px y 4px
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posición aleatoria
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Opacidad aleatoria
    const opacity = Math.random() * 0.6 + 0.1;
    particle.style.opacity = opacity;
    
    // Color aleatorio
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Animación flotante básica
    particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
    
    container.appendChild(particle);
  }
  
  // Función para hacer brillar partículas aleatorias
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
      
      // Tiempo de brillo aleatorio entre 0.5s y 1.5s
      const glowTime = Math.random() * 1000 + 500;
      
      setTimeout(() => {
        particle.classList.remove('glow');
      }, glowTime);
    }
  }
  
  // Activar brillo aleatorio cada 200-500ms
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