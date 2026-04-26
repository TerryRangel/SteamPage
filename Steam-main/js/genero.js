document.addEventListener('DOMContentLoaded', async () => {
  const selectedGenre = localStorage.getItem('selectedGenre');
  const container = document.getElementById('genre-results');

  if (!selectedGenre) {
    container.innerHTML = `<h2 class="text-light text-center mt-5 mb-4">No genre selected.</h2>`;
    return;
  }

  // Mostrar mensaje de carga
  container.innerHTML = `<h2 class="text-light text-center mt-5 mb-4">${selectedGenre}</h2>`;
  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'text-center my-5';
  loadingMessage.innerHTML = `
    <i class="fas fa-spinner fa-spin fa-3x text-light"></i>
    <p class="mt-3 text-light">Hold tight! We're searching for the best games.... (⌐■_■)</p>
  `;
  container.parentNode.insertBefore(loadingMessage, container.nextSibling);

  const letras = 'abcdefghijklmnopqrstuvwxyz'.split('').sort(() => 0.5 - Math.random());
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'e801fcf27fmsh3d657d96ccf8155p148008jsnd372f34bb49f',
      'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
  };

  async function fetchGames(minimos = 9) {
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
          if (!id || vistos.has(id)) return;
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

  try {
    const juegos = await fetchGames(9);
    loadingMessage.remove();
    localStorage.setItem('juegosFiltrados', JSON.stringify(juegos));

    if (juegos.length === 0) {
      container.innerHTML += `<p class="text-light text-center">Sorry, we couldn’t find any games under <strong>${selectedGenre}</strong> right now. (>_<)</p>`;
      return;
    }

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
  } catch (e) {
    console.error('Error loading games:', e);
    loadingMessage.remove();
    container.innerHTML += `<p class="text-light text-center">  Our pixel elves are working hard to fix it. Please try again later! (╯︵╰,)</p>`;
  }
});
