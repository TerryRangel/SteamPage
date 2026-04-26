const videoUrls = [
  "https://www.youtube.com/watch?v=AsOPFHicUz8",
  "https://www.youtube.com/watch?v=IxmGYFaEEfg",
  "https://www.youtube.com/watch?v=LIu8vzPlE5g",
  "https://www.youtube.com/watch?v=G8x3Dd9CXfA",
  "https://www.youtube.com/watch?v=AsOPFHicUz8",
  "https://www.youtube.com/watch?v=gwyfaH6tFSc",
  "https://www.youtube.com/watch?v=MlW79fk1SkE",
  "https://www.youtube.com/watch?v=cN2Trm1-iR8",
  "https://www.youtube.com/watch?v=p3VuNdfVM5w",
  "https://www.youtube.com/watch?v=Q16OHRZK0ek",
  "https://www.youtube.com/watch?v=lyYOpOqGNfQ",
  "https://www.youtube.com/watch?v=Cbyv_ZCg1Ok",
  "https://www.youtube.com/watch?v=GwT_aoEtsyk",
  "https://www.youtube.com/watch?v=x7XwxIhzN10",
  "https://www.youtube.com/watch?v=L5ns_WerNDg",
  "https://www.youtube.com/watch?v=-rKagy175VA",
  "https://www.youtube.com/watch?v=ffeGuJu8Y2I",
  "https://www.youtube.com/watch?v=UYtdXopk0_A",
  "https://www.youtube.com/watch?v=aCb23KAfn5E",
  "https://www.youtube.com/watch?v=E7KQmkVT8rg",
  "https://www.youtube.com/watch?v=J_VZFNnRe48",
  "https://www.youtube.com/watch?v=6PYBjEw4Cd8",
  "https://www.youtube.com/watch?v=rsJA_5rxNa0",
  "https://www.youtube.com/watch?v=sJFLkfL9wrI",
  "https://www.youtube.com/watch?v=krJvSi683zQ",
  "https://www.youtube.com/watch?v=sUXa3jcVWyQ",
  "https://www.youtube.com/watch?v=KBg9wXSlB7c",
  "https://www.youtube.com/watch?v=PjoXLq7fqXY",
  "https://www.youtube.com/watch?v=yr9TmG2-oUU",
  "https://www.youtube.com/watch?v=9TG-Ya469Vk",
  "https://www.youtube.com/watch?v=gee90tbqdhg",
  "https://www.youtube.com/watch?v=48Rdr_-QdII",
  "https://www.youtube.com/watch?v=s3RJRJfnH5E",
  "https://www.youtube.com/watch?v=agM48MP6ySQ",
  "https://www.youtube.com/watch?v=7uxdL5llGPw",
  "https://www.youtube.com/watch?v=f0No-K3Fp_Y",
  "https://www.youtube.com/watch?v=cprl4SL3n50",
  "https://www.youtube.com/watch?v=9OOBDsog40c",
  "https://www.youtube.com/watch?v=whJoLCGsL54",
  "https://www.youtube.com/watch?v=lIjxsQS-q-w",
  "https://www.youtube.com/watch?v=VYIZaDigKFs",
  "https://www.youtube.com/watch?v=zm-sVBZ1VbQ",
  "https://www.youtube.com/watch?v=oa7mRi120fA",
  "https://www.youtube.com/watch?v=OicAS8-74Z4",
  "https://www.youtube.com/watch?v=SrVGYmKC6aQ",
  "https://www.youtube.com/watch?v=3PT0dh6qzHI",
  "https://www.youtube.com/watch?v=7aY8IQeWUTk",
  "https://www.youtube.com/watch?v=MlhRdr-b17E",
  "https://www.youtube.com/watch?v=hVaMgsY2FYY",
  "https://www.youtube.com/watch?v=1bdTh0FErOk",
  "https://www.youtube.com/watch?v=w_2NWG_ZHGU",
  "https://www.youtube.com/watch?v=2EEYmVMHO0w",
  "https://www.youtube.com/watch?v=1bLHLgthLZQ",
  "https://www.youtube.com/watch?v=zMDpdwFF180",
  "https://www.youtube.com/watch?v=ywBm7cOdWyo",
  "https://www.youtube.com/watch?v=16jA8jj8t6o",
  "https://www.youtube.com/watch?v=LUR3IV3YVP0",
  "https://www.youtube.com/watch?v=QJCpOk4lP7o",
  "https://www.youtube.com/watch?v=jadeCmcvKgY",
  "https://www.youtube.com/watch?v=hRVLwnmh8JQ",
  "https://www.youtube.com/watch?v=Mf7TU1lrO1E",
  "https://www.youtube.com/watch?v=5NMQD64qn1A",
  "https://www.youtube.com/watch?v=XOTuPYyuIsA",
  "https://www.youtube.com/watch?v=EkTcQSUzxeg",
  "https://www.youtube.com/watch?v=FmLX5xQTMlg",
  "https://www.youtube.com/watch?v=aTfXRwUbYnk",
  "https://www.youtube.com/watch?v=PSc9pSH1n3Y",
  "https://www.youtube.com/watch?v=smNBWbDZWDM",
  "https://www.youtube.com/watch?v=DpNIuJirhwU",
  "https://www.youtube.com/watch?v=WKpUdwPowJ4",
  "https://www.youtube.com/watch?v=2ec8EVtcwfM",
  "https://www.youtube.com/watch?v=VO8eAQhp2hw",
  "https://www.youtube.com/watch?v=oRZfJS-sCNw",
  "https://www.youtube.com/watch?v=gG3Brz575VU",
  "https://www.youtube.com/watch?v=oBJwSUbx38c",
  "https://www.youtube.com/watch?v=T1PEqNaE9B0",
  "https://www.youtube.com/watch?v=OhxsofjqGdw",
  "https://www.youtube.com/watch?v=LxI6Aqfsf6M",
  "https://www.youtube.com/watch?v=Kz5tbGnffG4",
  "https://www.youtube.com/watch?v=tmLKiI27mes",
  "https://www.youtube.com/watch?v=NZ1col0brRg",
  "https://www.youtube.com/watch?v=PoMCAUu92yU",
  "https://www.youtube.com/watch?v=FLlaWBpimOE",
  "https://www.youtube.com/watch?v=MRXXB1tj1MA",
  "https://www.youtube.com/watch?v=qeKVrRosRDM",
  "https://www.youtube.com/watch?v=2YOI0SUYYaI",
  "https://www.youtube.com/watch?v=ojCdmS2STzI",
  "https://www.youtube.com/watch?v=sc59--6drPc",
  "https://www.youtube.com/watch?v=iYAz7mQrpEw",
  "https://www.youtube.com/watch?v=wm4w3L4TAS4",
  "https://www.youtube.com/watch?v=D7u-r6ZygOs",
  "https://www.youtube.com/watch?v=bSeuymh5a1I",
  "https://www.youtube.com/watch?v=1cfLEysLFw8",
  "https://www.youtube.com/watch?v=3ltw25sZEAA",
  "https://www.youtube.com/watch?v=4UPO3B9_IvI",
  "https://www.youtube.com/watch?v=AWomKRbvvSA",
  "https://www.youtube.com/watch?v=GiyPRtjurBg",
  "https://www.youtube.com/watch?v=9CL3NLg7VZI",
  "https://www.youtube.com/watch?v=Gykf8ksxC4w",
  "https://www.youtube.com/watch?v=rTTKaL7gh0o",
  "https://www.youtube.com/watch?v=QGNce2Aw4H0",
  "https://www.youtube.com/watch?v=X_ZmmnBp7qQ",
  "https://www.youtube.com/watch?v=VoNLiMwIKgM",
  "https://www.youtube.com/watch?v=Yczb8ddxeds",
  "https://www.youtube.com/watch?v=JFVrzWG6H0U",
  "https://www.youtube.com/watch?v=ccZp3S8jl4Y",
  "https://www.youtube.com/watch?v=zXqkXttv1GI",
  "https://www.youtube.com/watch?v=abqk1lSVpiY",
  "https://www.youtube.com/watch?v=_4M7B3oxZKI",
  "https://www.youtube.com/watch?v=lHGISb-Zy9k",
  "https://www.youtube.com/watch?v=cMFnV4Yrzkg",
  "https://www.youtube.com/watch?v=xeDRSX5SR04",
  "https://www.youtube.com/watch?v=FbMSPYo0Rkg",
  "https://www.youtube.com/watch?v=PHIu8dMk00k",
  "https://www.youtube.com/watch?v=6-o7yPWRONE",
  "https://www.youtube.com/watch?v=UBQvx6efxqU",
  "https://www.youtube.com/watch?v=gW963LJkNwE",
  "https://www.youtube.com/watch?v=gFHwsJBAS84",
  "https://www.youtube.com/watch?v=uDuUA7Q-b7o",
  "https://www.youtube.com/watch?v=OYIUSlB0sHk",
   "https://www.youtube.com/watch?v=efQuNS4VMw0",
  "https://www.youtube.com/watch?v=FFDTGqYff1E",
  "https://www.youtube.com/watch?v=2-fTo5hOdwo",
  "https://www.youtube.com/watch?v=nYzNds5Qbaw",
  "https://www.youtube.com/watch?v=oDGoq1ictjw",
  "https://www.youtube.com/watch?v=MyKPp7EpqkM",
  "https://www.youtube.com/watch?v=XckFiXw-afw",
  "https://www.youtube.com/watch?v=IOhEqxCBcTI",
  "https://www.youtube.com/watch?v=hrqgQRUw-xw",
  "https://www.youtube.com/watch?v=lLCwIH-bvyk",
  "https://www.youtube.com/watch?v=1XHJOc_gl9o",
  "https://www.youtube.com/watch?v=SbHKJ5LdnnI",
  "https://www.youtube.com/watch?v=5smmQFMB370",
  "https://www.youtube.com/watch?v=rAT7eECctYE",
  "https://www.youtube.com/watch?v=0KK01gVbkfw"
];



let currentIndex = 0;
let videoCards = [];
let historyStack = []; 


function loadYouTubeVideos() {
  const container = document.getElementById('videos');
  if (!container) {
    console.error('No se encontró el contenedor con id="videos".');
    return;
  }

  videoUrls.forEach((url) => {
    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return;

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.dataset.videoId = videoId;
    container.appendChild(videoCard);
  });

  videoCards = Array.from(container.children);
  showVideo(currentIndex);
  createScrollButtons();
}

function createIframe(videoId) {
  const iframe = document.createElement('iframe');
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&enablejsapi=1`;
  iframe.frameBorder = "0";
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
  iframe.setAttribute("allowfullscreen", "true");
  return iframe;
}

function showVideo(index) {
  const videoCard = videoCards[index];
  if (!videoCard) return;

  const videoId = videoCard.dataset.videoId;

  videoCard.innerHTML = '';
  const iframe = createIframe(videoId);
  videoCard.appendChild(iframe);

 
}

function createScrollButtons() {
  // Botón Izquierda abajo - VIDEO ANTERIOR
  const leftButton = document.createElement('button');
  leftButton.innerHTML = '↓';
  leftButton.id = 'scroll-left-btn';
  Object.assign(leftButton.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: '9999',
    transform: 'rotate(180deg)',  // gira la flecha para que apunte hacia arriba
  });
  document.body.appendChild(leftButton);

  // Botón Derecha abajo - VIDEO SIGUIENTE
  const rightButton = document.createElement('button');
  rightButton.innerHTML = '↓';
  rightButton.id = 'scroll-right-btn';
  Object.assign(rightButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: '9999',
  });
  document.body.appendChild(rightButton);

 leftButton.addEventListener('click', () => {
  const previousCard = videoCards[currentIndex];
  previousCard.innerHTML = '';

  if (historyStack.length > 0) {
    currentIndex = historyStack.pop(); // vuelve al último video en el historial
    showVideo(currentIndex);
  } else {
    console.log("No hay videos anteriores en el historial.");
  }
});

rightButton.addEventListener('click', () => {
  const previousCard = videoCards[currentIndex];
  previousCard.innerHTML = '';

  historyStack.push(currentIndex); // guarda el actual antes de cambiar

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * videoCards.length);
  } while (randomIndex === currentIndex);

  currentIndex = randomIndex;
  showVideo(currentIndex);
});


}

document.addEventListener('DOMContentLoaded', loadYouTubeVideos);

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