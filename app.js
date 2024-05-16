const API_KEY = "56e027cd146687945044cba80958950c";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.getElementById("Form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json() // Beklemeyi ekledik

  console.log(data.results);
  showMovies(data.results);
}
form.addEventListener("submit", (e)=>{
    const searchTerm = search.value

    if (searchTerm && searchTerm !== ""){
        getMovies(SEARCH_API + searchTerm)

        search.value = ""
    }else{
        window.location.reload()
    }
})

function showMovies(movies){
    main.innerHTML = ""

movies.forEach((movie) => {
    const{title, poster_path, overview, vote_average} = movie

    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `
    <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title} <small>overwiev</small></h3>
                <p> ${overview}</p>
            </div>
    `

    main.appendChild(movieEL)
})
}
function getClassByRate(vote){
    if(vote >=8){
        return "green"
    } else if (vote >= 5){
        return "orange"
    } else {
        return "red"
    }
}