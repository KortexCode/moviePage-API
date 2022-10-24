const bodyBackground = document.querySelector("body");

async function trendingMovieView(){
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

async function categoryMovieView(){
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

trendingMovieView();
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