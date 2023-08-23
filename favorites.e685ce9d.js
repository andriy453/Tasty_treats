let e;function t(){let e=document.documentElement.getAttribute("data-theme"),t="light"===e?"dark":"light";document.documentElement.setAttribute("data-theme",t);let n=document.querySelectorAll(".input-switcher");n.forEach(function(e){e.checked="dark"===t}),localStorage.setItem("theme",t)}const n=document.querySelectorAll(".input-switcher");n.forEach(function(e){e.addEventListener("change",t)}),function(){let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",n=e||t;document.documentElement.setAttribute("data-theme",n);let l=document.querySelectorAll(".input-switcher");l.forEach(function(e){e.checked="dark"===n})}();var l={};function i(e,t){let n;n=e.length?e.map(({preview:e,title:t,description:n,rating:l,_id:i})=>{let a=n.slice(0,62),c=n.slice(0,97),o=c+"...";return window.screen.width>=768&&(o=a+"..."),`<div class="photo-card cart-favorite">
        <div class = "backdrop"></div>
            <img class="img-card" src="${e}" alt="${t}"/>
            <div class="info">
            <div class="info-text">
            <h3 class="info-item">${t}</h3>
            <p class="info-text">${o}</p>
            </div>
        </div>
        <button type="button" id='${i}' class="btn-see-recipe">See recipe</button>
        <div class = "rating">
        <div class="rating-value">${l}</div>
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
        <button type="button" class="btn-heard" id='${i}'>♥</button>
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
        </div>`,t.innerHTML=n}l={trueFunc:function(){return!0},falseFunc:function(){return!1}},(()=>{let e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),n=document.querySelector(".js-close-menu"),i=()=>{let n="true"===t.getAttribute("aria-expanded");t.setAttribute("aria-expanded",!n),e.classList.toggle("is-open"),n?(l.enableBodyScroll,document.body.classList.remove("no-scroll")):(l.disableBodyScroll,document.body.classList.add("no-scroll"))};t.addEventListener("click",i),n.addEventListener("click",i),window.matchMedia("(min-width: 768px)").addEventListener("change",n=>{n.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),(0,l.enableBodyScroll)(e),document.body.classList.remove("no-scroll"))})})();const a=document.querySelector(".fav-recipe-card-list"),c=document.querySelector(".fav-category-block");document.querySelector(".btn-all-categori");const o=document.querySelector(".btn-heard"),s=document.querySelector(".button-style-favorites"),r={button1:document.querySelector(".btn-center1"),button2:document.querySelector(".btn-center2"),button3:document.querySelector(".btn-center3"),btn_right:document.querySelector(".btn-right"),btn_end:document.querySelector(".btn-right-end"),btn_start:document.querySelector(".btn-left"),btn_left:document.querySelector(".btn-left1")},d="favorite",u=JSON.parse(localStorage.getItem(d))??[],g=u.map(e=>e.category);if(i(u,a),!function(e){let t=[...new Set(e)];c.insertAdjacentHTML("afterbegin",'<button class="btn-all-categori  active_all-categories" type="button">All categories</button>'),c.insertAdjacentHTML("beforeend",t.map(e=>`
          <button class="fav-category-fltr-btn" id='${e}' type="button">${e}</button>`).join(""))}(g),a.addEventListener("click",function(e){if("BUTTON"===e.target.tagName&&e.target.classList.contains("btn-heard")){e.target.classList.remove("btn-heard"),e.target.classList.add("btn-heard-noectiv");let t=e.target.id;console.log("gggg"),console.log(o);let n=u.filter(e=>e._id!==t);localStorage.setItem(d,JSON.stringify(n))}}),c.addEventListener("click",e=>{e.target.classList.contains("fav-category-fltr-btn")&&i(u.filter(t=>t.category===e.target.id),a),e.target.classList.contains("btn-all-categori")&&i(u,a)}),a.addEventListener("click",function(e){"BUTTON"===e.target.tagName&&("See recipe"===e.target.innerText&&console.log(e.target.innerText),e.target.classList.toggle("bnt"))}),window.screen.width>=768?(console.log(u.length),i(e=u.slice(0,12),a)):i(e=u.slice(0,9),a),u.length>=12){s.style.display="flex";let t=0,n=12;r.button1.addEventListener("click",t=>{i(e,a)}),r.button2.addEventListener("click",t=>{i(e=u.slice(12,24),a)}),r.button3.addEventListener("click",t=>{i(e=u.slice(24,36),a)}),r.btn_right.addEventListener("click",l=>{if(t+=12,(n+=12)>u.length+11){t-=12,n-=12;return}i(e=u.slice(t,n),a)}),r.btn_end.addEventListener("click",l=>{console.log(u.length),console.log(u.length-12),t=u.length-12,n=u.length,i(e=u.slice(t,n),a)}),r.btn_left.addEventListener("click",l=>{0!==t&&(t-=12,n-=12,i(e=u.slice(t,n),a))}),r.btn_start.addEventListener("click",l=>{t=0,n=12,i(e=u.slice(t,n),a)})}const m=document.getElementById("myModal"),y=document.getElementById("openModal"),v=document.querySelector(".btnOrderNow"),p=document.getElementsByClassName("close")[0],b=document.querySelector(".modal-form-stl"),h=document.getElementById("messageBox");document.getElementById("messageText");const f=document.getElementById("okButton"),k=document.getElementById("thanksBox"),S=document.getElementById("closeThanksButton");y.addEventListener("click",()=>m.style.display="block"),v&&v.addEventListener("click",()=>m.style.display="block"),p.onclick=function(){m.style.display="none",h.style.display="none",k.style.display="none"},window.onclick=function(e){e.target==m&&(m.style.display="none",h.style.display="none",k.style.display="none")},b.addEventListener("submit",function(e){e.preventDefault(),m.style.display="none",k.style.display="block"}),f.onclick=function(){h.style.display="none"},S.onclick=function(){k.style.display="none",b.reset()};
//# sourceMappingURL=favorites.e685ce9d.js.map
