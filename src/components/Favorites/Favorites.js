import { createGalleryCard } from './createGalleryCard.js';
const listFav = document.querySelector('.fav-recipe-card-list');
const categoriesConteiner = document.querySelector('.fav-category-block')
const btn_all_categories = document.querySelector('.btn-all-categori')
const btn_heard = document.querySelector('.btn-heard')

const btn_conteiner_pagination = document.querySelector('.button-style-favorites')

const  refs =  {
  button1: document.querySelector('.btn-center1'),
  button2: document.querySelector('.btn-center2'),
  button3: document.querySelector('.btn-center3'),

  btn_right: document.querySelector('.btn-right'),
  btn_end: document.querySelector('.btn-right-end'),

  btn_start: document.querySelector('.btn-left'),
  btn_left: document.querySelector('.btn-left1'),
}
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
console.log(favoritesRxecipes.length)
  limit = favoritesRxecipes.slice(0, 12) 
  createGalleryCard(limit, listFav)
} else {

  limit = favoritesRxecipes.slice(0, 9)
  createGalleryCard(limit, listFav)
}

if(  favoritesRxecipes.length >= 12){
btn_conteiner_pagination.style.display = 'flex';
// pagination /////////////////////////// pagination/////////////////////////// pagination
let prev_state = 0;
let step_state = 12;
refs.button1.addEventListener('click', e => {
  limit
  createGalleryCard(limit, listFav)
});

refs.button2.addEventListener('click', e => {
    limit = favoritesRxecipes.slice(12, 24) 
    createGalleryCard(limit, listFav)
  
});
refs.button3.addEventListener('click', e => {
  limit = favoritesRxecipes.slice(24,36) 
  createGalleryCard(limit, listFav)
});

refs.btn_right.addEventListener('click', e => {
  prev_state+=12
  step_state+=12
  if(    step_state > favoritesRxecipes.length+11 ){
    prev_state-=12
    step_state-=12
    return
  }
  limit = favoritesRxecipes.slice(prev_state, step_state) 
  createGalleryCard(limit, listFav)
});
refs.btn_end.addEventListener('click', e => {
  console.log(favoritesRxecipes.length)
  console.log(favoritesRxecipes.length-12)
  prev_state=favoritesRxecipes.length-12;
  step_state=favoritesRxecipes.length
  limit = favoritesRxecipes.slice(prev_state, step_state) 
  createGalleryCard(limit, listFav)
});
refs.btn_left.addEventListener('click', e => {
  if( prev_state === 0){
return
  }
  prev_state-=12
  step_state-=12
  limit = favoritesRxecipes.slice(prev_state, step_state) 
  createGalleryCard(limit, listFav)
});

refs.btn_start.addEventListener('click', e => {
  prev_state = 0
  step_state = 12
  limit = favoritesRxecipes.slice(prev_state, step_state) 
  createGalleryCard(limit, listFav)
});

// pagination/////////////////////////// pagination/////////////////////////// pagination
}