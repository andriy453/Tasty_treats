!function(){let e;function t(){let e=document.documentElement.getAttribute("data-theme"),t="light"===e?"dark":"light";document.documentElement.setAttribute("data-theme",t);let i=document.querySelectorAll(".input-switcher");i.forEach(function(e){e.checked="dark"===t}),localStorage.setItem("theme",t)}let i=document.querySelectorAll(".input-switcher");i.forEach(function(e){e.addEventListener("change",t)}),function(){let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",i=e||t;document.documentElement.setAttribute("data-theme",i);let a=document.querySelectorAll(".input-switcher");a.forEach(function(e){e.checked="dark"===i})}();var a={};a={trueFunc:function(){return!0},falseFunc:function(){return!1}},(()=>{let e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),i=document.querySelector(".js-close-menu"),n=()=>{let i="true"===t.getAttribute("aria-expanded");t.setAttribute("aria-expanded",!i),e.classList.toggle("is-open"),i?a.enableBodyScroll:a.disableBodyScroll};t.addEventListener("click",n),i.addEventListener("click",n),window.matchMedia("(min-width: 768px)").addEventListener("change",i=>{i.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1))})})();let n=document.querySelector(".fav-recipe-card-list"),r=document.querySelector(".fav-category-block"),c=JSON.parse(localStorage.getItem("favoris"))??[],s=c.map(e=>e.category);e=c.length?c.map(({preview:e,title:t,description:i,rating:a,_id:n})=>{let r=i.slice(0,62),c=i.slice(0,97),s=c+"...";return window.screen.width>=768&&(s=r+"..."),`<div class="photo-card">
        <div class = "backdrop"></div>
            <img class="img-card" src="${e}" alt="${t}"/>
            <div class="info">
            <div class="info-text">
            <h3 class="info-item">${t}</h3>
            <p class="info-text">${s}</p>
            </div>
        </div>
        <button type="button" id='${n}' class="btn-see-recipe">See recipe</button>
        <div class = "rating">
        <div class="rating-value">${a}</div>
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
        <button type="button" class="btn-heard" id='${n}'>♡</button>
        </div>
        </div>
        </div>
        </div>`}).join(""):`
        <div class="block-for-empty">
        <svg class="recipe-icon-pic" width="68" height="58">
        <use href="./images/sprite.svg#icon-elements"></use>
      </svg>
      <p class="message-for-empty">
        It appears that you haven't added any recipes to your favorites yet.
        To get started, you can add recipes that you like to your favorites
        for easier access in the future.
      </p>
        </div>`,n.innerHTML=e,r.innerHTML=s.map(e=>`
            <button class="fav-category-fltr-btn" type="button">${e}</button>`).join(""),n.addEventListener("click",function(e){"BUTTON"===e.target.tagName&&("♡"===e.target.innerText&&console.log(e.target.innerText),"See recipe"===e.target.innerText&&console.log(e.target.innerText),e.target.classList.toggle("bnt"))})}();
//# sourceMappingURL=favorites.b0df43cc.js.map
