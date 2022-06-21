"use strict";

// Top Rated Section
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=c6f7e03abe070c06a55335e2c824f3d3&language=en-US&page=1"
)
  .then((response) => response.json())
  .then((data) => {
    const arr = data.results;
    console.log(arr);
    const title = document.querySelector(".hero-movie-details");
    const image = document.querySelector(".slideshow-container");

    for (const [i, x] of arr.entries()) {
      title.innerHTML += `
        <p class="category category-${i + 1}">TOP RATED</p>
        <div class="movie movie-no-${i + 1}">
        <p class="hero-title"></p>
          <p class="hero-description">
          </p>
          <div class="votes flexbox">
            <div class="vote-avg"></div>
            <div class="vote-count"></div>
            <div class="language"></div>
          </div>
        <button class="watchlist-btn flexbox"><i class="fa-solid fa-square-plus icon watchlist-icon"></i>add to watchlist</button>
        </div>`;

      image.innerHTML += `
        <div class="mySlides mySlides-${
          i + 1
        } fade" style="background-image: none"></div>`;

      document.querySelectorAll(".hero-title")[i].textContent =
        arr[i].original_title;
      document.querySelectorAll(".hero-description")[i].textContent =
        arr[i].overview;
      document.querySelectorAll(".vote-avg")[
        i
      ].textContent = `${arr[i].vote_average} ⭐`;
      document.querySelectorAll(".vote-count")[
        i
      ].textContent = `(${arr[i].vote_count} ratings)`;
      document.querySelectorAll(".language")[
        i
      ].textContent = `(${arr[i].original_language})`;
      document.querySelectorAll(".mySlides")[
        i
      ].style.backgroundImage = `linear-gradient(0deg,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(17, 17, 17, 0.5) 80%,
          rgba(52, 52, 52, 0) 100%
        ), url(https://image.tmdb.org/t/p/w1280${arr[i].backdrop_path})`;
    }
  });

// Trending Section

fetch(
  `https://api.themoviedb.org/3/trending/all/day?api_key=c6f7e03abe070c06a55335e2c824f3d3`
)
  .then((response) => response.json())
  .then((data) => {
    const arr = data.results;
    console.log(arr);
    const grid = document.querySelector(".grid-container-trending");
    for (let i = 0; i < 12; i++) {
      grid.innerHTML += `
        <div class="card card-${i + 1}">
          <img class="card-img" src="">
          <div class="card-rating">${arr[i].vote_average}⭐</div>
          <div class="card-description">${arr[i].overview}</div>
          <button class="card-watchlist-btn flexbox"><i class="fa-solid fa-square-plus trending-icon"></i></button>
        </div>`;
      document.querySelectorAll(".card-img")[
        i
      ].src = `https://image.tmdb.org/t/p/w185/${arr[i].poster_path}`;
    }
  });

// Upcoming section
let genres = new Map();

fetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=c6f7e03abe070c06a55335e2c824f3d3&language=en-US`
)
  .then((response) => response.json())
  .then((data) => {
    const arr = data.genres;
    for (const x of arr) {
      genres.set(x.id, x.name);
    }
    console.log(genres);
  });

let genreColor = new Map();
genreColor.set("Action", "red");
genreColor.set("Adventure", "yellow");
genreColor.set("Animation", "yellow");
genreColor.set("Comedy", "yellow");
genreColor.set("Crime", "red");
genreColor.set("Documentary", "blue");
genreColor.set("Drama", "blue");
genreColor.set("Family", "yellow");
genreColor.set("Fantasy", "pink");
genreColor.set("History", "pink");
genreColor.set("Horror", "red");
genreColor.set("Music", "yellow");
genreColor.set("Mystery", "blue");
genreColor.set("Romance", "pink");
genreColor.set("Science Fiction", "blue");
genreColor.set("TV Movie", "blue");
genreColor.set("Thriller", "red");
genreColor.set("War", "red");
genreColor.set("Western", "blue");
let page = 1;

function fetchUpcoming(page) {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=c6f7e03abe070c06a55335e2c824f3d3&language=en-US&page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      const arr = data.results;
      console.log(arr);
      const grid = document.querySelector(".grid-container-upcoming");
      if (grid.innerHTML != "") {
        grid.innerHTML = "";
      }
      for (let i = 0; i < 6; i++) {
        const primaryGenre = genres.get(arr[i].genre_ids[0]);
        grid.innerHTML += `
          <div class="card card-${i + 1}">
            <div class="card-genre">${primaryGenre}</div>
            <img class="card-img upcoming" src="">
            <div class=" card-rating card-release-date">${
              arr[i].release_date
            }</div>
            <div class="card-description">${arr[i].overview}</div>
            <button class="card-watchlist-btn flexbox"><i class="fa-solid fa-square-plus trending-icon"></i></button>
          </div>`;
        document.querySelectorAll(".upcoming")[
          i
        ].src = `https://image.tmdb.org/t/p/w185/${arr[i].poster_path}`;
        document.querySelectorAll(".card-genre")[
          i
        ].style.backgroundColor = `${genreColor.get(primaryGenre)}`;
        document.querySelectorAll(".card-genre")[i].style.color =
          document.querySelectorAll(".card-genre")[i].style.backgroundColor ==
          ("yellow" || "blue" || "pink")
            ? "#000"
            : "#fff";
      }
    });
}

fetchUpcoming();

function getGenreColor(genre) {
  return;
}

function plusUpcoming() {
  page += 1;
  fetchUpcoming(page);
}

function minusUpcoming() {
  if (page == 1) return;
  page -= 1;
  fetchUpcoming(page);
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let slideDescription = document.getElementsByClassName("movie");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slideDescription[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  slideDescription[slideIndex - 1].style.display = "block";
}

function addToWatchList() {
  document.querySelectorAll(".watchlist-btn");
  document.querySelectorAll(".card-watchlist-btn");
}
