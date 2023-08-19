import {fetchImages} from './services/service-api';
import './css/card.css';
console.log(fetchImages());

const refs ={
    searchForm:document.querySelector('.search-form'),
    submitBtn:document.querySelector('.submit'),
    gallery:document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('.load-more'),
}

fetchImages()
      .then(data => {
        console.log(data);

        const searchResults = data.results;
        console.log(searchResults);

        createGalleryCard(searchResults);
        refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(searchResults));
      })

      function createGalleryCard(searchResults){
        return searchResults.map(({ preview, title, description}) => {
            return `<div class="photo-card">
            <div class = "backdrop"></div>
                <div class="img_wrap">
                    <img src="${preview}" alt="${title}"/>
                </div>
                <div class="info">
                <div class="info-text">
                <p class="info-item">${title}</p>
                <p class="info-text">${description}</p>
                </div>
            </div>

            <button type="button" class="btn-see-recipe">See recipe</button>
            </div>`
        }).join('');
    }
    