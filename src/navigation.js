
window.addEventListener(
    'DOMContentLoaded',
    () => {
        // Agregando un estado de carga inical
        window.history.pushState({ loadUrl: window.location.href }, "", "");
        console.log(window.history.state);
    },
    false,
);

/* Aquí se reciben algunos de los eventos que generan un cambio de vista en el DOM */
//Botones de flecha atrás
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
        window.scrollTo(0, 0);  

    }, false);
}
//Click a al botón de busqueda en el home de mobile
btn_search_mobile.addEventListener("click", ()=>{
        let inputValue = inputMobile.value.split(" ");
        inputValue = inputValue.join("-");
        location.hash = "#search="+inputValue;              
    }, false);
//Click a al botón de busqueda en el home de desktop
btn_search_desktop.addEventListener("click", ()=>{
        let inputValue = inputDesktop.value.split(" ");
        inputValue = inputValue.join("-");
        location.hash = "#search="+inputValue;              
    }, false);
//Botón de ver más
btn_view_more.addEventListener("click", ()=>{
    location.hash = "#more-trends";              
}, false);



/* Se decta el cambio en el hash y la primera carga del Dom al iniciar la aplicación */
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

//Aquí se verifica si cual fue el cambio que sufrió el hash para mandar a llamar la vista deseada
function navigator(){

    location.hash.startsWith("#trends") ? homePage() :  location.hash.startsWith("#search=") ? searchPage()
    : location.hash.startsWith("#movie") ?  movieDetailPage() : location.hash.startsWith("#category") ? categoryhPage() 
    : location.hash.startsWith("#more-trends") ? trendingListPage() : homePage();
}

function homePage(){
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.add("d-none");
    trendingList.classList.add("d-none");
    searchBar.classList.remove("d-none");
    trending.classList.remove("d-none");

    //Si ya hay elementos cargados no hará nuevamente la consulta
    if(!(trendingCardsContainer.children.length > 0)){
        trendingMovieView();
    }
    window.scrollTo(0, 0); 
}
function trendingListPage(){
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.add("d-none");
    trending.classList.add("d-none");
    searchBar.classList.add("d-none");
    trendingList.classList.remove("d-none");
   
    //Si ya hay elementos cargados no hará nuevamente la consulta
    if(!(trendingCardsContainerList.children.length > 0)){
        trendingMovieViewMore();
    }
}
function categoryhPage(){
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    searching.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    category.classList.remove("d-none");
    //Se obtiene el id y nombre de categoría del hash usando split
    let [vista, categoryIdName] = location.hash.split("=");
    const [categoryId, categoryName] = categoryIdName.split("_");
    //manda a construir la vista de categorías con las películas a consultar
    getMovieByCategory(categoryName, categoryId); 
    window.scrollTo(0, 0); 
}
function searchPage(){
    console.log("Search");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    movieDetail.classList.add("d-md-none");
    searching.classList.remove("d-none");
    //Se obtiene el nombre de búsqueda en el hash usando split y join
    let [vista, searchName] = location.hash.split("=");
    let query = searchName.split("-");
    query= query.join(" ");
    getMovieBySearch(query); 
    window.scrollTo(0, 0); 
}
function movieDetailPage(){
    console.log("Movie");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    trendingList.classList.add("d-none");
    searchBar.classList.add("d-none");
    searching.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.remove("d-none");
    movieDetail.classList.remove("d-md-none");

    let [vista, movieId] = location.hash.split("=");
    let id = movieId.split("-");
    id = id.join(" ");
    console.log(history);
    getMovieById(id); 
    
}


