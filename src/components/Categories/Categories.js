import axios, { all } from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
//https://tasty-treats-backend.p.goit.global/api/areas;
// https://tasty-treats-backend.p.goit.global/api/categories;
// https://tasty-treats-backend.p.goit.global/api/recipes/

const categories = 'categories';
const time = 'recipes'; //треба взяти тут time
const area = 'areas';
const ingredients = 'ingredients';

const refs = {
  categoriesEl: document.querySelector('.categories-list'),
  inputEl: document.querySelector('.input-filter'),
  timeEl: document.querySelector('.time-select'),
  areaEl: document.querySelector('.area-select'),
  ingredientsEl: document.querySelector('.ingredients-select'),
};

function filtersData(filters) {
  return axios
    .get(`${BASE_URL}${filters}`)
    .then(response => {
      //console.log(`${filters}`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// filtersData(categories);
// filtersData(time);
// filtersData(area);
// filtersData(ingredients);

filtersData(categories).then(categories => {
  //console.log('category', categories);
  categories.forEach(category => {
    const liEl = document.createElement('li');
    liEl.textContent = category.name;
    //console.log(category.name);
    liEl.setAttribute('data-id', category._id);
    liEl.classList.add('category-item');
    //console.log(category._id);
    refs.categoriesEl.append(liEl);
  });
});

filtersData(area).then(areas => {
  //console.log('areas', areas);
  areas.forEach(area => {
    const optionEl = document.createElement('option');
    optionEl.value = area._id;
    optionEl.textContent = area.name;
    refs.areaEl.appendChild(optionEl);
  });
});

filtersData(ingredients).then(ingredients =>
  ingredients.forEach(ingredient => {
    const optionEl = document.createElement('option');
    optionEl.value = ingredient._id;
    optionEl.textContent = ingredient.name;
    refs.ingredientsEl.appendChild(optionEl);
  })
);

let allRecipes = [];
async function processAllPages(recipes) {
  const response = await filtersData('recipes?page=1');
  const totalPages = response.totalPages;

  // console.log(totalPages);

  allRecipes.push(...response.results);

  for (let page = 2; page <= totalPages; page += 1) {
    const pageResponse = await filtersData(`recipes?page=${page}`);
    const recipes = pageResponse.results;

    allRecipes.push(...recipes);
    //console.log(pageResponse);
  }

  return allRecipes;
}

console.log(allRecipes);

processAllPages(time)
  .then(allRecipes => {
    allRecipes.forEach(recipe => {
      //console.log(recipe);
      const optionEl = document.createElement('option');
      optionEl.value = recipe._id;
      optionEl.textContent = recipe.time + 'min';
      refs.timeEl.appendChild(optionEl);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
