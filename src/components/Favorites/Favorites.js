import { createGalleryCard } from './createGalleryCard.js';
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

console.log(SetCategories)
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
    console.log('ffff')
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
          console.log( favoritesRecipes.filter(res => res.category === e.target.id))
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

document.querySelector('.btn-all-categori').addEventListener('click', e => {
  e.target.classList.add('active_all-categories');
  activeCategories.classList.remove('active_btn');
});

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
      console.log(array.length);
      console.log(array.length - 12);
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
      console.log(array.length);
      console.log(array.length - 9);
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


document.querySelector('.scrollable-list-fav').style.display = 'none';
if( JSON.parse(localStorage.getItem(KEY_FAVORITE)) !== null){
  document.querySelector('.scrollable-list-fav').style.display ='block';
 }
  if ( favoritesRecipes === undefined) {
   console.log( JSON.parse(localStorage.getItem(KEY_FAVORITE)))
 }

 

