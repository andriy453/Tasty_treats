export function  createGalleryCard(searchResults){
    if(searchResults === []){
     console.log('fdsvds')
    }
    else{
      return searchResults.map(({ preview, title, description}) => {
        const desktop = description.slice(0,62)
         const mobile  = description.slice(0,97)
        let text = mobile + '...';
        if(window.screen.width >= 768){
            text = desktop + '...'
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
        <button type="button" class="btn-see-recipe">See recipe</button>
        </div>`
    }).join('');
    }}
