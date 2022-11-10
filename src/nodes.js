
const node = id => document.querySelector(id);//Se define una notación más sencilla

/*MAIN - MOBILE SEARCH BAR*/
const searchBar = node("#home-search");
/* TRENDING SECTION */
const trending = node("#trending");
const trendingCardsContainer = node(".trending__cards-container");
/* TRENDING LIST SECTION */
const trendingList = node("#trending-list");
const trendingCardsContainerList = node(".trending-list__cards-container");
/* POPULAR SECTION */
const popular = node("#popular");
const popularCardsContainer = node(".popular__cards-container");
/* POPULAR LIST SECTION */
const popularList = node("#popular-list");
const popularCardsContainerList = node(".popular__cards-container");
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
const btn_view_more = node("#trending__btn-view-more");
const btn_view_more2 = node("#popular__btn-view-more");
/* Inputs */
const inputMobile = node("#home-search__input-mobile");
const inputDesktop = node("#home-search__input-desktop");

