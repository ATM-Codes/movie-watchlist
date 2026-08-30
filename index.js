async function retreieveMovies(){
   const res= await fetch("http://www.omdbapi.com/?s=Batman&apikey=51a01f27&page=2")
   const data = await res.json()
   console.log(data)
}


retreieveMovies()