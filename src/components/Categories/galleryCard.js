

export function createGalleryCard(searchResults) {
    const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
    const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="orange" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
    function generateStars(rating) {
    let stars = '';
    let roundedRating = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars += i < roundedRating ? starIconOrange : starIconGrey;
    }
    return stars;
    }
  
  let markap;
  if(searchResults.length) {
    markap = searchResults
      .map(({ preview, title, description, rating, _id }) => {
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
          <h3 class="text-title">${title}</h3>
          <p class="info-text">${text}</p>
          </div>
      </div>
      <button type="button" id='${_id}' class="btn-see-recipe">See recipe</button>
      <div class = "rating">
      <div class="rating-value">${rating.toString().slice(0,3)}</div>
      <div class="rating-body">${generateStars(rating)} </div>
      </div>
      <div class = "heard">
      <div class="heard-body">
      <div class="heard-active"></div>
      <div class="heard-items">
      <button type="button" class="btn-heard" id='${_id}'>♥</button>
      </div>
      </div>
      </div>
      </div>`;
      })
      .join('');
  } else {
    markap = `
  <div class="photo-card">
  <div class = "backdrop"></div>
      <img class="img-card" src="https://c4.wallpaperflare.com/wallpaper/107/689/166/empty-black-text-wallpaper-preview.jpg" alt="not found"/>
      <div class="info">
      <div class="info-text">
      <h3 class="info-item">not found</h3>
      <p class="info-text">not found</p>
      </div>
  </div>
  <button type="button" class="btn-see-recipe" disabled>See recipe</button>
  <div class = "rating">
  <div class="rating-value">not found</div>
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
  <button type="button" class="btn-heard" disabled>♥</button>
  </div>
  </div>
  </div>
  </div>`;
  }
  return markap;
}

