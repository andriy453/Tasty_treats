import { createGalleryCard } from './createGalleryCard.js';
const listFav = document.querySelector('.fav-recipe-card-list');
const categoriesConteiner = document.querySelector('.fav-category-block')
const btn_all_categories = document.querySelector('.btn-all-categori')
const btn_heard = document.querySelector('.btn-heard')

const KEY_FAVORITE = 'favorite';
const favoritesRxecipes = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

   

const categoriesArray = favoritesRxecipes.map(recipe => {

    return recipe.category
});

createGalleryCard(favoritesRxecipes, listFav);
function categories(categories) {
    const SetCategories  = [...new Set(categories)];

    categoriesConteiner.insertAdjacentHTML('afterbegin','<button class="btn-all-categori  active_all-categories" type="button">All categories</button>')
    categoriesConteiner.insertAdjacentHTML('beforeend', SetCategories.map(name => {
    return `
          <button class="fav-category-fltr-btn" id='${name}' type="button">${name}</button>`;
  }).join('')) 
}
categories(categoriesArray)

listFav.addEventListener('click', remoteFavRecipe);
function remoteFavRecipe(e) {

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  if (e.target.classList.contains('btn-heard')) {
    e.target.classList.remove('btn-heard');
    e.target.classList.add('btn-heard-noectiv')
    const recipeId = e.target.id;
    console.log('gggg')
    console.log(btn_heard)
    // btn_heard.classList.toggle('btn-heard-noectiv')
    //видаляємо рецепти
    const updateFavRecipes = favoritesRxecipes.filter(
      recipe => recipe._id !== recipeId
    );
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(updateFavRecipes));

  }
}

categoriesConteiner.addEventListener('click',(e)=>{

    if (e.target.classList.contains('fav-category-fltr-btn')) {
        createGalleryCard(favoritesRxecipes.filter((res)=>res.category === e.target.id),listFav)
    }
    if (e.target.classList.contains('btn-all-categori')) {
        createGalleryCard(favoritesRxecipes, listFav)
    }

})


listFav.addEventListener('click', seeRecipe);
function seeRecipe(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }

  if (evt.target.innerText === 'See recipe') {
    console.log(evt.target.innerText);
  }
  evt.target.classList.toggle('bnt');
}

/////////////////////////////Адаптив
let limit;
 if (window.screen.width >= 768) {

  limit = favoritesRxecipes.slice(1, 13) 
  createGalleryCard(limit, listFav)
} else {

  limit = favoritesRxecipes.slice(1, 10)
  createGalleryCard(limit, listFav)
}