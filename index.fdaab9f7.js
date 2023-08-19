const e={searchForm:document.querySelector(".search-form"),submitBtn:document.querySelector(".submit"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};function t(e){return e.map(({preview:e,title:t,description:o})=>{let i=o.slice(0,62),r=o.slice(0,97),s=r+"...";return window.screen.width>=768&&(s=i+"..."),`<div class="photo-card">
            <div class = "backdrop"></div>
                <img src="${e}" alt="${t}"/>
                <div class="info">
                <div class="info-text">
                <h3 class="info-item">${t}</h3>
                <p class="info-text">${s}</p>
                </div>
            </div>
            <button type="button" class="btn-see-recipe">See recipe</button>
            </div>`}).join("")}fetch("https://tasty-treats-backend.p.goit.global/api/recipes?limit=9&rating=3").then(e=>e.json()).then(o=>{console.log(o);let i=o.results;console.log(i),t(i),e.gallery.insertAdjacentHTML("beforeend",t(i))});
//# sourceMappingURL=index.fdaab9f7.js.map
