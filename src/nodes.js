
const node = id => document.querySelector(id);//Se define una notación más sencilla

/*MAIN - MOBILE SEARCH BAR*/
const searchBar = node("#home-search");
/* TRENDING SECTION */
const trending = node("#trending");
const trendingCardsContainer = node(".trending__cards-container");
/* CATEGORY SECTION*/
const category = node("#categories");
/* SEARCHING SECTION*/
const searching = node("#searching");
/* MOVIE DETAIL SECTION */
const movieDetail = node("#movie-detail");
/*Buttons*/
const arrowBack = document.getElementsByClassName("section-arrow-icon");
const btn_search_mobile = node("#btn-search-Mobile");
const btn_search_desktop = node("#btn-search-Desktop");
/* Inputs */
const inputMobile = node("#home-search__input-mobile");
const inputDesktop = node("#home-search__input-desktop");

