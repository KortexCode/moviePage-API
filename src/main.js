
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
        /* cardsContainer.offset({top:0, left:0}) */
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

        //TO DO: Crear una sola función, hacer uso dela ncho del windows para saber si es mobile o desktop
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
            li.classList.add("nav-item", "d-md-none");
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
async function getMovieByCategory(name, id){
    try{
         //Consulta a la api axios
        const res = await api("discover/movie",{
            params: {
                with_genres : id,
            },
        });
        //Se obtienen los elementos del html
        const categoryTitle = document.querySelector("#categories .section-title");
        categoryTitle.textContent = name;
        const cardsContainer = document.querySelector(".category__cards-container");
         /* se llama a la función que genera las movie cards */   
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}
//Aquí se genera la insercción de las películas según la consulta realizada por el usuario
async function getMovieBySearch(query){
    console.log("la query", query)
    try{
         //Consulta a la api axios
        const res = await api("search/movie",{
            params: {
                query,
            },
        });
        //Se obtienen los elementos del html
        const cardsContainer = document.querySelector(".searching__cards-container");
        console.log("buscados", res);
        /* se llama a la función que genera las movie cards */   
        createMoviePosters(res, cardsContainer);
    }
    catch(error){
        console.log("Sorry"+error);
    }
}

function createMoviePosters(res, cardsContainer){
    //Se borra todo lo que halla en la sección contenedora antes de volver a realizar construcción de elementos en el html
    cardsContainer.innerHTML = "";
   
    const fragment = [];
    for (const item of res.data.results) {
       
        const movieImg = document.createElement("img");
        movieImg.setAttribute("alt", item.original_title);
        movieImg.src= "https://image.tmdb.org/t/p/w500"+item.poster_path;
        fragment.push(movieImg);
        
    }
    cardsContainer.append(...fragment);
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