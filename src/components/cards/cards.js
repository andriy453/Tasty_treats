import {fetchImages} from './services/service-api';
import './css/styles.scss';


const refs ={
    gallery:document.querySelector('.gallery'),
}


const offsetWidth = document.getElementById('container').offsetWidth;

let page = 1;
let perPage = 9;

refs.gallery.addEventListener('click', seeRecipe);

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes?';

fetch(`${BASE_URL}`).then((response)=> response.json()).then(data => {
        console.log(data);

        const searchResults = data.results;
        console.log(searchResults);
        const itemArrey = searchResults[searchResults.length-1];
        // itemArrey.classList.add('item-is-hidden')
        console.log(itemArrey);

        createGalleryCard(searchResults);
        refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(searchResults));

        colorRating (searchResults);

      })

      function createGalleryCard(searchResults){
        return searchResults.map(({ preview, title, description, rating, _id}) => {
            const desktop = description.slice(0,62)
             const mobile  = description.slice(0,97)
            let text = mobile + '...';
            if(window.screen.width >= 768){
                text = desktop + '...'
            }
            return `<div class="photo-card">
            <div class = "backdrop"></div>
            <img  class="img_wrap" src="${preview}" alt="${title}"/>
                <div class="info">
                <div class="info-text">
                <p class="text-title">${title}</p>
                <p class="text-description">${description}</p>
                </div>
            </div>
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
            <button type="button" class="btn-see-recipe">See recipe</button>
            </div>`
        }).join('');
    }

    function colorRating (searchResults){
        const ratings = searchResults.flatMap(({ rating }) => rating);

        if (ratings.length > 0){
            initRatings();
         }
        
        function initRatings(){
            let ratingActive, ratingValue;
            for (let index = 0; index < ratings.length; index++){
                const rating = ratings[index];
                console.log(rating);
                initRatingVars(rating);
                setRatingActiveWidth(rating);
            }
        
            function initRatingVars(){
                ratingActive = document.querySelector('.rating-active');
                ratingValue = document.querySelector('.rating-value');
             }
        
             function setRatingActiveWidth(rating){
                const ratingActiveWidth = rating / 0.05;
                ratingActive.style.width = `${ratingActiveWidth}%`;
             }
        }
   
    }
    
    // function changeColorHeard(){
    //     if(evt.target.tagName !== 'BUTTON'){
    //         return
    //          }
    //          console.log(evt.target);
    // }
    function seeRecipe(evt){
        if(evt.target.tagName !== 'BUTTON'){
       return
        }

        console.log(evt.target);
        evt.target.classList.toggle('bnt');
    }
    