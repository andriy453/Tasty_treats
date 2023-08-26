import { modalRatingOpCl } from '../Rating/Rating.js';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

 export async function  fetchRecipe(id) {
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

      if (JSON.parse(localStorage.getItem('favorite') &&JSON.parse(localStorage.getItem('favorite')).includes(id))) {
        favoriteBtn.textContent = 'Remove from favorites';
      }
      favoriteBtn.addEventListener('click', addFavorite);
      // modalRatingOpCl(RatingeBtn);
    });
  }
}

const popular = document.querySelector('.popular');
if(popular){
  popular.addEventListener('click', e => {
    let targetEl = e.target;
    let listItem = targetEl.closest('.photo-card_recipes');
    if (listItem) {
      fetchRecipe(listItem.id).then(obj => {
        modalEl.innerHTML = renderRecipe(obj);
        const closeModalBtn = document.querySelector('.close-modal');
        backdropEl.classList.remove('is-hidden');
        document.body.classList.add('no-scroll');
        closeModalBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', closoOnBackdrop);
        const favoriteBtn = document.querySelector('.js-favorite');
        const RatingeBtn = document.querySelector('.js-rating');
        favoriteBtn.addEventListener('click', addFavorite);
        RatingeBtn.addEventListener('click',()=>{
        document.querySelector('.rating-backdrop').classList.remove('visible')
     
        modalRatingOpCl(RatingeBtn);
    })
        if (JSON.parse(localStorage.getItem('favorite') &&JSON.parse(localStorage.getItem('favorite')).includes(listItem.id) )) {
         console.log('gggg') }
      }).catch(error => {
        modalEl.innerHTML = `<p>${error}</p>`;
        const closeBtn = document.querySelector('.close-modal');
        backdropEl.classList.remove('is-hidden');
        document.body.classList.add('no-scroll');
        closeBtn.addEventListener('click', closeError);
        backdropEl.addEventListener('click', closeOnEscapeError);
        document.addEventListener('keydown', closeOnBackdropError);
      });
  
    }
  });
}




function openModalRating() {
  backdropEl.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', closoOnBackdrop);
}
export function closeModal() {
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

export function closoOnBackdrop(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}



const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="rgba(5, 5, 5, 0.10)"; d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="#EEA10C" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const playIcon = `<svg class="play-icon" viewBox="0 0 38 27">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.9998 0.333374C18.9999 0.333374 19 0.333374 19 1.33337L18.9999 2.33337L18.8792 2.33355C18.7995 2.33373 18.682 2.33408 18.5313 2.33479C18.2298 2.3362 17.7957 2.33903 17.266 2.3447C16.2063 2.35603 14.7662 2.3787 13.2426 2.42397C11.7173 2.4693 10.1164 2.53706 8.73256 2.63799C7.32642 2.74055 6.22768 2.87233 5.64862 3.0259C5.07533 3.18941 4.55503 3.50072 4.13989 3.92869C3.7304 4.35085 3.43748 4.87184 3.28949 5.44069C2.80616 8.13302 2.56977 10.8639 2.58329 13.5993L2.58335 13.6105C2.56608 16.3609 2.8014 19.107 3.28647 21.8142C3.44981 22.3593 3.74735 22.8549 4.15213 23.2555C4.56728 23.6664 5.08121 23.9634 5.64442 24.1181C6.22236 24.2721 7.32301 24.4043 8.73256 24.5071C10.1164 24.608 11.7173 24.6758 13.2426 24.7211C14.7662 24.7664 16.2063 24.7891 17.266 24.8004C17.7957 24.8061 18.2298 24.8089 18.5313 24.8103C18.682 24.811 18.7995 24.8114 18.8792 24.8115L18.9996 24.8117L19 25.8117C19 26.8117 18.9999 26.8117 18.9998 26.8117L18.8748 26.8115C18.7935 26.8113 18.6743 26.811 18.5219 26.8103C18.217 26.8088 17.7788 26.806 17.2446 26.8003C16.1767 26.7888 14.7233 26.766 13.1832 26.7202C11.6447 26.6745 10.0117 26.6057 8.58707 26.5018C7.19042 26.3999 5.90942 26.2592 5.12494 26.0494L5.11938 26.0479C4.22329 25.8027 3.40558 25.3306 2.74526 24.6771C2.08494 24.0236 1.60434 23.2108 1.34988 22.3173C1.34084 22.2855 1.33338 22.2534 1.32752 22.2209C0.814626 19.3775 0.565492 16.4928 0.583287 13.6035C0.569461 10.7359 0.818577 7.87305 1.32751 5.0509C1.33146 5.02897 1.33615 5.00718 1.34156 4.98557C1.57237 4.06342 2.04245 3.21851 2.70431 2.53618C3.36617 1.85385 4.19637 1.35826 5.11107 1.09948L5.12494 1.09566C5.90942 0.885856 7.19042 0.745159 8.58707 0.643289C10.0117 0.53938 11.6447 0.470575 13.1832 0.424857C14.7233 0.379092 16.1767 0.356236 17.2446 0.344811C17.7788 0.339097 18.217 0.336238 18.5219 0.334808C18.6743 0.334092 18.7935 0.333734 18.8748 0.333554L18.9998 0.333374ZM32.3513 24.1192C31.7723 24.2728 30.6735 24.4045 29.2674 24.5071C27.8835 24.608 26.2826 24.6758 24.7573 24.7211C23.2337 24.7664 21.7936 24.7891 20.7339 24.8004C20.2043 24.8061 19.7701 24.8089 19.4687 24.8103C19.3179 24.811 19.2004 24.8114 19.1208 24.8115L18.9996 24.8117L19 25.8117C19 26.8117 18.9999 26.8117 18.9998 26.8117L19.1252 26.8115C19.2064 26.8113 19.3256 26.811 19.478 26.8103C19.783 26.8088 20.2211 26.806 20.7553 26.8003C21.8232 26.7888 23.2766 26.766 24.8168 26.7202C26.3553 26.6745 27.9883 26.6057 29.4129 26.5018C30.8095 26.3999 32.0905 26.2592 32.875 26.0494L32.8889 26.0456C33.8036 25.7868 34.6338 25.2912 35.2956 24.6089C35.9575 23.9266 36.4276 23.0817 36.6584 22.1595C36.6638 22.1379 36.6685 22.1161 36.6724 22.0942C37.1775 19.2931 37.4266 16.4519 37.4166 13.6057C37.4345 10.7162 37.1854 7.83122 36.6724 4.98753C36.6685 4.96561 36.6638 4.94384 36.6584 4.92223C36.4276 4.00008 35.9575 3.15517 35.2956 2.47284C34.6338 1.79051 33.8036 1.29493 32.8889 1.03614C32.8772 1.03286 32.8656 1.02978 32.8538 1.02692C32.0773 0.837292 30.8036 0.709165 29.4066 0.616131C27.9837 0.521374 26.3521 0.458594 24.8142 0.416867C23.2748 0.375101 21.8219 0.35424 20.7544 0.343812C20.2204 0.338597 19.7824 0.335988 19.4776 0.334682C19.3252 0.334029 19.2061 0.333702 19.125 0.333538L18.9998 0.333374C18.9999 0.333374 19 0.333374 19 1.33337L18.9999 2.33337L19.1209 2.33353C19.2007 2.3337 19.3183 2.33402 19.4691 2.33466C19.7707 2.33596 20.205 2.33854 20.7348 2.34372C21.7949 2.35407 23.2356 2.37477 24.7599 2.41613C26.2858 2.45753 27.8881 2.51944 29.2737 2.61171C30.671 2.70477 31.7721 2.82453 32.3617 2.96555C32.9309 3.12984 33.4474 3.43997 33.86 3.86536C34.2695 4.28753 34.5625 4.80853 34.7105 5.3774C35.1976 8.09007 35.434 10.8419 35.4166 13.5979L35.4166 13.6078C35.4264 16.3225 35.19 19.0324 34.7104 21.7044C34.5625 22.2732 34.2695 22.7942 33.86 23.2164C33.4449 23.6444 32.9246 23.9557 32.3513 24.1192Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9347 7.56224C15.2425 7.38319 15.6223 7.38133 15.9318 7.55737L25.036 12.7349C25.3486 12.9126 25.5417 13.2445 25.5417 13.6041C25.5417 13.9637 25.3486 14.2956 25.036 14.4734L15.9318 19.6509C15.6223 19.8269 15.2425 19.8251 14.9347 19.646C14.6269 19.467 14.4375 19.1377 14.4375 18.7816V8.42664C14.4375 8.07053 14.6269 7.7413 14.9347 7.56224ZM16.4375 10.1457V17.0625L22.5188 13.6041L16.4375 10.1457Z"/>
</svg>`;

export function renderRecipe({
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
              <iframe poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640" class="frame-video" width="100%" height="100%" src="https://www.youtube.com/embed/${youtube.slice( youtube.lastIndexOf('=') + 1)}?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='v1'></iframe></div>
              <h2 class="modal__title">${title}</h2>
              <div class="rating-modal-re">
              <p class="rating-value">${rating}</p>
              <div class="rating-body"></div>
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

 export async function addFavorite(e) {
  e.target.textContent = 'Remove from favorites';
  const recipeId = e.target.id;
  const inStorage = favoriteArr.some(({ _id }) => _id === recipeId); //якщо вже в локал сторажд
  if (inStorage) {
    favoriteArr = favoriteArr.filter(({ _id }) => _id !== recipeId);
    e.target.classList.remove('heart-icon-active');
    e.target.textContent = 'Add to favorite';
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
    return;
  }
  try {
    const recipe = await fetchRecipeById(recipeId);
    favoriteArr.push(recipe);
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
    e.target.classList.add('heart-icon-active');
  } catch (error) {
    console.error('Error:', error);
  }
}
