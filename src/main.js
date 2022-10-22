

async function trendingMoView(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key="+API_KEY);
    const data = await res.json();
    console.log("data", data);

    const trengingContainerCards = document.querySelector(".trending__cards-container");
    const fragment = new DocumentFragment();
    for (const item of data.results) {
        console.log(item.backdrop_path);
        /* const movieImg = document.createElement("img");
        movieImg.src= item.poster_path;
        fragment.appendChild(movieImg); */
    }
    /* trengingContainerCards.append(fragment); */
    

}

trendingMoView();