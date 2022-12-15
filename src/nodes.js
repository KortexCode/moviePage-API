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
const popularCardsContainerList = node(".popular-list__cards-container");
/* FAVORITE SECTION */
const favorite = node("#favorite");
const favoriteCardContainer = node(".favorite__cards-container")
/* CATEGORY SECTION*/
const category = node("#categories");
/* SEARCHING SECTION*/
const searching = node("#searching");
/* MOVIE DETAIL SECTION */
const movieDetail = node("#movie-detail");

/* MENUS */
const menu = node("#dropdown-items-container");
const menuMobile = node("#dropdown-mobile-items");

/*Buttons*/
const languageSelector = node("#select-language");
const arrowBack = document.getElementsByClassName("section-arrow-icon");
const btn_search_mobile = node("#btn-search-Mobile");
const btn_search_desktop = node("#btn-search-Desktop");
const btn_view_more = node("#trending__btn-view-more");
const btn_view_more2 = node("#popular__btn-view-more");
const tagbar_btnHome = node("#mobile-tag-bar__btn-home");
const header_btnHome = node("#header-navbar__btn-home");
const scrollTop = node("#scroll-button");
/* Inputs */
const inputMobile = node("#home-search__input-mobile");
const inputDesktop = node("#home-search__input-desktop");

/* TEXTOS */
const trendingTitle =  node("#trending-title");
const popularTitle = node("#popular-title");
const favoriteTitle = node("#favorite-title");
const trendingListTitle = node("#trending-list-title");
const popularListTitle = node("#popular-list-title");
const resultsTitle = node("#results-title");
const relatedTitle = node("#related-title");
const viewMoreTrending = node("#trending__btn-view-more");
const viewMorePopular = node("#popular__btn-view-more");
const homeTitle = node("#header-navbar__btn-home");
const userTitle = node("#header-navbar__btn-user");
const searchTitle = node("#btn-search-Desktop");
const categoryDropdownDesktop = node("#category-dropdown__desktop");
const categoryDropdownMobile = node("#category-dropdown__mobile");


