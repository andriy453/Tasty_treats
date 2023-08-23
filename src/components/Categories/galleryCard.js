export function createGalleryCard(searchResults) {
  let markap;
  if (searchResults.length) {
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
  <button type="button" class="btn-see-recipe">See recipe</button>
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
  <button type="button" class="btn-heard" '>♡</button>
  </div>
  </div>
  </div>
  </div>`;
  }
  return markap;
}
