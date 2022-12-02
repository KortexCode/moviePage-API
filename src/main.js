/* SCROLLTOP BUTTON */
const scrollTop = document.getElementById("scroll-button");
scrollTop.addEventListener("click", () =>{
    window.scrollTo(0, 0);
})
/* PAGINATION */
let page = 1; //Para las listas de trending y popular
window.addEventListener("scroll", infinityScroll, {passive : false});
function infinityScroll(){
    //Se extrae el máximo scroll segúnla vista actual
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if( (maxScroll === window.scrollY) && (location.hash === "#more-trends")){
        //Se aumenta la página
        page++;
        //Se manda a llamar la función de consulta
        trendingMovieViewMore();
        
    }
    if( (maxScroll === window.scrollY) && (location.hash === "#more-popular")){
        //Se aumenta la página
        page++;
        //Se manda a llamar la función de consulta
        popularMovieViewMore();
    }
    if( (maxScroll === window.scrollY) && (location.hash.startsWith("#category"))){
        //Se obtiene el id y nombre de categoría del hash usando split
        let [vista, categoryIdName] = location.hash.split("=");
        const [categoryId, categoryName] = categoryIdName.split("_");
        //Se aumenta la página
        page++;
        //Se manda a llamar la función de consulta
        getMovieByCategory({name: categoryName, id:categoryId});
    }
    if( (maxScroll === window.scrollY) && (location.hash.startsWith("#search"))){
        //Se obtiene el nombre de búsqueda en el hash usando split y join
        let [vista, searchName] = location.hash.split("=");
        let query = searchName.split("-");
        query = query.join(" ");
        //Se aumenta la página
        page++;
        //Se manda a llamar la función de consulta
        getMovieBySearch({query});
    }   
}

//INTERCEPTOR OBSERVER PARAMS
//Se crea la instancia del observador y se pasa como parámetro la función callback, se omite options
//Se usará como raiz el viewport
let observer = new IntersectionObserver(entries => {
    /* console.log("todas las entradas", entries); */
    entries.filter(entry => entry.isIntersecting).forEach(entryImg => {
        const {src, alt} = entryImg.target.dataset;
        entryImg.target.setAttribute("alt", alt);

        const isNull = src.substring(src.length - 4);
        if(isNull == "null"){
            const emtyImg = "./Assets/Charge error.jpg";
            entryImg.target.setAttribute("src", emtyImg);
        }
        else{
            entryImg.target.setAttribute("src", src);
        }
       
        observer.unobserve(entryImg.target);       
    })
});

//AXIOS INSTANCE
/* Se crea la instancia de axios con tres propiedades */
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });

/* FUNCIONES CREADORAS */
//Se crea la vista de trending en el home
async function trendingMovieView(){
    try{
        /* Ejemplo de consulta por fecth
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key="+API_KEY);
        const data = await res.json();*/

        //Consulta a la api axios
        const res = await api("trending/movie/day");
        console.log("data", res); 
        //Se obtiene el contenedor de la sección de trending
        const cardsContainer = document.querySelector(".trending__cards-container");
        cardsContainer.innerHTML = "";
        /* se llama a la función que genera las movie cards */
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Se crean la vista en formato grilla al dar click al botón view more
async function trendingMovieViewMore(){
    try{
        //Consulta a la api axios
        const res = await api("trending/movie/day", {params : {
            page,
        }});
        console.log("data", res); 
        //Se obtiene el contenedor de la sección de trending
        const cardsContainer = document.querySelector(".trending-list__cards-container");
        console.log("page", page)
        if(page <= 1)
        cardsContainer.innerHTML = ""; 
        /* se llama a la función que genera las movie cards */
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry" + error);
    }
}
//Se crea la vista de trending en el home
async function popularMovieView(){
    try{
        //Consulta a la api axios
        const res = await api("movie/popular");
        console.log("data", res); 
        //Se obtiene el contenedor de la sección de trending
        const cardsContainer = document.querySelector(".popular__cards-container");
        cardsContainer.innerHTML = "";
        /* se llama a la función que genera las movie cards */
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
async function popularMovieViewMore(){
    try{
        //Consulta a la api axios
        const res = await api("movie/popular", {params : {
            page,
        }});
        console.log("data", res); 
        //Se obtiene el contenedor de la sección de trending
        const cardsContainer = document.querySelector(".popular-list__cards-container");
        if(page <= 1)
        cardsContainer.innerHTML = ""; 
        /* se llama a la función que genera las movie cards */
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Cargar las categorías en el menú Desktop y el menú Mobile
async function categoryMoviePreview(){
    /*  Se realiza consulta por genéros de películas usando fetch*/
    /*  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY);
     const data = await res.json();*/
    try{
        const {data} = await api("genre/movie/list");//El resultado no necesita de json()
        const categoryDesktop = document.getElementById("category-desktop-menu");
        const categoryMobile = document.getElementById("category-mobile-menu");
        const dropItemsContainer = document.getElementById("dropdown-items-container");
        const dropdownMobileItems = document.getElementById("dropdown-mobile-items");

        //TO DO: Crear una sola función, hacer uso del ancho del windows para saber si es mobile o desktop
        //el objetivo es dejar un sólo for of. 
        for(const item of data.genres) {
            //Se crean las etiquetas y se agregan atributos y clases
            const li = document.createElement("li");
            const h3 = document.createElement("h3");
            const i = document.createElement("i");
            //Evento para cambio de vista
            h3.addEventListener("click", () => {
                //Se usa split y join para solucionar el nombre errado tv%20Movie de la categoría Tv-Movie
                let movieCatgegoryName = item.name.split(" ");
                movieCatgegoryName = movieCatgegoryName.join("-");
                //Las demás categoría no serán afectadas si son de una sola palabra.
                location.hash =`#category=${item.id}_${movieCatgegoryName}`;
            }, false);
            //Se agregan algunas clases de bootstrap y también atributos 
            h3.classList.add("dropdown-item", "d-flex", "align-items-center");
            i.classList.add("fa-solid", "fa-circle", "text-dark");
            h3.append(i);
            h3.append(item.name);
            li.append(h3);
            //Para Desktop
            dropItemsContainer.append(li);
        
        }
        for(const item of data.genres) {
            //Se crean las etiquetas y se agregan atributos y clases
            const li = document.createElement("li");
            const h3 = document.createElement("h3");
            const i = document.createElement("i");
            //Evento para cambio de vista
            h3.addEventListener("click", () => {
                //Se usa split y join para solucionar el nombre errado tv%20Movie de la categoría Tv-Movie
                let movieCatgegoryName = item.name.split(" ");
                movieCatgegoryName = movieCatgegoryName.join("-");
                //Las demás categoría no serán afectadas si son de una sola palabra.
                location.hash =`#category=${item.id}_${movieCatgegoryName}`;
            }, false);
            //Se agregan algunas clases de bootstrap y también atributos 
            h3.classList.add("nav-link", "d-flex", "align-items-center");
            h3.setAttribute("role", "button");
            h3.setAttribute("data-bs-toggle", "collapse");
            h3.setAttribute("data-bs-target", "#navbarSupportedContent");
            h3.setAttribute("aria-controls", "navbarSupportedContent");
          
            i.classList.add("fa-solid", "fa-circle", "text-dark");
            li.classList.add("nav-item", "d-md-none", "align-self-baseline");
            h3.append(i);
            h3.append(item.name);
            li.append(h3);
            //Para Mobile
            dropdownMobileItems.append(li);
        
        }
        categoryDesktop.appendChild(dropItemsContainer);
        categoryMobile.append(dropdownMobileItems); 
    }
    catch(error){
        console.log("sorry "+ error);
    }
       
}
//Aquí se genera la insercción de las películas según la categoría seleccionada
async function getMovieByCategory({name, id} = {}){
    try{
         //Consulta a la api axios
        const res = await api("discover/movie",{
            params: {
                with_genres : id,
                page,
            },
        });
        //Se obtienen los elementos del html
        const categoryTitle = document.querySelector("#categories .section-title");
        categoryTitle.textContent = name;
        const cardsContainer = document.querySelector(".category__cards-container");
        if(page <= 1)
        cardsContainer.innerHTML = ""; 
         /* se llama a la función que genera las movie cards */   
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Aquí se genera la insercción de las películas según la consulta realizada por el usuario
async function getMovieBySearch({query}){
    try{
         //Consulta a la api axios
        const res = await api("search/movie",{
            params: {
                query,
                page,
            },
        });
        //Se obtienen los elementos del html
        const cardsContainer = document.querySelector(".searching__cards-container");
        if(page <= 1)
        cardsContainer.innerHTML = ""; 
        /* se llama a la función que genera las movie cards */   
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Aquí se genera la insercción de detalles de una película en la sección de detalles.
async function getMovieById(id){
    console.log("El id", id)
    try{
        
        const node = (node) => document.querySelector(node);
        //Consulta a la api axios
        const movie = await api("movie/"+id);
        //Se obtienen los elementos del html como la imagen de fondo y el articulo que encierra los detalles y categorías.
        const movieDetailImg = node("#movie-detail__img");
        const article = node("#movie-detail__article-details");
        article.innerHTML = "";
        
        //Se agrega el src de la imágen 
        movieDetailImg.src = "https://image.tmdb.org/t/p/w500"+movie.data.poster_path;
        movieDetailImg.alt = movie.data.original_title;
        
        //Se crean los detalles de la película
        const title  = document.createElement("h2");
        const description = document.createElement("p");
       
        //Se agregan clases y atributos
        title.setAttribute("id", "movie-detail__title");
        description.setAttribute("id", "movie-detail__description");
        title.classList.add("section-title", "mb-3");
        description.classList.add("mb-3");
        //Se agrega información de título y descripción
        title.textContent = movie.data.title;
        //Se agrega descripción
        description.textContent = movie.data.overview;
        //Se agregan al artículo los detalles
        article.append(title, description);
        /* Se crea un array con las categorías de la película  */
        const genresArray = movie.data.genres;
        /* Esta función creará las categorías y las introducirá en el contenedor */
        createCategoryContainer(genresArray, article);
        //Se obtiene la url con el id de la pelicula clickeada
        const url =`/movie/${movie.data.id}/similar`;
        //Se llama a la función que crea los poster de las películas relacionadas
        createMovieRelatedPoster(url);
       
   
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Se consulta cuales son las películas relacionadas y se llama a la función que crea los posters
async function createMovieRelatedPoster(url){
    const res = await api(url);
    const cardsContainer = document.querySelector(".related-movie__cards-container");
    cardsContainer.scrollTo(0, 0);
    createMoviePosters(res, cardsContainer);
}

//Se crean las imágenes en cada contenedor de cada sección
function createMoviePosters(res, cardsContainer){
    //Se borra todo lo que halla en la sección contenedora antes de volver a realizar construcción de elementos en el html
    cardsContainer.scrollTo(0, 0);
    const fragment = [];

    for (const item of res.data.results) {
        //Creando artículo contenedor de imagen e información de película
        const article = document.createElement("article");
        article.classList.add("section-article", "d-flex", "flex-column");
        const posterContainer = document.createElement("div");
        posterContainer.classList.add("poster-container");

        //Creando etiqueta de imagen
        const movieImg = document.createElement("img");
        movieImg.addEventListener("click", () =>{
            location.hash = "#movie="+item.id;
            window.scrollTo(0, 0);
        },false);
        movieImg.setAttribute("data-src", "https://image.tmdb.org/t/p/w300"+item.poster_path);
        movieImg.setAttribute("data-alt", item.original_title);
        observer.observe(movieImg);
 /*        movieImg.src = "https://image.tmdb.org/t/p/w500"+item.poster_path; */

        //Creando contenedor de título de película y puntaje
        const div = document.createElement("div");
        div.classList.add("container-fluid", "mt-3","px-0", "d-flex", "justify-content-between");
        div.setAttribute('id', "section-article__container");
        //Crenado contendor de puntaje e icono de puntaje
        const scoreContainer = document.createElement("div");
        scoreContainer.classList.add("d-flex");
        scoreContainer.setAttribute('id', "section-article__detail");
        //Creando etiqueta de titulo de película
        const title = document.createElement("p");
        title.classList.add("my-0");
        title.setAttribute('id', "section-article__title");
        title.innerText=item.original_title;
        //Creando etiqueta de ícono de puntaje
        const i = document.createElement("i");
        i.classList.add("fa-solid", "fa-star", "ms-2", "me-1");
        //Creando etiqueta de puntaje de película
        const score = document.createElement("p");
        score.classList.add("my-0", "ms-1");
        score.setAttribute('id', "section-article__score");
        let scores = parseInt(item.vote_average); 
        scores = scores.toFixed(1);
        score.innerText = `${scores}`;

        //Agregando cada componenete dentro de su padre
        scoreContainer.append(i, score)
        div.append(title, scoreContainer);
        posterContainer.appendChild(movieImg);
        article.append(posterContainer, div);
        fragment.push(article);
        
    }
  /*   cardsContainer.innerHTML = ""; */
    cardsContainer.append(...fragment);
}
//Crea las categorías de la sección de detalles de peliculas
function createCategoryContainer(genresArray, article){

    const fragment = new DocumentFragment();
    //Se crean los contenedores de las categorías
    const ul = document.createElement("ul");
    const categoryContainer  = document.createElement("div");
    //Se asignan atributos y clases
    ul.setAttribute("id", "movie-detail__category");
    categoryContainer.setAttribute("id", "movie-detail__category-container");
    categoryContainer.classList.add("d-flex", "flex-column", "align-items-baseline", "flex-wrap");

    for (const genre of genresArray) {
        
        //Se crean las categorías de la película
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const i = document.createElement("i");
        //Se agregan algunas clases de bootstrap y también atributos  
        h3.classList.add("d-flex", "align-items-center");
        i.classList.add("fa-solid", "fa-circle", "text-dark");
        li.classList.add("nav-item");
        //Evento para cambio de vista
        h3.addEventListener("click", () => {
            //Se usa split y join para solucionar el nombre errado tv%20Movie de la categoría Tv-Movie
            let movieCatgegoryName = genre.name.split(" ");
            movieCatgegoryName = movieCatgegoryName.join("-");
            //Las demás categoría no serán afectadas si son de una sola palabra.
            location.hash =`#category=${genre.id}_${movieCatgegoryName}`;
        }, false);
        //Inserción 
        h3.append(i);
        h3.append(genre.name);
        li.append(h3);
        fragment.appendChild(li)
    }
    ul.innerHTML = "";
    categoryContainer.append(fragment);
    ul.append(categoryContainer);
    article.append(ul);
}


categoryMoviePreview();













/* 
async function popularMovieView(){
    const res = await fetch("https://api.themoviedb.org/3/popular/movie/day?api_key="+API_KEY);
    const data = await res.json();
    console.log("data", data);

    const popularContainerCards = document.querySelector(".popular__cards-container");
    const fragment = new DocumentFragment();
    for (const item of data.results) {
        
        const movieImg = document.createElement("img");
        movieImg.setAttribute("alt", item.original_title);
        movieImg.src= "https://image.tmdb.org/t/p/w500"+item.poster_path;
        fragment.appendChild(movieImg);
    }
    popularContainerCards.append(fragment);
    

}

popularMovieView(); */