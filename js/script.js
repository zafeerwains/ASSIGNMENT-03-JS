(async function () {
  setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    amPm = "AM"
    if (hours > 11) {
      amPm = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }
    document.getElementById("currentTime").innerHTML = `${hours}:${minutes}:${seconds}${amPm}`
  }, 1000)
  const input = (output) => document.getElementById("output").innerHTML += output;
  const clearScreen = () => document.getElementById("output").innerHTML = " ";
  const world = await fetch("./js/languages.json");
  const languages = await world.json();
  const response = await fetch("./js/data.json");
  const movies = await response.json();
  for (let i = new Date().getFullYear(); i > 1940; i--) {
    document.getElementById("yearSelect").innerHTML += `<option value="${i}">${i}</option>`
  }
  for (let i = 10; i > 0; i = i - .1) {
    document.getElementById("rattingSelect").innerHTML += `<option value="${i.toFixed(1)}">${i.toFixed(1)}</option>`
  }
  for (let i = 0; i < languages.length; i++) {
    document.getElementById("languageSelect").innerHTML += `<option value="${languages[i].name}">${languages[i].name}</option>`
  }
  let genres = ["Action", "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Romance","Thriller", "Animation"]
  for (gene of genres) {
    document.getElementById("genereSelect").innerHTML += `<option value="${gene}">${gene}</option>`
  }
  let moviesRecmended = movies.filter(movie => movie.vote_average >= 8.5)
  let moviesViewed = movies.filter(movie => movie.runtime > 200)
  let japaneseLanguage = movies.filter(movie => movie.original_language === "Japanese")
  let spanishLanguage = movies.filter(movie => movie.original_language === "Spanish")
  let englishLanguage = movies.filter(movie => movie.original_language === "English")
  const cardOutput = (filterdArray) => {
    for (films of filterdArray) {
      input(`<div class="col-sm-6 col-md-4  p-2  ">
      <div class="card bg-dark text-light">
      <a href="${films.homepage}"><img src=${'https://www.themoviedb.org/t/p/original' + films.poster_path} class="card-img-top" alt="thumbnail" /></a>
          <div class="card-body">
              <h5 class="card-title">${films.title}</h5> <p class="card-text fs-5 p-0 m-0"><i>${films.certification}</i></p><p class=" card-text fs-6 p-0 m-0"><b>Release Date: </b>${films.release_date}</p><p class=" card-text fs-6 p-0 m-0"><b>Rating: </b>${films.vote_average}</p><p class="card-text">${films.overview}</p>
              </div>
              <a href="${films.homepage}" class="btn btn-success mx-5 m-2">Go To Hompage </a>
      </div>
  </div> `)
    }
  }
  const recommendedMovies = () => {
    clearScreen()
    cardOutput(moviesRecmended)
  }
  const moviesView = () => {
    clearScreen()
    cardOutput(moviesViewed)
  }
  const japaneselan = () => {
    clearScreen()
    cardOutput(japaneseLanguage)
  }
  const spanishlan = () => {
    clearScreen()
    cardOutput(spanishLanguage)
  }
  const englishlan = () => {
    clearScreen()
    cardOutput(englishLanguage)
  }
  const filterMovies = () => {
    clearScreen()
    let moviesFiltered
    document.getElementById("ui").style.visibility = "visible";
    let genereSelect = document.getElementById("genereSelect");
    let yearSelect = document.getElementById("yearSelect");
    let languageSelect = document.getElementById("languageSelect");
    let ratingSelect = document.getElementById("rattingSelect");
    [genereSelect, languageSelect, yearSelect, ratingSelect].forEach(element => {
      element.addEventListener("change", () => {
        clearScreen();
        moviesFiltered = movies;

        if (genereSelect.value !== "All") {
          moviesFiltered = moviesFiltered.filter(movie => movie.genres.includes(genereSelect.value))
        }
        if (languageSelect.value !== "All") {
          moviesFiltered = moviesFiltered.filter(movie => movie.original_language === languageSelect.value.trim())
        }
        if (yearSelect.value !== "All") {
          moviesFiltered = moviesFiltered.filter(movie => movie.release_date.slice(0, 4) === yearSelect.value)
        }
        if (ratingSelect.value !== "All") {
          moviesFiltered = moviesFiltered.filter(movie => movie.vote_average == ratingSelect.value)

        }
        if (genereSelect.value === "All" && languageSelect.value === "All" && yearSelect.value === "All" && ratingSelect.value === "All") {
          moviesFiltered += moviesRecmended
        }
        cardOutput(moviesFiltered)
      })
    });
  }


  document.getElementById("btn1").addEventListener("click", recommendedMovies)
  document.getElementById("btn2").addEventListener("click", moviesView)
  document.getElementById("btn3").addEventListener("click", japaneselan)
  document.getElementById("btn4").addEventListener("click", spanishlan)
  document.getElementById("btn5").addEventListener("click", englishlan)
  document.getElementById("btn6").addEventListener("click", filterMovies)
})();
