const newsPerPage = 12;
const maxNews = 60;
let currentPage = 1;
let allNews = [];

const fetchNews = async () => 
{
    const url = 'https://epic-games-store.p.rapidapi.com/getNews/locale/en/limit/60';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1eaa470d96msh9a134e90ef0b98ap146897jsn112e62225d2e',
            'x-rapidapi-host': 'epic-games-store.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.json();
        allNews = result.slice(0, maxNews);
        displayPage(currentPage);
        updateButtons();
    } 
    catch (error) 
    {
        console.error('Error fetching news:', error);
        document.getElementById('news-container').innerHTML = '<p>Error al cargar las noticias.</p>';
    }
};

const displayPage = (page) => 
{
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    // Calcular índice inicial y final
    const start = (page - 1) * newsPerPage;
    const end = start + newsPerPage;
    const pageNews = allNews.slice(start, end);

    pageNews.forEach(news => 
    {
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

const updateButtons = () => 
{
    const totalPages = Math.ceil(allNews.length / newsPerPage);
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
};

document.getElementById('prev-btn').addEventListener('click', () => 
{
    if (currentPage > 1) 
    {
        currentPage--;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('next-btn').addEventListener('click', () => 
{
    const totalPages = Math.ceil(allNews.length / newsPerPage);

    if (currentPage < totalPages) 
    {
        currentPage++;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

fetchNews();
