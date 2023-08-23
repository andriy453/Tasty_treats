import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import SlimSelect from '../../../node_modules/slim-select/src/slim-select';
import 'slim-select/dist/slimselect.css';

import { createGalleryCard } from './galleryCard';
import { axiosRecipes } from './axiosRecipes';
import { axiosCard } from './axiosCategories';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const categoriesRef = 'categories';
const areaRef = 'areas';
const ingredientsRef = 'ingredients';

const refs = {
  form: document.querySelector('.myForm'),
  categoriesEl: document.querySelector('.categories-list'),
  inputEl: document.querySelector('.input-filter'),
  timeEl: document.querySelector('.time-select'),
  areaEl: document.querySelector('.area-select'),
  ingredientsEl: document.querySelector('.ingredients-select'),
  ratingBackdrop: document.querySelector('.rating-backdrop'),
  gallery: document.querySelector('.gallery'),
  button1: document.querySelector('.btn-center1'),
  button2: document.querySelector('.btn-center2'),
  button3: document.querySelector('.btn-center3'),

  btn_right: document.querySelector('.btn-right'),
  btn_end: document.querySelector('.btn-right-end'),

  btn_start: document.querySelector('.btn-left1'),
  btn_left: document.querySelector('.btn-left'),

  btn_all_categories: document.querySelector('.btn-all-categories'),
  resetFilter: document.querySelector('.reset-filter'),
};
const axiosRecipesInstance = new axiosRecipes();
///////////////////////////// Додаємо option

axiosRecipesInstance.getFilteredData(categoriesRef).then(categories => {
  categories.forEach(category => {
    const liEl = document.createElement('li');
    liEl.textContent = category.name;
    liEl.setAttribute('value', category.name);
    liEl.classList.add('category-item');
    refs.categoriesEl.append(liEl);
  });
});

axiosRecipesInstance.getFilteredData(areaRef).then(areas => {
  areas.forEach(area => {
    const optionEl = document.createElement('option');
    optionEl.id = area._id;
    optionEl.value = area.name;
    optionEl.textContent = area.name;
    refs.areaEl.appendChild(optionEl);
  });
  const slimSelect = new SlimSelect({
    select: refs.areaEl,
  });
});

axiosRecipesInstance.getFilteredData(ingredientsRef).then(ingredients => {
  ingredients.forEach(ingredient => {
    const optionEl = document.createElement('option');
    optionEl.value = ingredient._id;
    optionEl.id = ingredient._id;
    optionEl.textContent = ingredient.name;
    refs.ingredientsEl.appendChild(optionEl);
  });
  const slimSelect = new SlimSelect({
    select: refs.ingredientsEl,
  });
});

function selectTime() {
  for (let i = 5; i <= 120; i += 5) {
    const optionEl = document.createElement('option');
    optionEl.textContent = [i];
    optionEl.value = [i];
    refs.timeEl.appendChild(optionEl);
  }
  const slimSelect = new SlimSelect({
    select: refs.timeEl,
  });
}
selectTime();

/////////////////////////Отримуємо обрані значення
let selectedCategoryId;
let selectedAreaId;
let selectedIngredientsId;
let selectedTimeId;
let inputValue;
let totalPages = 1;
let arayRecept;
let limitID;
let results = [];

let activeCategories;

refs.categoriesEl.addEventListener('click', handleCategory);
const axiosCardInstance = new axiosCard();
function handleCategory(e) {
  if (e.target.classList.contains('category-item')) {
    refs.btn_all_categories.classList.remove('active_all-categories');
    selectedCategoryId = e.target.getAttribute('value');
    axiosCardInstance.category = selectedCategoryId;
    axiosCardInstance.page = 1;

    showRecipes();

    if (activeCategories !== undefined) {
      activeCategories.classList.remove('active');
    }
  }
  activeCategories = e.target;
  e.target.classList.add('active');
}


refs.inputEl.addEventListener('input',debounce(handleInputEl,300) );

function handleInputEl(e) {
  inputValue = e.target.value.trim();
  axiosCardInstance.title = inputValue;
  console.log(inputValue);

  showRecipes();
}

refs.areaEl.addEventListener('change', handleArea);

function handleArea(e) {
  selectedAreaId = e.target.value;
  axiosCardInstance.area = selectedAreaId;

  console.log('areaId:', selectedAreaId);

  showRecipes();
}

refs.timeEl.addEventListener('change', handleTime);

function handleTime(e) {
  selectedTimeId = e.target.value;
  axiosCardInstance.time = selectedTimeId;
  arayRecept = selectedTimeId;
  //console.log('timeId:', selectedTimeId);
  showRecipes();
}

refs.ingredientsEl.addEventListener('change', handleIngredients);

function handleIngredients(e) {
  selectedIngredientsId = e.target.value;
  console.log(e.target.value);
  axiosCardInstance.ingredients = selectedIngredientsId;
  console.log('ingredientsId:', selectedIngredientsId);
  showRecipes();
}

/////////////////////////////Адаптив

if (window.screen.width >= 1280) {
  limitID = 9;
  axiosCardInstance.limit = limitID;
  arayRecept = limitID;
  showRecipesAdapt();
} else if (window.screen.width >= 768) {
  limitID = 8;
  axiosCardInstance.limit = limitID;
  arayRecept = limitID;
  showRecipesAdapt();
} else {
  showRecipesAdapt();
}

//////////////////////////Якщо рецептів не знайдено, або показати рецепти
function showRecipes() {
  axiosCardInstance.getCardData().then(data => {
    totalPages = data.totalPages;
    if (totalPages === null) {
      Notiflix.Notify.info("😪 We don't have recipes for your request!");
    }
    // results = data.results
    console.log('Обрані рецепти', data);
    totalPages = data.totalPages;
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
}
function showRecipesAdapt() {
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    totalPages = data.totalPages;
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
}

// pagination /////////////////////////// pagination/////////////////////////// pagination
refs.button1.addEventListener('click', e => {
  axiosCardInstance.page = 1;
  console.log('fffff');
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});

refs.button2.addEventListener('click', e => {
  console.log(totalPages);
  if (totalPages === 2) {
    return;
  } else {
    axiosCardInstance.page = e.currentTarget.innerText;

    axiosCardInstance.getCardData().then(data => {
      console.log('це рецепти', data);
      refs.gallery.innerHTML = createGalleryCard(data.results);
    });
  }
});
refs.button3.addEventListener('click', e => {
  console.log(totalPages);
  if (totalPages === 3) {
    return;
  }
  axiosCardInstance.page = e.currentTarget.innerText;

  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});

refs.btn_right.addEventListener('click', e => {
  console.log(totalPages);
  if (totalPages === axiosCardInstance.page) {
    return;
  }
  axiosCardInstance.page++;
  axiosCardInstance.getCardData().then(data => {
    totalPages = data.totalPages;
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});
refs.btn_end.addEventListener('click', e => {
  console.log(totalPages);

  axiosCardInstance.page = totalPages;
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});
refs.btn_left.addEventListener('click', e => {
  if (axiosCardInstance.page === 1) {
    return;
  }
  console.log('ffff')
  axiosCardInstance.page = axiosCardInstance.page--;
  console.log(axiosCardInstance.page--);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});

refs.btn_start.addEventListener('click', e => {
  axiosCardInstance.page = 1;
  console.log(axiosCardInstance.page);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML = createGalleryCard(data.results);
  });
});

// pagination/////////////////////////// pagination/////////////////////////// pagination

/////////////////////////////Cкинути фільтри
refs.resetFilter.addEventListener('click', resetAllFilters);

function resetAllFilters() {
  axiosCardInstance.category = selectedCategoryId;
  axiosCardInstance.area = null;
  axiosCardInstance.time = null;
  axiosCardInstance.ingredients = null;
  axiosCardInstance.title = null;


  console.log('resetAllFilters:', axiosCardInstance);
  showRecipesAdapt();
}

refs.btn_all_categories.addEventListener('click', displayAllCategories);

function displayAllCategories(e) {
  activeCategories = e.target;
  e.target.classList.add('active');
  axiosCardInstance.category = null;
  axiosCardInstance.time = selectedTimeId;
  axiosCardInstance.area = selectedAreaId;
  axiosCardInstance.ingredients = selectedIngredientsId;
  axiosCardInstance.title = inputValue;
  console.log('displayAllCategories:', axiosCardInstance);
  showRecipesAdapt();
  if (activeCategories === e.target) {
    activeCategories.classList.remove('active');
  }
  activeCategories = e.target;
  e.target.classList.add('active');
}

// function colorRating (searchResults){
//   const ratings = searchResults.flatMap(({ rating }) => rating);

//   if (ratings.length > 0){
//       initRatings();
//    }

//   function initRatings(){
//       let ratingActive, ratingValue;
//       for (let index = 0; index < ratings.length; index++){
//           const rating = ratings[index];
//           console.log(rating);
//           initRatingVars(rating);
//           setRatingActiveWidth(rating);
//       }

//       function initRatingVars(){
//           ratingActive = document.querySelector('.rating-active');
//           ratingValue = document.querySelector('.rating-value');
//        }

//        function setRatingActiveWidth(rating){
//           const ratingActiveWidth = rating / 0.05;
//           ratingActive.style.width = `${ratingActiveWidth}%`;
//        }
//   }

// }




///////////////////////////  ADD TO  FAVORITE ///////////////
const KEY_FAVORITE = 'favorite';
let favoriteArr = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

function fetchRecipeById(recipeId) {
  return fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).catch (error=>  console.error('Error:', error))

}

refs.gallery.addEventListener('click', addFavorite);

async function addFavorite(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  if (e.target.classList.contains('btn-heard')) {
    console.log('Add to favorites');
    const recipeId = e.target.id;
    console.log('recipeId:', recipeId);

    const inStorage = favoriteArr.some(({ _id }) => _id === recipeId); //якщо вже в локал сторажд
    if (inStorage) {
      favoriteArr = favoriteArr.filter(({ _id }) => _id !== recipeId);
      e.target.classList.remove('heart-icon-active');
      localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
      console.log('Updated Favorite Array:', favoriteArr);

      return;
    }
    try {
      const recipe = await fetchRecipeById(recipeId);

      favoriteArr.push(recipe);

      localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));

      console.log('Favorite Array:', favoriteArr);
      e.target.classList.add('heart-icon-active');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

refs.gallery.addEventListener('click', seeRecipe);

function seeRecipe(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }
  if (evt.target.innerText === 'See recipe') {
    const recipeId = evt.target.id;
    fetchRecipeById(recipeId)
      .then(res => {
        console.log(res);
        refs.ratingBackdrop.classList.toggle('visible');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}  

