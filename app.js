const API_KEY = "6ef820c6ab7348e39fd931143d162513"; // Me la van a robar, lo sé, pero bueno, es para el examen :D

const btnSearch = document.getElementById("btnSearch");
const search = document.getElementById("qInput");
const fromDate = document.getElementById("fromInput");
const toDate = document.getElementById("toInput");
const results = document.getElementById("newsContainer");

const obtenerNoticias = async () => {

    if (search.value === "") {
        results.innerHTML = "<p>Por favor ingresa una noticia</p>";
        return;
    }

    let url = "https://newsapi.org/v2/everything?q=" + search.value + "&sortBy=popularity&apiKey=" + API_KEY;

    if (fromDate.value !== "") {
        url += "&from=" + fromDate.value;
    }

    if (toDate.value !== "") {
        url += "&to=" + toDate.value;
    }

    const response = await fetch(url);
    const data = await response.json();

    results.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
        results.innerHTML = "<p>No se encontraron noticias</p>";
        return;
    }

    data.articles.forEach(element => {
        const divX = document.createElement("div");
        divX.classList.add("col-md-6", "mb-3");
        const imagen = element.urlToImage ? element.urlToImage : "https://via.placeholder.com/600x400";
        // El toLocaleDateString lo aprendi y lo estudie cuando me regaño jasjasjdj (Es para que se vea bonita la fecha)

        divX.innerHTML = `
            <div class="card h-100">
                <img src="${imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p>${element.source.name} - ${new Date(element.publishedAt).toLocaleDateString()}</p>
                    <p>${element.description || "Sin descripción"}</p>
                    <a href="${element.url}" target="_blank" class="btn btn-primary">
                        Leer más
                    </a>
                </div>
            </div>
        `;
        results.appendChild(divX);
    });
};
btnSearch.addEventListener("click", obtenerNoticias);