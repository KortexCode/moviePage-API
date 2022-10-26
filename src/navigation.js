window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator(){

    location.hash.startsWith("#trends") ? homePage() :  location.hash.startsWith("#search=") ? searchPage()
    : location.hash.startsWith("#movie") ?  moviePage() : location.hash.startsWith("#category") ? categoryhPage() : homePage();
}

function homePage(){
    console.log("Home");
}
function searchPage(){
    console.log("Search");
}
function moviePage(){
    console.log("Search");
}
function categoryhPage(){
    console.log("Search");
}