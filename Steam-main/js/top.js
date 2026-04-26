const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);
const formatDate = date => date.toISOString().split('T')[0];

const startDate = formatDate(oneMonthAgo);
const endDate = formatDate(today);

const sections = [
    {
        title: "Top 10 del mes",
        elementId: "game-list",
        ordering: "-playtime",  // Cambia el criterio para destacar juegos jugados activamente
        dateRange: `${startDate},${endDate}`,
        page_size: 10,
        displayFields: game => `
            <p class="card-text">Juegos parecidos: ${game.suggestions_count}</p>
            <p class="card-text">Lanzado: ${game.released}</p>
        `,
        filter: game => game.playtime > 0 && game.reviews_count > 0
    },
    {
        title: "Top Ventas",
        elementId: "top-sales-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Guardado por: ${game.added} usuarios</p>
        `
    },
    {
        title: "Mejores Calificados",
        elementId: "top-rated-list",
        ordering: "-rating",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Rating: ${game.rating} ⭐</p>
            <p class="card-text">Rating Top: ${game.rating_top}</p>
        `
    },
    {
        title: "Más jugadores",
        elementId: "most-played-list",
        ordering: "-rating_top",
        page_size: 8,
        displayFields: game => `
        <p class="card-text">Popularidad: ${game.rating_top} / 5</p>
        `
    },
    {
        title: "Más guardados por usuarios",
        elementId: "most-added-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
        <p class="card-text">Añadido a listas: ${game.added}</p>
        `
    },
    {
        title: "Con más reseñas",
        elementId: "most-reviewed-list",
        ordering: "-metacritic",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Críticas: ${game.metacritic || 'N/A'}</p>
        `
    }
];

// Tarjeta de juego dinámica
function createGameCard(game, contentHTML) {
    return `
        <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
            <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
            <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title">${game.name}</h5>
                ${contentHTML}
            </div>
            <button class="btn btn-primary mt-3" onclick="showGameInfoById(${game.id}, '${game.name.replace(/'/g, "\\'")}')">
                Ver info
            </button>
            </div>
        </div>
        </div>
    `;
}

// Cargar y renderizar juegos en cada sección
async function loadGames() {
    const searchTerm = localStorage.getItem("searchTerm")?.toLowerCase();

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

            data.results.forEach(game => {
                if (!game.background_image) return;

                const gameName = game.name.toLowerCase();

                if (!searchTerm || gameName.includes(searchTerm)) {
                    const extraInfo = section.displayFields(game);

                    // Agregamos texto indicando a qué grupo pertenece si hay búsqueda
                    let cardHTML = createGameCard(game, extraInfo);
                    if (searchTerm) {
                        cardHTML = cardHTML.replace(
                        '<div class="card-body d-flex flex-column justify-content-between">',
                        `<div class="card-body d-flex flex-column justify-content-between">
                            <p class="badge bg-info mb-2">Grupo: ${section.title}</p>`
                        );
                    }

                    container.innerHTML += cardHTML;
                }
            });

            // Oculta secciones vacías si hay búsqueda
            if (searchTerm && container.innerHTML.trim() === "") {
                document.getElementById(section.elementId).previousElementSibling.style.display = "none";
            }

        } catch (err) {
            console.error(`Error cargando juegos para ${section.title}:`, err);
        }
    }

    // Limpia búsqueda tras mostrar
    if (localStorage.getItem("searchTerm")) {
        localStorage.removeItem("searchTerm");
    }

}

document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

document.getElementById("searchButton").addEventListener("click", () => {
    const term = document.getElementById("searchInput").value.trim();
    localStorage.setItem("searchTerm", term);
    location.reload(); // recarga para filtrar
});

document.addEventListener("DOMContentLoaded", loadGames);

async function showGameInfo(game) {
  const modalTitle = document.getElementById("gameModalTitle");
  const modalImage = document.getElementById("gameModalImage");
  const modalDescription = document.getElementById("gameModalDescription");
  const modalPlatforms = document.getElementById("gameModalPlatforms");
  const modalGenres = document.getElementById("gameModalGenres");
  const modalMetacritic = document.getElementById("gameModalMetacritic");

  // Muestra loading temporal mientras se carga la data
  modalTitle.textContent = game.name;
  modalImage.src = game.background_image;
  modalImage.alt = game.name;
  modalDescription.textContent = "Cargando descripción...";
  modalPlatforms.textContent = "Cargando...";
  modalGenres.textContent = "Cargando...";
  modalMetacritic.textContent = "Cargando...";

  const modal = new bootstrap.Modal(document.getElementById('gameInfoModal'));
  modal.show();

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`);
    const fullGame = await res.json();

    modalDescription.textContent = fullGame.description_raw || "Descripción no disponible.";
    modalPlatforms.textContent = fullGame.platforms?.map(p => p.platform.name).join(', ') || "No disponible";
    modalGenres.textContent = fullGame.genres?.map(g => g.name).join(', ') || "No disponible";
    modalMetacritic.textContent = fullGame.metacritic ?? "N/A";
  } catch (error) {
    modalDescription.textContent = "Error al cargar la descripción.";
    modalPlatforms.textContent = "Error";
    modalGenres.textContent = "Error";
    modalMetacritic.textContent = "Error";
    console.error("Error al obtener detalles del juego:", error);
  }
}

async function showGameInfoById(gameId, gameName) {
  const modalTitle = document.getElementById("gameModalTitle");
  const modalImage = document.getElementById("gameModalImage");
  const modalDescription = document.getElementById("gameModalDescription");
  const modalPlatforms = document.getElementById("gameModalPlatforms");
  const modalGenres = document.getElementById("gameModalGenres");
  const modalMetacritic = document.getElementById("gameModalMetacritic");

  // Mostrar loading mientras se busca
  modalTitle.textContent = gameName;
  modalImage.src = "";
  modalImage.alt = gameName;
  modalDescription.textContent = "Cargando descripción...";
  modalPlatforms.textContent = "Cargando...";
  modalGenres.textContent = "Cargando...";
  modalMetacritic.textContent = "Cargando...";

  const modal = new bootstrap.Modal(document.getElementById('gameInfoModal'));
  modal.show();

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
    const game = await res.json();

    modalImage.src = game.background_image;
    modalImage.alt = game.name;
    modalDescription.textContent = game.description_raw || "Descripción no disponible.";
    modalPlatforms.textContent = game.platforms?.map(p => p.platform.name).join(', ') || "No disponible";
    modalGenres.textContent = game.genres?.map(g => g.name).join(', ') || "No disponible";
    modalMetacritic.textContent = game.metacritic ?? "N/A";
  } catch (error) {
    console.error("Error al obtener detalles del juego:", error);
    modalDescription.textContent = "Error al cargar información.";
  }
}