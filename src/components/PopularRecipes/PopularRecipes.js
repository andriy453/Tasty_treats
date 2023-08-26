import { fetchPopular } from '../../js/fetch.js';
const popularBox = document.querySelector(".popular-box")

export const popularRecipesRendering = fetchPopular()
    .then(data => {
        
        markup(data)   
    })
    .catch(error => {
        console.log('Error:', error);
        throw error;
    });

// -----------MARKUP-------------

const markup = (data) => {
   
    let width = document.documentElement.clientWidth;    
        if ( width < 768) {
            data.length = 2;
        }
    const markup = data.map((element) =>
        
        `<button type="button" class="photo-card_recipes btn-see-resipe"  id="${element._id}">
            <img class="popular-foto"  src="${element.preview}" alt="foto" width="64" height="64" " />
            <div class="info_recipes">
                <h3 class="recipe-title">${element.title}</h3>
                <div class="box">           
                    <p class="info-item_recipes">${element.description}
                    </p>
                </div>
            </div>
        </button>` 
                   
    ).join("");            

    popularBox.insertAdjacentHTML("beforeend", markup);    
}


