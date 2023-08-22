import { createGalleryCard } from './createGalleryCard';
const listFav = document.querySelector('.fav-recipe-card-list');
const categoriesEl = document.querySelector('.fav-category-block');
const KEY_FAVORITE = 'favorite';
const favoritesRecipes = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

console.log(listFav);
console.log(categoriesEl);

const categoriesArray = favoritesRecipes.map(recipe => {
    return recipe.category
});

createGalleryCard(favoritesRecipes, listFav);
function categories(categories) {
  categoriesEl.innerHTML = categories
    .map(name => {
      return `
            <button class="fav-category-fltr-btn" type="button">${name}</button>`;
    })
    .join('');
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
    const updateFavRecipes = favoritesRecipes.filter(
      recipe => recipe._id !== recipeId
    );
    e.target.classList.remove('heart-icon-active');
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(updateFavRecipes));
  }
}

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
