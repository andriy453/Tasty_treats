import { createGalleryCard } from './createGalleryCard.js';
import {addFavorite}  from '../ModalRecipe/ModalRecipe.js'
import {closeModal}  from '../ModalRecipe/ModalRecipe.js'
import {closoOnBackdrop}  from '../ModalRecipe/ModalRecipe.js'
import { modalRatingOpCl } from '../Rating/Rating.js';

// import  fetchRecipe  from '../Rating/Rating.js';
import { renderRecipe } from '../Rating/Rating.js';

const listFav = document.querySelector('.fav-recipe-card-list');
const categoriesConteiner = document.querySelector('.fav-category-block');
const btn_heard = document.querySelector('.btn-heard');
const btn_conteiner_pagination = document.querySelector(
  '.button-style-favorites'
);

const refs = {
  all_categorie: document.querySelector('.btn-all-categori'),
  button1: document.querySelector('.btn-center1'),
  button2: document.querySelector('.btn-center2'),
  button3: document.querySelector('.btn-center3'),
  categories_btn: document.querySelector('fav-category-fltr-btn'),

  btn_right: document.querySelector('.btn-right'),
  btn_end: document.querySelector('.btn-right-end'),

  btn_start: document.querySelector('.btn-left'),
  btn_left: document.querySelector('.btn-left1'),
};
const KEY_FAVORITE = 'favorite';

const favoritesRecipes = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

const categoriesArray = favoritesRecipes.map(recipe => {
  return recipe.category;
});

createGalleryCard(favoritesRecipes, listFav);

function categories(categories) {
  const SetCategories = [...new Set(categories)];
  const  UpdatedCAr = SetCategories.map(name => {return `<button class="fav-category-fltr-btn" id='${name}' type="button">${name}</button>`}).join('');
  const all_categorieUpdate = () => {
    if(SetCategories.length){
      return `<button class="btn-all-categori  active_all-categories" type="button">All categories</button>${UpdatedCAr}`
    }else{
    return '';
    }
  }
  categoriesConteiner.innerHTML = all_categorieUpdate() ;
}
categories(categoriesArray);

listFav.addEventListener('click', remoteFavRecipe);

function remoteFavRecipe(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  if (e.target.classList.contains('btn-heard')) {
    e.target.classList.remove('btn-heard');
    e.target.classList.add('btn-heard-noactiv');
    const recipeId = e.target.id;

    // Видаляємо рецепт з масиву favoritesRecipes

    const Updated =  favoritesRecipes.findIndex(recipe => recipe._id === recipeId);
    console.log(Updated)
    favoritesRecipes.splice(Updated,1)
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoritesRecipes))



    categories(favoritesRecipes.map(recipe => {return recipe.category;}));

    if (window.screen.width >= 768) {
      createGalleryCard(favoritesRecipes.slice(0, 12), listFav)
      if( favoritesRecipes.length <= 12){
        btn_conteiner_pagination.style.display = 'none';
      }
    }else{
      if( favoritesRecipes.length <= 9){
        createGalleryCard(favoritesRecipes.slice(0, 9), listFav)
        btn_conteiner_pagination.style.display = 'none';
      }
    }

 
    // refreshPage();
  }
  
}

//оновлювати сторінку кожен раз, щоб видалялись рецепти з favorites
function refreshPage() {
  location.reload();
}

let activeCategories;
categoriesConteiner.addEventListener('click', e => {
  if (e.target.classList.contains('fav-category-fltr-btn')) {
    document
      .querySelector('.btn-all-categori ')
      .classList.remove('active_all-categories');


        if( favoritesRecipes.filter(res => res.category === e.target.id).slice(0, 12).length <= 12){
          btn_conteiner_pagination.style.display = 'none';
        } if  ( favoritesRecipes.filter(res => res.category === e.target.id).length > 12){
          btn_conteiner_pagination.style.display = 'block';
          array =  favoritesRecipes.filter(res => res.category === e.target.id)
        }
      
    createGalleryCard(favoritesRecipes.filter(res => res.category === e.target.id).slice(0, 12),listFav);

    if (activeCategories !== undefined) {
      activeCategories.classList.remove('active_btn');
    }
    activeCategories = e.target;
    e.target.classList.add('active_btn');
  }
  if (e.target.classList.contains('btn-all-categori')) {

    if( favoritesRecipes.length <= 12){
      btn_conteiner_pagination.style.display = 'block';
      array = favoritesRecipes;
    }
    refreshPage();
    createGalleryCard( favoritesRecipes.slice(0, 12),listFav, listFav);
  }
});
if(refs.all_categorie){
    refs.all_categorie.addEventListener('click', e => {
    e.target.classList.add('active_all-categories');
    activeCategories.classList.remove('active_btn');
  });
}


listFav.addEventListener('click', seeRecipe);
function seeRecipe(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }
  evt.target.classList.toggle('bnt');
}

/////////////////////////////Адаптив
let limit;
let array;
array = favoritesRecipes;
if (window.screen.width >= 768) {
  limit = array.slice(0, 12);
  if (array.length >= 12) {
    btn_conteiner_pagination.style.display = 'flex';
    // pagination /////////////////////////// pagination/////////////////////////// pagination
    let prev_state = 0;
    let step_state = 12;
    refs.button1.addEventListener('click', e => {
      limit = array.slice(0, 12);
      createGalleryCard(limit, listFav);
    });
  
    refs.button2.addEventListener('click', e => {
      prev_state = 12;
      step_state = 24;
      limit = array.slice(12, 24);
      createGalleryCard(limit, listFav);
    });
    refs.button3.addEventListener('click', e => {
      prev_state = 24;
      step_state = 36;
      limit = array.slice(24, 36);
      createGalleryCard(limit, listFav);
    });
  
    refs.btn_right.addEventListener('click', e => {
      prev_state += 12;
      step_state += 12;
      if (step_state > array.length + 11) {
        prev_state -= 12;
        step_state -= 12;
        return;
      }
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
    });
    refs.btn_end.addEventListener('click', e => {
      prev_state = array.length - 12;
      step_state = array.length;
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
  
    });
    refs.btn_left.addEventListener('click', e => {
      if (prev_state === 0) {
        return;
      }
      prev_state -= 12;
      step_state -= 12;
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
    });
  
    refs.btn_start.addEventListener('click', e => {
      prev_state = 0;
      step_state = 12;
      limit = array.slice(0, 12);
      createGalleryCard(limit, listFav);
    });
  }

  createGalleryCard(limit, listFav);
} else {
  limit = array.slice(0, 9);
  if (array.length >= 9) {
    btn_conteiner_pagination.style.display = 'flex';


    let prev_state = 0;
    let step_state = 9;
    refs.button1.addEventListener('click', e => {
      limit = array.slice(0, 9);
      createGalleryCard(limit, listFav);
    });
  
    refs.button2.addEventListener('click', e => {
      prev_state = 18;
      step_state = 27;
      limit = array.slice(12, 24);
      createGalleryCard(limit, listFav);
    });
    refs.button3.addEventListener('click', e => {
      prev_state = 36;
      step_state = 45;
      limit = array.slice(24, 36);
      createGalleryCard(limit, listFav);
    });
  
    refs.btn_right.addEventListener('click', e => {
      prev_state += 9;
      step_state +=9;
      if (step_state > array.length + 8) {
        prev_state -= 9;
        step_state -= 9;
        return;
      }
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
    });
    refs.btn_end.addEventListener('click', e => {
      prev_state = array.length - 9;
      step_state = array.length;
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
  
    });
    refs.btn_left.addEventListener('click', e => {
      if (prev_state === 0) {
        return;
      }
      prev_state -= 9;
      step_state -= 9;
      limit = array.slice(prev_state, step_state);
      createGalleryCard(limit, listFav);
    });
  
    refs.btn_start.addEventListener('click', e => {
      prev_state = 0;
      step_state = 9;
      limit = array.slice(0, 9);
      createGalleryCard(limit, listFav);
    });
  }

  createGalleryCard(limit, listFav);
}



  // pagination/////////////////////////// pagination/////////////////////////// pagination
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';
  async function  fetchRecipe(id) {
    return fetch(`${BASE_URL}${id}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();

    });
  }


document.querySelector('.scrollable-list-fav').style.display = 'none';
if( JSON.parse(localStorage.getItem(KEY_FAVORITE)) !== null){
  document.querySelector('.scrollable-list-fav').style.display ='block';
 }
  if ( favoritesRecipes === undefined) {
   console.log( JSON.parse(localStorage.getItem(KEY_FAVORITE)))
 }
 const gallery = document.querySelector('.gallery');

 if(gallery){
  gallery.addEventListener('click', seeRecipe);
 }

 const backdropEl = document.querySelector('.backdrop-see');
 const modalEl = document.querySelector('.modal_see');
function seeRecipe(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }

  if (evt.target.innerText === 'See recipe') {
    let id = evt.target.id;

    fetchRecipe(id).then(obj => {
      const favoriteBtn = document.querySelector('.js-favorite');
      favoriteBtn.textContent = 'Remove from favorites';
      modalEl.innerHTML = renderRecipe(obj);
      const closeModalBtn = document.querySelector('.close-modal');
      backdropEl.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
      closeModalBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', closoOnBackdrop);
      const RatingeBtn = document.querySelector('.js-rating');


      if (JSON.parse(localStorage.getItem('favorite') &&JSON.parse(localStorage.getItem('favorite')).includes(id))) {
 
      }
      favoriteBtn.addEventListener('click', addFavorite);
      createGalleryCard( JSON.parse(localStorage.getItem('favorite')), listFav);
      // modalRatingOpCl(RatingeBtn);
    });
  }
}



function renderRecipe({
  _id,
  title,
  rating,
  time,
  instructions,
  youtube,
  tags,
  ingredients,
}) {
  return `
      <button type="button" class="close-modal">
      <svg class="close-sv_g" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#eea10c">
      <path d="M15 5L5 15" stroke="#050505" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 5L15 15" stroke="#050505" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
              </button>
              <div class="modal__video">
              <iframe poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640" class="frame-video" width="100%" height="100%" src="https://www.youtube.com/embed/${youtube.slice(
                youtube.lastIndexOf('=') + 1
              )}?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='v1'></iframe></div>
              <h2 class="modal__title">${title}</h2>
              <div class="rating-modal-re">
              <p class="rating-value">${rating}</p>
              <div class="rating-body">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#F8F8F8" fill-opacity="0.1"/>
            </svg>
              </div>
              <p class="time">${time} min</p>
          </div>
              <ul class="ingredient-list">
              ${markupIngredientList(ingredients)}
              </ul>
              <div class="info-bar">
                  <ul class="tag-list">
                  ${markupTags(tags)}
                  </ul>
              </div>
              <div class="recipe">
                  <p class="instructions">
                  ${instructions}
                  </p>
              </div>
              <div class="modal-buttons">
                  <button type="button" class="modal-button color js-favorite " id=${_id}>Add to favorite</button>
                  <button type="button" class="modal-button js-rating" id=${_id}>Give a rating</button>
              </div>`;
}