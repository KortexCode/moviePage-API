
//AXIOS INSTANCE
const axiosInstance = require('axios').default;
/* Se crea la instancia de axios con tres propiedades */
axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{"Content-Type": "application/json;charset=utf-8"},
    params:{
        "apiKey" : API_KEY,
    }
})

async function trendingMovieView(){
    try{
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key="+API_KEY);
        const data = await res.json();
        console.log("data", data);
    
        const trengingContainerCards = document.querySelector(".trending__cards-container");
        const fragment = new DocumentFragment();
        for (const item of data.results) {
            
            const movieImg = document.createElement("img");
            movieImg.setAttribute("alt", item.original_title);
            movieImg.src= "https://image.tmdb.org/t/p/w500"+item.poster_path;
            fragment.appendChild(movieImg);
        }
    
        trengingContainerCards.append(fragment);
    }
    catch(error){
        console.log("Sorry"+error);
    }
    

}
//Cargar las categorías en el menú Desktop, Desktop dropdown button.
async function categoryMovieView(){
   /*  Se realiza consulta por genéros de películas */
   /*  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY);
    const data = await res.json();
    console.log("data", data); */
 try{
     const {data} = await axiosInstance("/genre/movie/list");
     console.log(await axiosInstance("/genre/movie/list"));
 
     const categoryDesktop = document.getElementById("category-desktop-menu");
     const categoryMobile = document.getElementById("category-mobile-menu");
     const dropItemsContainer = document.getElementById("dropdown-items-container");
     const dropdownMobileItems = document.getElementById("dropdown-mobile-items");
 
     for (const item of data.genres) {
         //Se crean las etiquetas y se agregan atributos y clases
         const li = document.createElement("li");
         const a = document.createElement("a");
         const i = document.createElement("i");
         //Se agregan algunas clases de bootstrap y también atributos 
         a.classList.add("dropdown-item", "d-flex", "align-items-center");
         a.setAttribute("href", "#");
         i.classList.add("fa-solid", "fa-circle", "text-dark");
         a.append(i);
         a.append(item.name);
         li.append(a);
         dropItemsContainer.append(li);
        
     }
     for (const item of data.genres) {
         //Se crean las etiquetas y se agregan atributos y clases
         const li = document.createElement("li");
         const a = document.createElement("a");
         const i = document.createElement("i");
         
         //Se agregan algunas clases de bootstrap y también atributos 
         a.classList.add("nav-link", "d-flex", "align-items-center");
         a.setAttribute("href", "#");
         i.classList.add("fa-solid", "fa-circle", "text-dark");
         li.classList.add("nav-item", "d-md-none");
         a.append(i);
         a.append(item.name);
         li.append(a);
         dropdownMobileItems.append(li);
        
     }
     categoryDesktop.appendChild(dropItemsContainer);
     categoryMobile.append(dropdownMobileItems);

 }
 catch(error){
    console.log("sorry"+error);
 }
       
       
    

}

categoryMovieView();
/* trendingMovieView(); */












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