const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'e801fcf27fmsh3d657d96ccf8155p148008jsnd372f34bb49f',
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
