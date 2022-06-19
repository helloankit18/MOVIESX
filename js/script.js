"use strict";

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
      ].style.backgroundImage = `linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(17, 17, 17, 0.5) 80%,
        rgba(52, 52, 52, 0) 100%
      ), url(https://image.tmdb.org/t/p/w1280${arr[i].backdrop_path})`;
    }
  });

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
