const options = {
  method: 'GET',
  headers: {
    	'x-rapidapi-key': 'e801fcf27fmsh3d657d96ccf8155p148008jsnd372f34bb49f',

    'x-rapidapi-host': 'games-details.p.rapidapi.com'
  }
};

const letrasDisponibles = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Función para obtener 3 letras únicas al azar
function obtenerLetrasAlAzar(cantidad = 3) {
  const letrasSeleccionadas = new Set();
  while (letrasSeleccionadas.size < cantidad) {
    const indice = Math.floor(Math.random() * letrasDisponibles.length);
    letrasSeleccionadas.add(letrasDisponibles[indice]);
  }
  return Array.from(letrasSeleccionadas);
}

async function fetchMultipleSearches() {
  const letrasBusqueda = obtenerLetrasAlAzar(3);
  console.log('Letras usadas para búsqueda:', letrasBusqueda); // Para depuración

  const juegosMap = new Map(); // Para evitar duplicados

  for (const letra of letrasBusqueda) {
    const url = `https://games-details.p.rapidapi.com/search?sugg=${letra}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.status === 200 && result.message === "success") {
        const juegos = result.data.search;
        juegos.forEach(juego => {
          if (!juegosMap.has(juego.name)) {
            juegosMap.set(juego.name, juego);
          }
        });
      } else {
        console.error(`Error en la respuesta de la API para letra "${letra}":`, result);
      }
    } catch (error) {
      console.error(`Error al obtener juegos para letra "${letra}":`, error);
    }
  }

  return Array.from(juegosMap.values()).slice(0, 9);
}
function guardarID(id) {
  localStorage.setItem('juegoID', id);
}

async function cargarJuegos() {
  const juegos = await fetchMultipleSearches();
  const container = document.getElementById("populares-container");
  container.innerHTML = ''; // Limpiar contenido previo

  juegos.forEach(juego => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card bg-dark text-white card-game">
        <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
        <div class="card-body">
          <h5 class="card-title">${juego.name}</h5>
          <p class="card-text">Price: ${juego.price}</p>
           <a href="./detalles.html" class="btn btn-outline-light btn-sm" onclick="guardarID('${juego.id}')">Details</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  cargarJuegos();
});
