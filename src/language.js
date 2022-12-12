/* Se crea una clase llamada language para crear los diferentes idiomas a los que la aplicación será traducida */
class Language{
    constructor({trending, popular, categories, favorites, relatedMovie, viewMore, results, search, addTo, home, user,}){
        this.trending = trending;
        this.popular = popular;
        this.favorites = favorites;
        this.categories = categories;
        this.relatedMovie =relatedMovie;
        this.viewMore =viewMore;
        this.results = results;
        this.search = search;
        this.addTo = addTo;
        this.home = home;
        this.user = user;
    }
}
const spanish = new Language({ 
    trending: "Tendencias", 
    popular: "Populares", 
    categories: "Categorías",
    favorites: "Favoritos",
    relatedMovie:"Películas relacionadas",
    viewMore: "ver más",
    results: "Resultados",
    search: "Búsqueda",
    addTo:"Agrega a favoritos la película que te guste",
    home: "Inicio",
    user:"Usuario",
});
const german = new Language({ 
    trending: "Tendenzen", 
    popular: "Beliebt", 
    categories: "Kategorien",
    favorites: "Favoriten",
    relatedMovie:"verwandte filme",
    viewMore: "Mehr sehen",
    results:"Ergebnisse",
    search: "Suche",
    addTo:"Fügen Sie einen Film zu den Favoriten hinzu",
    home: "Anfang",
    user:"Nutzername",
});
const french = new Language({ 
    trending: "Les tendances", 
    popular: "Populaire", 
    categories: "Catégories",
    favorites: "Favoris",
    relatedMovie:"Films liés",
    viewMore: "Voir plus",
    results: "Résultats",
    search: "Recherche",
    addTo:"Ajouter un film aux favoris",
    home: "Début",
    user:"Nom d'utilisateur",
});
const english = new Language({ 
    trending: "Trending", 
    popular: "Popular", 
    categories: "Categories",
    favorites: "Favorites",
    relatedMovie:"Related Movies",
    viewMore: "view more",
    results: "Results",
    search: "search",
    addTo:"Add to favorite the movie you like",
    home: "Home",
    user:"User",
});