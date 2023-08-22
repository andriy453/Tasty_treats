
const list  = document.querySelector('.fav-recipe-card-list')
const categoriesEl = document.querySelector('.fav-category-block')

 const  cart = JSON.parse(localStorage.getItem('favoris')) ?? [];
const categoriesArray  = cart.map((car)=> car.category )


function createGalleryCard(searchResults) {
    let markap;
    if(searchResults.length){
        markap  =  searchResults.map(({ preview, title, description, rating, _id }) => {
          const desktop = description.slice(0, 62);
          const mobile = description.slice(0, 97);
          let text = mobile + '...';
          if (window.screen.width >= 768) {
            text = desktop + '...';
          }
          return `<div class="photo-card">
        <div class = "backdrop"></div>
            <img class="img-card" src="${preview}" alt="${title}"/>
            <div class="info">
            <div class="info-text">
            <h3 class="info-item">${title}</h3>
            <p class="info-text">${text}</p>
            </div>
        </div>
        <button type="button" id='${_id}' class="btn-see-recipe">See recipe</button>
        <div class = "rating">
        <div class="rating-value">${rating}</div>
        <div class="rating-body">
        <div class="rating-active"></div>
        <div class="rating-items">
        <input type = "radio" class="rating-item" value="1" name="rating" >
        <input type = "radio" class="rating-item" value="2" name="rating" >
        <input type = "radio" class="rating-item" value="3" name="rating" >
        <input type = "radio" class="rating-item" value="4" name="rating" >
        <input type = "radio" class="rating-item" value="5" name="rating" >
        </div>
        </div>
        </div>
        <div class = "heard">
        <div class="heard-body">
        <div class="heard-active"></div>
        <div class="heard-items">
        <button type="button" class="btn-heard" id='${_id}'>♡</button>
        </div>
        </div>
        </div>
        </div>`;
        })
        .join('');
    }
    else{
        markap = `
        <div class="block-for-empty">
        <svg class="recipe-icon-pic" width="68" height="58">
        <use href="./images/sprite.svg#icon-elements"></use>
      </svg>
      <p class="message-for-empty">
        It appears that you haven't added any recipes to your favorites yet.
        To get started, you can add recipes that you like to your favorites
        for easier access in the future.
      </p>
        </div>`
    }
    list.innerHTML = markap;
      }
  
  
      createGalleryCard(cart)
      function categories(categories) {
        categoriesEl.innerHTML =  categories.map((name)=> {
            return `
            <button class="fav-category-fltr-btn" type="button">${name}</button>`
}).join('');
}

categories(categoriesArray);

    list.addEventListener('click',seeRecipe)
function seeRecipe(evt){
  if(evt.target.tagName !== 'BUTTON'){
 return
  }

if(evt.target.innerText === '♡'){

console.log(evt.target.innerText)
}

  if(evt.target.innerText === 'See recipe'){
    console.log(evt.target.innerText)

  }
  evt.target.classList.toggle('bnt');
}

      



 
