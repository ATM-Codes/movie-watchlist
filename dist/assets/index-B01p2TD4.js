(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`.searchForm`),t=document.getElementById(`searchField`),n=document.getElementById(`feed`),r=document.getElementById(`watchlist-feed`),i=[],a=JSON.parse(localStorage.getItem(`myWatchList`))||[];async function o(e){let t=e.replace(`"`,``),r=await(await fetch(`https://www.omdbapi.com/?s=${t}&apikey=51a01f27`)).json();console.log(r),i=await r.Search;let a=await r.Response,o=[];if(a===`False`)n.innerHTML=` `,n.innerHTML=`
         <div class="init-state">
            <h1 style="text-align:center;">Unable to find what you're looking for.<br>Please try another search.</h1>
         </div>`;else{for(let e of i){e.imdbID.replace(`"`,``);let t=await(await fetch(`https://www.omdbapi.com/?i=${e.imdbID}&apikey=51a01f27`)).json();o.push(t)}console.log(`New movie results:`,o),s(o)}}e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=t.value;o(n)});function s(e){n.innerHTML=` `,t&&t.value===``?n.innerHTML=`
         <div class="init-state">
                <img id="init-state-img" src="public/images/feed-icon.png">
                <h1>Start Exploring</h1>
         </div>`:e.forEach(function(e){n.innerHTML+=`
            <div class="movie_card">
                <div class="movie-poster"><img src=${e.Poster}></div>
                <div class="movie-description">
                    <div class="title-rating">
                        <h2 style="font-weight: 600;">${e.Title}</h2>
                        <div class="rating">
                            <img src="public/images/star.png">
                            <p>${e.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-details-line">
                        <p class="duration">${e.Runtime}</p>
                        <p class="genres">${e.Genre}</p>
                        <button class="watchlist-btn-add" data-id="${e.imdbID}">
                           <img src="public/images/watchlist-add.png" alt="Add">
                           <span>Watchlist</span>
                        </button>
                    </div>
                    <p class="movie-plot">${e.Plot}</p>
                </div>
            </div>`})}function c(e){console.log(`Watch list generator test:`,a),r.innerHTML=` `,e.length===0?r.innerHTML=`
      <div class="empty-state">
         <h1>Your watchlist is looking empty....</h1>
            <a class="watchlist-link-btn" href="index.html">
               <img src="public/images/watchlist-add.png" alt="Add">
               <h4>Let's add some movies!</h4>
            </a>
      </div>`:e.forEach(function(e){r.innerHTML+=`
            <div class="movie_card">
                <div class="movie-poster"><img src=${e.Poster}></div>
                <div class="movie-description">
                    <div class="title-rating">
                        <h2 style="font-weight: 600;">${e.Title}</h2>
                        <div class="rating">
                            <img src="public/images/star.png">
                            <p>${e.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-details-line">
                        <p class="duration">${e.Runtime}</p>
                        <p class="genres">${e.Genre}</p>
                        <button class="watchlist-btn-remove" data-id="${e.imdbID}">
                           <img src="public/images/watchlist-remove.png" alt="remove">
                           <span>Remove</span>
                        </button>
                    </div>
                    <p class="movie-plot">${e.Plot}</p>
                </div>
            </div>`})}n&&n.addEventListener(`click`,async e=>{if(e.target.closest(`.watchlist-btn-add`)){let t=e.target.closest(`.watchlist-btn-add`).dataset.id;console.log(t);let n=await(await fetch(`https://www.omdbapi.com/?i=${t}&apikey=51a01f27`)).json();a.push(n),console.log(`Watch list add test:`,a),localStorage.setItem(`myWatchList`,JSON.stringify(a)),console.log(a),c(a)}}),r&&(console.log(`Watclist code is run`),c(a)),r&&r.addEventListener(`click`,async e=>{if(e.target.closest(`.watchlist-btn-remove`)){let t=e.target.closest(`.watchlist-btn-remove`).dataset.id;console.log(t),a=a.filter(e=>e.imdbID!==t),console.log(`Watch list remove test:`,a),localStorage.setItem(`myWatchList`,JSON.stringify(a)),c(a)}});