import { createGalleryCard } from './createGalleryCard.js';
const listFav = document.querySelector('.fav-recipe-card-list');
const categoriesConteiner = document.querySelector('.fav-category-block')
const btn_all_categories = document.querySelector('.btn-all-categori')

const KEY_FAVORITE = 'favorite';
const favoritesRxecipes = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];



const categoriesArray = favoritesRxecipes.map(recipe => {
  
    return recipe.category
});

createGalleryCard(favoritesRxecipes, listFav);
function categories(categories) {
    const SetCategories  = [...new Set(categories)];

    categoriesConteiner.insertAdjacentHTML('beforeend', SetCategories.map(name => {
    return `
          <button class="fav-category-fltr-btn" id='${name}' type="button">${name}</button>`;
  }).join('')) 
}
categories(categoriesArray);

listFav.addEventListener('click', remoteFavRecipe);
function remoteFavRecipe(e) {
  e.target.classList.add('heart-icon-active');
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  if (e.target.classList.contains('btn-heard')) {
    const recipeId = e.target.id;

    //видаляємо рецепти
    const updateFavRecipes = favoritesRxecipes.filter(
      recipe => recipe._id !== recipeId
    );
    e.target.classList.remove('heart-icon-active');
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(updateFavRecipes));
  }
}

categoriesConteiner.addEventListener('click',(e)=>{

    if (e.target.classList.contains('fav-category-fltr-btn')) {
        createGalleryCard(favoritesRxecipes.filter((res)=>res.category === e.target.id),listFav)
    }

})

btn_all_categories.addEventListener('click',(e)=>{
    console.log(favoritesRxecipes)
    createGalleryCard(favoritesRxecipes, listFav)
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
