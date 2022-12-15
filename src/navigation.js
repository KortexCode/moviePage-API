//FUNCIONALIDAD 
window.addEventListener(
    'DOMContentLoaded',
    () => {
        // Agregando un estado de carga inical
        window.history.pushState({ loadUrl: window.location.href }, "", "");
        console.log(window.history.state);
    },
    false,
);
/*SELECTOR DE IDIOMA*/
//Se crea una variable para el lenguaje por defecto el cual será inglés
let lang = "en-US";
/* Evento que detecta el cambio de valor del selector de idioma */
languageSelector.addEventListener("change", ()=>{
    /* const langObject = new languageChange(); */
    lang = languageSelector.value;
    console.log("ahora es",lang);
    if(lang != null){
        console.log("entro en condicional");
        //la vista de categorías siempre debe actualizarse
        categoryMoviePreview();
        //se debe actualizar la vista donde el usuario esté actualmente
        location.hash.startsWith("#search=") ? searchPage() : location.hash.startsWith("#movie") ?  movieDetailPage() 
        : location.hash.startsWith("#category") ? categoryPage() : location.hash.startsWith("#more-trends") ? trendingListPage() 
        : location.hash.startsWith("#more-popular") ? popularListPage() : homePage();   
    } 
    //Dependiendo del idioma elegido
    if(lang === "es"){
        trendingTitle.innerText = spanish.trending;
        popularTitle.innerText = spanish.popular;
        trendingListTitle.innerText = spanish.trending;
        popularListTitle.innerText = spanish.popular;
        favoriteTitle.innerText = spanish.favorites;
        resultsTitle.innerText = spanish.results;
        relatedTitle.innerText = spanish.relatedMovie;
        viewMoreTrending.innerText = spanish.viewMore;
        viewMorePopular.innerText = spanish.viewMore;
        homeTitle.innerText = spanish.home;
        userTitle.innerText = spanish.user;
        searchTitle.innerText = spanish.search;
        categoryDropdownDesktop.innerText = spanish.categories;
        categoryDropdownMobile.innerText = spanish.categories;
    }
    if(lang === "fr"){
        trendingTitle.innerText = french.trending;
        popularTitle.innerText = french.popular;
        trendingListTitle.innerText = french.trending;
        popularListTitle.innerText = french.popular;
        favoriteTitle.innerText = french.favorites;
        resultsTitle.innerText = french.results;
        relatedTitle.innerText = french.relatedMovie;
        viewMoreTrending.innerText = french.viewMore;
        viewMorePopular.innerText = french.viewMore;
        homeTitle.innerText = french.home;
        userTitle.innerText = french.user;
        searchTitle.innerText = french.search;
        categoryDropdownDesktop.innerText = french.categories;
        categoryDropdownMobile.innerText = french.categories;
    }
    if(lang === "de"){
        trendingTitle.innerText = german.trending;
        popularTitle.innerText = german.popular;
        trendingListTitle.innerText = german.trending;
        popularListTitle.innerText = german.popular;
        favoriteTitle.innerText = german.favorites;
        resultsTitle.innerText = german.results;
        relatedTitle.innerText = german.relatedMovie;
        viewMoreTrending.innerText = german.viewMore;
        viewMorePopular.innerText = german.viewMore;
        homeTitle.innerText = german.home;
        userTitle.innerText = german.user;
        searchTitle.innerText = german.search;
        categoryDropdownDesktop.innerText = german.categories;
        categoryDropdownMobile.innerText = german.categories;
    }
    if(lang === "en-US"){
        trendingTitle.innerText = english.trending;
        popularTitle.innerText = english.popular;
        trendingListTitle.innerText = english.trending;
        popularListTitle.innerText = english.popular;
        favoriteTitle.innerText = english.favorites;
        resultsTitle.innerText = english.results;
        relatedTitle.innerText = english.relatedMovie;
        viewMoreTrending.innerText = english.viewMore;
        viewMorePopular.innerText = english.viewMore;
        homeTitle.innerText = english.home;
        userTitle.innerText = english.user;
        searchTitle.innerText = english.search;
        categoryDropdownDesktop.innerText = english.categories;
        categoryDropdownMobile.innerText = english.categories;
    }

}); 

/* Aquí se reciben algunos de los eventos que generan un cambio de vista en el DOM */
//FUNCIONALIDADES DEL BOTÓN DE FLECHA PARA IR A ATRÁS
for (const item of arrowBack) {
    item.addEventListener("click", ()=>{
        //Se guarda el estado de carga inicial en stateLoad y se pregunta si incluye un #, esto se hace para
        //cuando se viene de un sitio web distinto al ir atrás en la navegación, los botones arrowback se
        //dirijan al home 
        const stateLoad = window.history.state ? window.history.state.loadUrl : '';
        if (stateLoad.includes('#')) {
            location.hash = '';
        } else {
            history.go(-1);
        }

    }, false);
}
//FUNCIONALIDADES DE LOS BOTONES DE BÚSQUEDA 
/*Click a al botón de busqueda en el home de mobile*/
btn_search_mobile.addEventListener("click", ()=>{
        let inputValue = inputMobile.value.split(" ");
        inputValue = inputValue.join("-");
        //Se verifica si el input está vacio o no
        if(inputMobile.value.trim()===""){
            inputMobile.value = "insert a query";
        }
        else{
            location.hash = "#search="+inputValue;  
        }                             
}, false);
//Click a al botón de busqueda en el home de desktop
btn_search_desktop.addEventListener("click", ()=>{
    let inputValue = inputDesktop.value.split(" ");
    inputValue = inputValue.join("-");
    //Se verifica si el input está vacio o no
    if(inputDesktop.value.trim()==="")
       inputDesktop.value = "insert a query"
    else
        location.hash = "#search="+inputValue;    
             
}, false);
//FUNCIONALIDADES DE LOS BOTONES DE VER MÁS
btn_view_more.addEventListener("click", ()=>{
    location.hash = "#more-trends";              
}, false);
btn_view_more2.addEventListener("click", ()=>{
    location.hash = "#more-popular";              
}, false);
//Botón de home para desktop y mobile
tagbar_btnHome.addEventListener("click", ()=>{
    location.hash = "#trends";              
}, false);
header_btnHome.addEventListener("click", ()=>{
    location.hash = "#trends";              
}, false);

//DETECCIÓN DE CAMBIOS EN EL HASH
/* Se decta el cambio en el hash y la primera carga del Dom al iniciar la aplicación */
window.addEventListener("DOMContentLoaded", navigatorPage, false);
window.addEventListener("hashchange", navigatorPage, false);
//Aquí se verifica si cual fue el cambio que sufrió el hash para mandar a llamar la vista deseada
function navigatorPage(){
    console.log("navega")
    //Se reinicia la cantidad de páginas mínimas en una vista.
    maxPages = 3;
    //Se reinicia la paginación
    page = 1;
    location.hash.startsWith("#trends") ? homePage() :  location.hash.startsWith("#search=") ? searchPage()
    : location.hash.startsWith("#movie") ?  movieDetailPage() : location.hash.startsWith("#category") ? categoryPage() 
    : location.hash.startsWith("#more-trends") ? trendingListPage() : location.hash.startsWith("#more-popular") ? popularListPage()
    : homePage();
}
//Las siguientes funciones habilitan e inhabilitan las vistas según se quiera ver u ocultar una
//También desde aquí se manda a llamar a las funciones constructoras de cada sección en el archivo main.js
function homePage(){
    console.log("entró en home");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.add("d-none");
    trendingList.classList.add("d-none");
    popularList.classList.add("d-none");
    favorite.classList.remove("d-none");
    searchBar.classList.remove("d-none");
    trending.classList.remove("d-none");
    popular.classList.remove("d-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.remove("d-none");
    //Se manda a llamar las funciones generadoras de la información  
    trendingMovieView();
    popularMovieView(); 
    favoriteMovieView(JSON.parse(localStorage.getItem("movie liked")));
    /* favoriteMovieView(); */
    window.scrollTo(0, 0);

}
function trendingListPage(){
    console.log("entro en trending");
    window.scrollTo(0, 0);
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.add("d-none");
    trending.classList.add("d-none");
    popular.classList.add("d-none");
    favorite.classList.add("d-none");
    popularList.classList.add("d-none");
    searchBar.classList.add("d-none");
    trendingList.classList.remove("d-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.remove("d-none");
    //Se manda a llamar las funciones generadoras de la información  
    trendingMovieViewMore();   
    window.scrollTo(0, 0);
}
function popularListPage(){
    console.log("entro en popularlist");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.add("d-none");
    trending.classList.add("d-none");
    popular.classList.add("d-none");
    searchBar.classList.add("d-none");
    trendingList.classList.add("d-none");
    favorite.classList.add("d-none");
    popularList.classList.remove("d-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.remove("d-none");
    //Se manda a llamar las funciones generadoras de la información  
    popularMovieViewMore();   
    window.scrollTo(0, 0);
}
function categoryPage(){
    console.log("entro en category");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    popular.classList.add("d-none");
    popularList.classList.add("d-none");
    searching.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    favorite.classList.add("d-none");
    category.classList.remove("d-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.remove("d-none");
    //Se obtiene el id y nombre de categoría del hash usando split
    let [vista, categoryIdName] = location.hash.split("=");
    const [categoryId, categoryName] = categoryIdName.split("_");
    //manda a construir la vista de categorías con las películas a consultar
    getMovieByCategory({name:categoryName, id:categoryId}); 
    window.scrollTo(0, 0); 
}
function searchPage(){
    console.log("entró en busqueda")
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    popular.classList.add("d-none");
    popularList.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    favorite.classList.add("d-none");
    searching.classList.remove("d-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.remove("d-none");
    //Se obtiene el nombre de búsqueda en el hash usando split y join
    let [vista, searchName] = location.hash.split("=");
    let query = searchName.split("-");
    query= query.join(" ");
    getMovieBySearch({query}); 
    window.scrollTo(0, 0); 
}
function movieDetailPage(){
    console.log("entro en detalles");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    popular.classList.add("d-none");
    popularList.classList.add("d-none");
    searchBar.classList.add("d-none");
    searching.classList.add("d-none");
    category.classList.add("d-none");
    favorite.classList.add("d-none");
    movieDetail.classList.remove("d-none");
    movieDetail.classList.remove("d-md-none");
    scrollTop.classList.replace("d-flex", "d-none");
    languageSelector.classList.add("d-none");
    //Se obtiene el id de la película clickeada en el hash usando split y join
    let [vista, movieId] = location.hash.split("=");
    let id = movieId.split("-");
    id = id.join(" ");
    //manda a construir la vista de categorías con las películas a consultar
    getMovieById(id); 
    window.scrollTo(0, 0);
    
}


