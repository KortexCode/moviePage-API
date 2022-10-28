location.hash = "#movie";
/* Aquí se reciben los eventos que generan un cambio de vista en el DOM */
searchingArrowBack.addEventListener("click", ()=>{
    location.hash = "#trends";    
}, false);
categoriesArrowBack.addEventListener("click", ()=>{
    location.hash = "#trends";    
}, false);
movieDetailArrowBacK .addEventListener("click", ()=>{
    location.hash = "#trends";    
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
    console.log("Home");
    category.classList.add("d-none");
    searching.classList.add("d-none");
    movieDetail.classList.add("d-none");
    searchBar.classList.remove("d-none");
    trending.classList.remove("d-none");

    
    if(!(trendingCardsContainer.children.length > 0)){
        trendingMovieView();
    }
    
    /* console.log(Array.from(trendingCardsContainer.children)) */
}
function categoryhPage(){
    console.log("Category");
    trending.classList.add("d-none");
    searchBar.classList.add("d-none");
    searching.classList.add("d-none");
    movieDetail.classList.add("d-none");
    category.classList.remove("d-none");
    
    
}
function searchPage(){
    console.log("Search");
    trending.classList.add("d-none");
    searchBar.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.add("d-none");
    searching.classList.remove("d-none");
}
function movieDetailPage(){
    console.log("Movie");
    trending.classList.add("d-none");
    searchBar.classList.add("d-none");
    searching.classList.add("d-none");
    category.classList.add("d-none");
    movieDetail.classList.remove("d-none");

}
