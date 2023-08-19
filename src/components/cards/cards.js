import {fetchImages} from './services/service-api';
import './css/styles.scss';


const refs ={
    searchForm:document.querySelector('.search-form'),
    submitBtn:document.querySelector('.submit'),
    gallery:document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('.load-more'),
}
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes?limit=9&rating=3';
fetch(`${BASE_URL}`).then((response)=> response.json()).then(data => {
        console.log(data);

        const searchResults = data.results;
        console.log(searchResults);

        createGalleryCard(searchResults);
        refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(searchResults));
      })

      function createGalleryCard(searchResults){
        return searchResults.map(({ preview, title, description}) => {
            const desktop = description.slice(0,62)
             const mobile  = description.slice(0,97)
            let text = mobile + '...';
            if(window.screen.width >= 768){
                text = desktop + '...'
            }
            return `<div class="photo-card">
            <div class = "backdrop"></div>
                <img src="${preview}" alt="${title}"/>
                <div class="info">
                <div class="info-text">
                <h3 class="info-item">${title}</h3>
                <p class="info-text">${text}</p>
                </div>
            </div>
            <button type="button" class="btn-see-recipe">See recipe</button>
            </div>`
        }).join('');
    }

    