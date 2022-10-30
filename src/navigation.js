/* Aquí se reciben los eventos que generan un cambio de vista en el DOM */
//Botones de flecha atrás
for (const item of arrowBack) {
    item.addEventListener("click", ()=>{
        window.history.go(-1);
        location.hash = "#trends";    
    }, false);
}
//Click a al botón de busqueda en el home de mobile
btn_Search_HomeMobile.addEventListener("click", ()=>{
    let InputValue = Input.value.split(" ");
    InputValue = InputValue.join("-");
    location.hash = "#search="+InputValue;   
}, false);


/* Se decta el cambio en el hash y la primera carga del Dom al iniciar la aplicación */
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

//Aquí se verifica si cual fue el cambio que sufrió el hash para mandar a llamar la vista deseada
function navigator(){

    location.hash.startsWith("#trends") ? homePage() :  location.hash.startsWith("#search=") ? searchPage()
    : location.hash.startsWith("#movie") ?  movieDetailPage() : location.hash.startsWith("#category") ? categoryhPage() 
    : homePage();
}

function homePage(){
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    searching.classList.add("d-none");
    searchBar.classList.remove("d-none");
    trending.classList.remove("d-none");

    //Si ya hay elementos cargados no hará nuevamente la consulta
    if(!(trendingCardsContainer.children.length > 0)){
        trendingMovieView();
    }
}
function categoryhPage(){
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    searching.classList.add("d-none");
    movieDetail.classList.add("d-none");
    category.classList.remove("d-none");
    //Se obtiene el id y nombre de categoría del hash usando split
    let [vista, categoryIdName] = location.hash.split("=");
    const [categoryId, categoryName] = categoryIdName.split("_");
    //manda a construir la vista de categorías con las películas a consultar
    getMovieByCategory(categoryName, categoryId); 
}
function searchPage(){
    console.log("Search");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    searching.classList.remove("d-none");
    //Se obtiene el nombre de búsqueda en el hash usando split y join
    let [vista, searchName] = location.hash.split("=");
    let query = searchName.split("-");
    query= query.join(" ");
    getMovieBySearch(query); 
}
function movieDetailPage(){
    console.log("Movie");
    //Se quitan las vistas que no se deben mostrar y se deja sólo la deseada
    trending.classList.add("d-none");
    searchBar.classList.add("d-none");
    searching.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.remove("d-none");
    
}


