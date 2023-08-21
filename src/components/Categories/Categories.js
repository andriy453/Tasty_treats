import { axiosRecipes } from './axiosFilters';
import { axiosCard } from './axiosCard';


const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const categoriesRef = 'categories';
const areaRef = 'areas';
const ingredientsRef = 'ingredients';

const refs = {
  categoriesEl: document.querySelector('.categories-list'),
  inputEl: document.querySelector('.input-filter'),
  timeEl: document.querySelector('.time-select'),
  areaEl: document.querySelector('.area-select'),
  ingredientsEl: document.querySelector('.ingredients-select'),
  gallery : document.querySelector('.gallery'),
  button1: document.querySelector('.btn-center1'),
  button2: document.querySelector('.btn-center2'),
  button3: document.querySelector('.btn-center3'),
  btn_right: document.querySelector('.btn-right'),
  btn_left: document.querySelector('.btn-left1'),
  btn_end: document.querySelector('.btn-right-end'),
  btn_categories: document.querySelector('.btn-categories'),
  resetFilter: document.querySelector(".reset-filter"),

};
const axiosRecipesInstance = new axiosRecipes();
// Додаємо option

axiosRecipesInstance.getFilteredData(categoriesRef).then(categories => {
  categories.forEach(category => {
    const liEl = document.createElement('li');
    liEl.textContent = category.name;
    liEl.setAttribute('value', category.name);
    liEl.classList.add('category-item');
    refs.categoriesEl.append(liEl);
  });
});

axiosRecipesInstance.getFilteredData(areaRef).then(areas => {
  areas.forEach(area => {
    const optionEl = document.createElement('option');
    optionEl.id = area._id;
    optionEl.value = area.name;
    optionEl.textContent = area.name;
    refs.areaEl.appendChild(optionEl);
  });
});

axiosRecipesInstance.getFilteredData(ingredientsRef).then(ingredients =>
  ingredients.forEach(ingredient => {
    const optionEl = document.createElement('option');
    optionEl.value = ingredient._id; //тут треба не name, а id
    optionEl.id = ingredient._id;
    optionEl.textContent = ingredient.name;
    refs.ingredientsEl.appendChild(optionEl);
  })
);


function selectTime() {
  for (let i = 5; i <= 120; i += 5) {
    const optionEl = document.createElement('option');
    optionEl.textContent = [i];
    optionEl.value = [i];
    refs.timeEl.appendChild(optionEl);
  }
}
selectTime();

//Отримуємо обрані значення
let selectedCategoryId;
let selectedAreaId;
let selectedIngredientsId;
let selectedTimeId;
let inputValue;
let  totalPages = 1;
let  arayRecept;
let limitID;
let results =[];

let activeCategories ;


refs.categoriesEl.addEventListener('click', handleCategory);
const axiosCardInstance = new axiosCard();
function handleCategory(e) {
  if (e.target.classList.contains('category-item')) {
   
    selectedCategoryId = e.target.getAttribute('value');
    axiosCardInstance.category = selectedCategoryId;
    axiosCardInstance.page = 1;
    axiosCardInstance.getCardData().then(data => {
      createGalleryCard(data.results)
      totalPages = data.totalPages;
      console.log('це рецепти', data.results);
      arayRecept = data.results;
      refs.gallery.innerHTML =  createGalleryCard(data.results)
    });
    if(activeCategories !== undefined){
      activeCategories.classList.remove('active')
    }
  }
  activeCategories  = e.target
e.target.classList.add('active')
}

refs.inputEl.addEventListener('input', handleInputEl);

function handleInputEl(e) {
  inputValue = e.target.value;
  axiosCardInstance.query = inputValue;
  console.log(inputValue);

  axiosCardInstance.getCardData().then(data => {
    let filter = results.filter(value => value.title.toLowerCase().includes(inputValue.toLowerCase()) );
    console.log('це рецепти', filter );
    // if(filter.length === 0){
    //   return 
    // }
    refs.gallery.innerHTML =  createGalleryCard(filter)
  });
}

refs.areaEl.addEventListener('change', handleArea);

function handleArea(e) {
  selectedAreaId = e.target.value;
  axiosCardInstance.area = selectedAreaId;
 
  console.log('areaId:', selectedAreaId);
  axiosCardInstance.getCardData().then(data => {
      if(!data.results){
      console.log('jjjjjjjj')
      refs.gallery.innerHTML =  MarkapCard()
    }
    console.log('це рецепти', data);
    arayRecept = data.results;
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
}

refs.timeEl.addEventListener('change', handleTime);

function handleTime(e) {
  selectedTimeId = e.target.value;
  axiosCardInstance.time = selectedTimeId;
  arayRecept = selectedTimeId;
  console.log('timeId:', selectedTimeId);
  axiosCardInstance.getCardData().then(data => {
    if(!data.result){
      console.log('jjjjjjjj')
      refs.gallery.innerHTML =  MarkapCard()
    }
    console.log('це рецепти', data);
    arayRecept = data.results;
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
}

refs.ingredientsEl.addEventListener('change', handleIngredients);

function handleIngredients(e) {
  selectedIngredientsId = e.target.value; //і тут треба змінити ._id
  console.log(e.target.value);
  axiosCardInstance.ingredients = selectedIngredientsId;
  console.log('ingredientsId:', selectedIngredientsId);
  axiosCardInstance.getCardData().then(data => {
    arayRecept = data.results;
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
}


//Вибір рецепту по фільтрам
axiosCardInstance.category = selectedCategoryId;
axiosCardInstance.page = 1;
axiosCardInstance.totalPages =  totalPages;
axiosCardInstance.time = selectedTimeId;
axiosCardInstance.area = selectedAreaId;
axiosCardInstance.ingredients = selectedIngredientsId;
axiosCardInstance.query = inputValue;

 if (window.screen.width >= 1280){
  limitID  = 9;
  axiosCardInstance.limit = limitID ;
  arayRecept =limitID ;
  axiosCardInstance.getCardData().then(data => {
   results = data.results
    console.log('Обрані рецепти', data)
    totalPages = data.totalPages
    refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(data.results))
  });
}
else if(window.screen.width >= 768){
  limitID  = 8;
  axiosCardInstance.limit = limitID ;
  arayRecept =limitID ;
  axiosCardInstance.getCardData().then(data => {
    results = data.results
    console.log('Обрані рецепти', data)
    totalPages = data.totalPages
    refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(data.results))
  });
}
else{
  axiosCardInstance.getCardData().then(data => {
    results = data.results
    console.log('Обрані рецепти', data)
    arayRecept = data.results
    totalPages = data.totalPages
    refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(data.results))
  });
}


// pagination ==========================pagination=============pagination
refs.button1.addEventListener('click',(e)=>{

  axiosCardInstance.page = 1;
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
})

refs.button2.addEventListener('click',(e)=>{
  if(totalPages === 1){
    return
  }
else{
  axiosCardInstance.page = e.currentTarget.innerText;

  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
}
})
refs.button3.addEventListener('click',(e)=>{
  console.log(totalPages)
  if(totalPages=== 1 ){
    return
  }
  else if(totalPages=== 2){
    return
  }
else{
  axiosCardInstance.page = e.currentTarget.innerText;

  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
}
 
})

refs.btn_right.addEventListener('click',(e)=>{
  if(axiosCardInstance.page ===  totalPages){
    return
  }
  console.log(totalPages)
  axiosCardInstance.page++;
console.log(axiosCardInstance.page++)
  axiosCardInstance.getCardData().then(data => {
    totalPages = data.totalPages
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
})
refs.btn_left.addEventListener('click',(e)=>{
  if(axiosCardInstance.page === 1 ){
    return
  }
  axiosCardInstance.page = axiosCardInstance.page--;
console.log(axiosCardInstance.page--)
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
})
refs.btn_end.addEventListener('click',(e)=>{
if(totalPages === 1){
  console.log('dddd')
}
  axiosCardInstance.page = totalPages;
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
})
// pagination ==========================pagination=============pagination

refs.resetFilter.addEventListener('click', resetAllFilters);
function resetAllFilters() {
  axiosCardInstance.category = '';
  axiosCardInstance.area = '';
  axiosCardInstance.time = '';
  axiosCardInstance.ingredients = '';
  axiosCardInstance.title = '';
  axiosCardInstance.getCardData().then(data => {

    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
  console.log(axiosCardInstance);
}

refs.btn_categories.addEventListener('click',(e)=>{
  activeCategories  = e.target
  e.target.classList.add('active')
  axiosCardInstance.category = '';
  axiosCardInstance.getCardData().then(data => {

    console.log('це рецепти', data);
    refs.gallery.innerHTML =  createGalleryCard(data.results)
  });
  if(activeCategories  === e.target){
    activeCategories.classList.remove('active')
  }
activeCategories  = e.target;
e.target.classList.add('active');

})



function createGalleryCard(searchResults){
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
  }
      }



function MarkapCard(){
const array = [{preview:'not found', title:'not found', text:'not found' },
{preview:'not found', title:'not found', text:'not found' },
{preview:'not found', title:'not found', text:'not found' },]

    return array.map(({ preview, title, text}) => {

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
  }
      

 
 