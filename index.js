
const searchForm = document.querySelector(".searchForm")// Instead of just the button ,capture the whole form
const searchField = document.getElementById("searchField")
const feedSection = document.getElementById("feed")
const watchListFeedSection = document.getElementById("watchlist-feed")
let movieResults = []

// Pull previous watchlist items from local storage if they exist; otherwise start fresh
let watchList = JSON.parse(localStorage.getItem("myWatchList")) || [] 

/* MOVIES RETRIEVAL */
async function retrieveMovies(searchText){

      let cleanStr = searchText.replace('"','')
      const res= await fetch(`https://www.omdbapi.com/?s=${cleanStr}&apikey=51a01f27`)
      const data = await res.json()
      console.log(data)
      movieResults=await data.Search
      let searchResponse= await data.Response
      
      let finalMovieResults = []
      let id=0
      if(searchResponse==="False"){
         feedSection.innerHTML=" "
         feedSection.innerHTML=`
         <div class="init-state">
            <h1 style="text-align:center;">Unable to find what you're looking for.<br>Please try another search.</h1>
         </div>`
      }else{
            for(let movie of movieResults){
               id = movie.imdbID.replace('"','')
               const res2= await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=51a01f27`)
               const data2 = await res2.json()
               
               finalMovieResults.push(data2)
               }

            console.log("New movie results:", finalMovieResults)

            feedGenerator(finalMovieResults)
         }

   }

/*SUBMIT BUTTON FUNCTION */
if(searchForm){ 
searchForm.addEventListener('submit',(e)=>{
   e.preventDefault();
   let text = searchField.value
   retrieveMovies(text)
})
}


/* FEED GENERATOR FUNCTION */

function feedGenerator(movies) {
   feedSection.innerHTML=" "
   
   if(searchField && searchField.value === ""){
      feedSection.innerHTML=`
         <div class="init-state">
                <img id="init-state-img" src="./images/feed-icon.png">
                <h1>Start Exploring</h1>
         </div>`
   }else{
      movies.forEach(function(movie) {
         feedSection.innerHTML+=`
            <div class="movie_card">
                <div class="movie-poster"><img src=${movie.Poster}></div>
                <div class="movie-description">
                    <div class="title-rating">
                        <h2 style="font-weight: 600;">${movie.Title}</h2>
                        <div class="rating">
                            <img src="./images/star.png">
                            <p>${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-details-line">
                        <p class="duration">${movie.Runtime}</p>
                        <p class="genres">${movie.Genre}</p>
                        <button class="watchlist-btn-add" data-id="${movie.imdbID}">
                           <img src="./images/watchlist-add.png" alt="Add">
                           <span>Watchlist</span>
                        </button>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>`
      }
   )
      
   }
}

/* WATCHLIST FEED GENERATOR */

function watchListGenerator(movies){
   
   console.log("Watch list generator test:",watchList)
   
   watchListFeedSection.innerHTML=" "

   if(movies.length === 0){
      watchListFeedSection.innerHTML=`
      <div class="empty-state">
         <h1>Your watchlist is looking empty....</h1>
            <a class="watchlist-link-btn" href="index.html">
               <img src="./images/watchlist-add.png" alt="Add">
               <h4>Let's add some movies!</h4>
            </a>
      </div>`
   }else{
      movies.forEach(function(movie) {
         watchListFeedSection.innerHTML+=`
            <div class="movie_card">
                <div class="movie-poster"><img src=${movie.Poster}></div>
                <div class="movie-description">
                    <div class="title-rating">
                        <h2 style="font-weight: 600;">${movie.Title}</h2>
                        <div class="rating">
                            <img src="./images/star.png">
                            <p>${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-details-line">
                        <p class="duration">${movie.Runtime}</p>
                        <p class="genres">${movie.Genre}</p>
                        <button class="watchlist-btn-remove" data-id="${movie.imdbID}">
                           <img src="./images/watchlist-remove.png" alt="remove">
                           <span>Remove</span>
                        </button>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>`
      }
   )
      
   }
}

/* Add to watchList function*/
if(feedSection){
   feedSection.addEventListener('click', async (e)=>{
   if(e.target.closest('.watchlist-btn-add')){
      let id = e.target.closest('.watchlist-btn-add').dataset.id;
      console.log(id)

      const res2= await fetch(`https://www.omdbapi.com/?i=${id}&apikey=51a01f27`)
      const data2 = await res2.json()
               
      watchList.push(data2)
      console.log("Watch list add test:", watchList)

      localStorage.setItem("myWatchList",JSON.stringify(watchList))
      console.log(watchList)

      watchListGenerator(watchList)
      
   }
   }
   )
}

/*GENERATE WATCHLIST FEED */
if(watchListFeedSection){
   console.log("Watclist code is run")
   watchListGenerator(watchList)
}

/* REMOVE FUNCTION */
if(watchListFeedSection){
   watchListFeedSection.addEventListener('click', async (e)=>{
   if(e.target.closest('.watchlist-btn-remove')){
      let id = e.target.closest('.watchlist-btn-remove').dataset.id;
      console.log(id)
               
      watchList = watchList.filter(movie => movie.imdbID !== id)
      console.log("Watch list remove test:", watchList)

      localStorage.setItem("myWatchList",JSON.stringify(watchList))

      watchListGenerator(watchList)
               }
         }
      )
   }

function addToWatchlist(){
   console.log("Add to watchlist clicked")
}
