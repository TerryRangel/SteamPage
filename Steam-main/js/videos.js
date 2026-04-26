const videoUrls = [
  "https://www.youtube.com/watch?v=LIu8vzPlE5g",
  "https://www.youtube.com/watch?v=G8x3Dd9CXfA",
  "https://www.youtube.com/watch?v=IxmGYFaEEfg",
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
  "https://www.youtube.com/watch?v=gee90tbqdhg"
];


// Función para cargar las miniaturas iniciales
function loadYouTubeThumbnails() {
  const container = document.getElementById('videos');
  if (!container) {
    console.error('No se encontró el contenedor con id="videos".');
    return;
  }

  // Mezcla y toma 12 videos
  const shuffledUrls = [...videoUrls].sort(() => Math.random() - 0.5);
  const selectedUrls = shuffledUrls.slice(0, 12);

  selectedUrls.forEach((url, index) => {
    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return;

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.dataset.videoId = videoId;

    const thumbnail = document.createElement('img');
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnail.alt = `Video ${index + 1}`;
    thumbnail.className = 'thumbnail';

    // No autoplay al principio, solo miniatura
    videoCard.appendChild(thumbnail);

    const title = document.createElement('h3');
    title.textContent = `Video ${index + 1}`;
    videoCard.appendChild(title);

    container.appendChild(videoCard);
  });

  // Inicializar observador para reproducir solo el video visible
  initVideoObserver(container);
}

// Observador de intersección para controlar qué video reproducir
function initVideoObserver(container) {
  let currentIframe = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const videoCard = entry.target;
      const videoId = videoCard.dataset.videoId;

      if (entry.isIntersecting) {
        // Cuando el video entra en viewport, reemplazar miniatura por iframe (si no está ya)
        if (!videoCard.querySelector('iframe')) {
          const iframe = document.createElement('iframe');
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;

          const thumbnail = videoCard.querySelector('img');
          if (thumbnail) videoCard.replaceChild(iframe, thumbnail);

          // Si hay un iframe anterior, removerlo y poner miniatura
          if (currentIframe && currentIframe !== videoCard) {
            resetVideoCard(currentIframe);
          }
          currentIframe = videoCard;
        }
      } else {
        // Cuando el video sale del viewport, volver a miniatura
        if (videoCard.querySelector('iframe')) {
          resetVideoCard(videoCard);
          if (currentIframe === videoCard) currentIframe = null;
        }
      }
    });
  }, { threshold: 0.8 }); // threshold para considerar visible

  // Observar cada videoCard
  container.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

// Función para reemplazar iframe por miniatura
function resetVideoCard(videoCard) {
  const videoId = videoCard.dataset.videoId;
  const iframe = videoCard.querySelector('iframe');
  if (!iframe) return;

  const thumbnail = document.createElement('img');
  thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  thumbnail.alt = "Video thumbnail";
  thumbnail.className = 'thumbnail';

  videoCard.replaceChild(thumbnail, iframe);
}

document.addEventListener('DOMContentLoaded', loadYouTubeThumbnails);
