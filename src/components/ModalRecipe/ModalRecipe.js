import { modalRatingOpCl } from '../Rating/Rating.js';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

function fetchRecipe(id) {
  return fetch(`${BASE_URL}${id}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
let favorites = [];

const backdropEl = document.querySelector('.backdrop-see');
const modalEl = document.querySelector('.modal_see');
const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', seeRecipe);

function seeRecipe(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }

  if (evt.target.innerText === 'See recipe') {
    let id = evt.target.id;

    fetchRecipe(id).then(obj => {
      modalEl.innerHTML = renderRecipe(obj);
      const closeModalBtn = document.querySelector('.close-modal');
      backdropEl.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
      closeModalBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', closoOnBackdrop);
      const favoriteBtn = document.querySelector('.js-favorite');
      const RatingeBtn = document.querySelector('.js-rating');

      if (
        JSON.parse(
          localStorage.getItem('favorite') &&
            JSON.parse(localStorage.getItem('favorite')).includes(id)
        )
      ) {
        favoriteBtn.textContent = 'Remove from favorites';
      }
      favoriteBtn.addEventListener('click', addFavorite);
      modalRatingOpCl(RatingeBtn);
    });
  }
}

const popular = document.querySelector('.popular');
popular.addEventListener('click', e => {
  let targetEl = e.target;
  let listItem = targetEl.closest('.photo-card_recipes');
  if (listItem) {
    console.log(listItem.id);
    fetchRecipe(listItem.id).then(obj => {
      modalEl.innerHTML = renderRecipe(obj);
      const closeModalBtn = document.querySelector('.close-modal');
      backdropEl.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
      closeModalBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', closoOnBackdrop);
      const favoriteBtn = document.querySelector('.js-favorite');
      const RatingeBtn = document.querySelector('.js-rating');
      modalRatingOpCl(RatingeBtn);
      console.log(RatingeBtn)
      RatingeBtn.addEventListener('click',()=>{
      document.querySelector('.rating-backdrop').classList.remove('visible')
  })
      if (
        JSON.parse(
          localStorage.getItem('favorite') &&JSON.parse(localStorage.getItem('favorite')).includes(id) )
      ) {
        favoriteBtn.textContent = 'Remove from favorites';
      }
      favoriteBtn.addEventListener('click', addFavorite);
    });
  
  }
  
});


function openModalRating() {
  backdropEl.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', closoOnBackdrop);
}
function closeModal() {
  backdropEl.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', closoOnBackdrop);
  document
    .getElementById('v1')
    .contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    );
}

window.onclick = function (event) {
  if (event.target === backdropEl) {
    backdropEl.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }
};

function closoOnBackdrop(e) {
  if (e.code === 'Escape') {
    closeModal();
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

function markupTags(arr) {
  if (arr.length) {
    return arr
      .map(item => {
        return `<li class="tag-item">#${item}</li>`;
      })
      .join('');
  }
  return;
}

function markupIngredientList(arr) {
  return arr
    .map(({ name, measure }) => {
      return `<li class="ingredient-item">
            <p class="ingredient-name">${name}</p>
            <p class="ingredient-value">${measure}</p>
          </li>`;
    })
    .join('');
}

const KEY_FAVORITE = 'favorite';
let favoriteArr = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

function fetchRecipeById(recipeId) {
  return fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.error('Error:', error));
}

async function addFavorite(e) {
  e.target.textContent = 'Add to favorite';
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
