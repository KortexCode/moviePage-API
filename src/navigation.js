/* Aquí se reciben los eventos que generan un cambio de vista en el DOM */
location.hash = "#trends";
/* Se decta el cambio en el hash y la primera carga del Dom al iniciar la aplicación */
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator(){

    location.hash.startsWith("#trends") ? homePage() :  location.hash.startsWith("#search=") ? searchPage()
    : location.hash.startsWith("#movie") ?  moviePage() : location.hash.startsWith("#category") ? categoryhPage() 
    : homePage();
}

function homePage(){
    console.log("Home");
    categories.classList.add("d-none");
    trendingMovieView();
}
function categoryhPage(){
    cat
    console.log("Category");
    
}
/* function searchPage(){
    console.log("Search");
}
function moviePage(){
    console.log("Movie");
}
 */