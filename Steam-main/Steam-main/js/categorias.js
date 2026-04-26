document.addEventListener('DOMContentLoaded', async () => {
    const url = 'https://games-details.p.rapidapi.com/gameinfo/single_game/730';
    const options = 
    {
        method: 'GET',
        headers: {

                 
            'x-rapidapi-key': 'e801fcf27fmsh3d657d96ccf8155p148008jsnd372f34bb49f',
            'x-rapidapi-host': 'games-details.p.rapidapi.com'
        }
    };

    // Íconos personalizados por género
    function getGenreIcon(genre) 
    {
        const icons = 
        {
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

    // Colores de la paleta :root
    const customColors = ['var(--medio)', 'var(--fuerte)', 'var(--claro)','var(--gris)','var(--grisMedio)'];

    try 
    {
        const response = await fetch(url, options);
        const data = await response.json();
        const gameDetails = data.data;

        if (!gameDetails.tags || !Array.isArray(gameDetails.tags)) {
            console.error("No se encontraron los géneros en la respuesta");
            return;
        }

        const genresContainer = document.getElementById('genres-list');
        genresContainer.innerHTML = `
            <h2 class="mb-5 mt-5 text-center text-light">Game Genres</h2>
        `;
        const row = document.createElement('div');
        row.className = 'row g-4';

        gameDetails.tags.forEach((genre, index) => 
        {
            const col = document.createElement('div');
            col.className = 'col-11 col-sm-6 col-md-4 col-lg-3';

            const card = document.createElement('div');
            card.className = 'card genre-card h-100 text-center';
            card.style.backgroundColor = customColors[index % customColors.length];

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex justify-content-center align-items-center';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title mb-0 text-light';

            // Crear enlace que guarda en localStorage y redirige
            const link = document.createElement('a');
            link.href = 'genre.html'; // Página destino
            link.className = 'text-decoration-none text-light';
            link.onclick = (e) => 
            {
                e.preventDefault();
                localStorage.setItem('selectedGenre', genre); 
                window.location.href = 'genero.html';
            };

            // Ícono
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

        const observer = new IntersectionObserver(entries => 
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting) 
                {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.genre-card').forEach(card => observer.observe(card));
    }
    catch (error) 
    {
        console.error('Error al obtener los detalles del juego:', error);
    }
});
