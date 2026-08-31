
const searchForm = document.querySelector(".searchForm")// Instead of just the button ,capture the whole form
const searchField = document.getElementById("searchField")
const feedSection = document.getElementById("feed")
let movieResults = []


async function retrieveMovies(searchText){


      let cleanStr = searchText.replace('"','')
      const res= await fetch(`http://www.omdbapi.com/?s=${cleanStr}&apikey=51a01f27`)
      const data = await res.json()
      console.log(data)
      movieResults=await data.Search
      
      let finalMovieResults = []

      let id=0
      for(let movie of movieResults){
         id = movie.imdbID.replace('"','')
         const res2= await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=51a01f27`)
         const data2 = await res2.json()
         
         finalMovieResults.push(data2)
      }

      console.log("New movie results:", finalMovieResults)

      feedGenerator(finalMovieResults)


   }

searchForm.addEventListener('submit',(e)=>{
   e.preventDefault();
   let text = searchField.value
   retrieveMovies(text)
})

function feedGenerator(movies) {
   feedSection.innerHTML=" "
   
   if(searchField.value === ""){
      feedSection.innerHTML=`
         <div class="init-state">
                <img id="init-state-img" src="/images/feed-icon.png">
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
                            <img src="images/star.png">
                            <p>${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-details-line">
                        <p class="duration">${movie.Runtime} mins</p>
                        <p class="genres">${movie.Genre}</p>
                        <div class="watchlist-func">
                            <img src="images/watchlist-add.png">
                            <p>Watchlists</p>
                        </div>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>`
   })
      
   }
}

//feedGenerator()