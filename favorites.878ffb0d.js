let e,t,l;var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},s=i.parcelRequired7c6;function c(e,t){let l;l=e.length?e.map(({preview:e,title:t,description:l,rating:i,_id:n})=>{let a=l.slice(0,62),s=l.slice(0,97),c=s+"...";return window.screen.width>=768&&(c=a+"..."),`<div class="photo-card cart-favorite">
        <div class = "backdrop"></div>
            <img class="img-card" src="${e}" alt="${t}"/>
            <div class="info">
            <div class="info-text">
            <h3 class="text-title">${t}</h3>
            <p class="info-text">${c}</p>
            </div>
        </div>
        <button type="button" id='${n}' class="btn-see-recipe">See recipe</button>
        <div class = "rating">
        <div class="rating-value">${i}</div>
        <div class="rating-body">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
      </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
      </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
      </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#EEA10C"/>
      </svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" fill="#F8F8F8" fill-opacity="0.1"/>
      </svg>
        </div>
        </div>
        <div class = "heard">
        <div class="heard-body">
        <div class="heard-active"></div>
        <div class="heard-items">
        <button type="button" class="btn-heard " id='${n}'>♥</button>
        </div>
        </div>
        </div>
        </div>`}).join(""):`
        <div class="block-for-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="97" height="83" viewBox="0 0 97 83" fill="none">
        <path d="M19 33H79V79H19V33Z" fill="#9BB537"/>
        <path d="M43 29.5C43 41.3741 33.3741 51 21.5 51C9.62588 51 0 41.3741 0 29.5C0 17.6259 9.62588 8 21.5 8C33.3741 8 43 17.6259 43 29.5Z" fill="#9BB537"/>
        <path d="M70 21.5C70 33.3741 60.3741 43 48.5 43C36.6259 43 27 33.3741 27 21.5C27 9.62588 36.6259 0 48.5 0C60.3741 0 70 9.62588 70 21.5Z" fill="#9BB537"/>
        <path d="M97 29.5C97 41.3741 87.3741 51 75.5 51C63.6259 51 54 41.3741 54 29.5C54 17.6259 63.6259 8 75.5 8C87.3741 8 97 17.6259 97 29.5Z" fill="#9BB537"/>
        <path d="M19 76H79V81.2807C79 82.2302 78.1605 83 77.125 83H20.875C19.8395 83 19 82.2302 19 81.2807V76Z" fill="#F8F8F8"/>
        <path d="M37 26.8705C37 25.2852 38.1193 24 39.5 24C40.8807 24 42 25.2852 42 26.8705V40.1295C42 41.7148 40.8807 43 39.5 43C38.1193 43 37 41.7148 37 40.1295V26.8705Z" fill="#F8F8F8"/>
        <path d="M45 26.8705C45 25.2852 46.567 24 48.5 24C50.433 24 52 25.2852 52 26.8705V40.1295C52 41.7148 50.433 43 48.5 43C46.567 43 45 41.7148 45 40.1295V26.8705Z" fill="#F8F8F8"/>
        <path d="M55 26.8705C55 25.2852 56.1193 24 57.5 24C58.8807 24 60 25.2852 60 26.8705V40.1295C60 41.7148 58.8807 43 57.5 43C56.1193 43 55 41.7148 55 40.1295V26.8705Z" fill="#F8F8F8"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1035 8.12123C73.8519 8.04342 74.6116 8.00354 75.3806 8.00354C85.0139 8.00354 93.1756 14.2612 95.9703 22.9072C95.2219 22.985 94.4622 23.0248 93.6931 23.0248C84.0599 23.0248 75.8982 16.7672 73.1035 8.12123Z" fill="#050505"/>
        </svg>
      <p class="message-for-empty">
        It appears that you haven't added any recipes to your favorites yet.
        To get started, you can add recipes that you like to your favorites
        for easier access in the future.
      </p>
        </div>`,t.innerHTML=l}null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var l={id:e,exports:{}};return n[e]=l,t.call(l.exports,l,l.exports),l.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},i.parcelRequired7c6=s),s("eW3A3"),s("1WbVH");const r=document.querySelector(".fav-recipe-card-list"),o=document.querySelector(".fav-category-block");document.querySelector(".container-cards"),document.querySelector(".btn-heard");const d=document.querySelector(".button-style-favorites"),g={all_categorie:document.querySelector(".btn-all-categori"),button1:document.querySelector(".btn-center1"),button2:document.querySelector(".btn-center2"),button3:document.querySelector(".btn-center3"),categories_btn:document.querySelector("fav-category-fltr-btn"),btn_right:document.querySelector(".btn-right"),btn_end:document.querySelector(".btn-right-end"),btn_start:document.querySelector(".btn-left"),btn_left:document.querySelector(".btn-left1")},v="favorite",u=JSON.parse(localStorage.getItem(v))??[],C=u.map(e=>e.category);function f(e){let t=[...new Set(e)],l=t.map(e=>`<button class="fav-category-fltr-btn" id='${e}' type="button">${e}</button>`).join("");o.innerHTML=t.length?`<button class="btn-all-categori  active_all-categories" type="button">All categories</button>${l}`:""}if(c(u,r),f(C),r.addEventListener("click",function(e){if("BUTTON"===e.target.tagName&&e.target.classList.contains("btn-heard")){e.target.classList.remove("btn-heard"),e.target.classList.add("btn-heard-noactiv");let t=e.target.id,l=u.findIndex(e=>e._id===t);console.log(l),u.splice(l,1),localStorage.setItem(v,JSON.stringify(u)),f(u.map(e=>e.category)),window.screen.width>=768?(c(u.slice(0,12),r),u.length<=12&&(d.style.display="none")):u.length<=9&&(c(u.slice(0,9),r),d.style.display="none")}}),o.addEventListener("click",t=>{t.target.classList.contains("fav-category-fltr-btn")&&(document.querySelector(".btn-all-categori ").classList.remove("active_all-categories"),u.filter(e=>e.category===t.target.id).slice(0,12).length<=12&&(d.style.display="none"),u.filter(e=>e.category===t.target.id).length>12&&(d.style.display="block",l=u.filter(e=>e.category===t.target.id)),c(u.filter(e=>e.category===t.target.id).slice(0,12),r),void 0!==e&&e.classList.remove("active_btn"),e=t.target,t.target.classList.add("active_btn")),t.target.classList.contains("btn-all-categori")&&(u.length<=12&&(d.style.display="block",l=u),location.reload(),c(u.slice(0,12),r,r))}),g.all_categorie&&g.all_categorie.addEventListener("click",t=>{t.target.classList.add("active_all-categories"),e.classList.remove("active_btn")}),r.addEventListener("click",function(e){"BUTTON"===e.target.tagName&&e.target.classList.toggle("bnt")}),l=u,window.screen.width>=768){if(t=l.slice(0,12),l.length>=12){d.style.display="flex";let e=0,i=12;g.button1.addEventListener("click",e=>{c(t=l.slice(0,12),r)}),g.button2.addEventListener("click",n=>{e=12,i=24,c(t=l.slice(12,24),r)}),g.button3.addEventListener("click",n=>{e=24,i=36,c(t=l.slice(24,36),r)}),g.btn_right.addEventListener("click",n=>{if(e+=12,(i+=12)>l.length+11){e-=12,i-=12;return}c(t=l.slice(e,i),r)}),g.btn_end.addEventListener("click",n=>{e=l.length-12,i=l.length,c(t=l.slice(e,i),r)}),g.btn_left.addEventListener("click",n=>{0!==e&&(e-=12,i-=12,c(t=l.slice(e,i),r))}),g.btn_start.addEventListener("click",n=>{e=0,i=12,c(t=l.slice(0,12),r)})}c(t,r)}else{if(t=l.slice(0,9),l.length>=9){d.style.display="flex";let e=0,i=9;g.button1.addEventListener("click",e=>{c(t=l.slice(0,9),r)}),g.button2.addEventListener("click",n=>{e=18,i=27,c(t=l.slice(12,24),r)}),g.button3.addEventListener("click",n=>{e=36,i=45,c(t=l.slice(24,36),r)}),g.btn_right.addEventListener("click",n=>{if(e+=9,(i+=9)>l.length+8){e-=9,i-=9;return}c(t=l.slice(e,i),r)}),g.btn_end.addEventListener("click",n=>{e=l.length-9,i=l.length,c(t=l.slice(e,i),r)}),g.btn_left.addEventListener("click",n=>{0!==e&&(e-=9,i-=9,c(t=l.slice(e,i),r))}),g.btn_start.addEventListener("click",n=>{e=0,i=9,c(t=l.slice(0,9),r)})}c(t,r)}document.querySelector(".scrollable-list-fav").style.display="none",null!==JSON.parse(localStorage.getItem(v))&&(document.querySelector(".scrollable-list-fav").style.display="block"),void 0===u&&console.log(JSON.parse(localStorage.getItem(v))),s("6h8HX"),s("i4q0v"),s("2XlBD");
//# sourceMappingURL=favorites.878ffb0d.js.map
