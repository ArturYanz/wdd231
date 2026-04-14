const container = document.querySelector(".movies-container");

async function getMovies() { 
    try {
        const response = await fetch("data/movies.json");

        if (!response.ok) {
            throw new Error("Error loading data");
        }

        const data = await response.json();
        
        console.log(data);
        displayMovies(data);
    } catch (error) {
        console.error(error);
    }
}

if (container) {
    getMovies();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


function displayMovies(movies) {
    container.innerHTML = "";

    const randomMovies = shuffleArray(movies);

    randomMovies.forEach((movie, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("movie-card")

        card.innerHTML = `
        <img src="${movie.image}" alt=" Poster of the movie ${movie.title}" loading="${index < 3 ? 'eager' : 'lazy'}" fetchpriority="${index < 5 ? 'high' : 'auto'} width="300" height="450">
        <h3>${movie.title}</h3>
        <p class="genre">${movie.genre}</p>
        <p class="year"><strong>${movie.year}</strong></p>
        <p class="rating">★ <strong>${movie.rating}</strong></p>
        `;

        card.addEventListener("click", () => {
            openModal(movie);
        });

        container.appendChild(card);
    });
}

const modal = document.querySelector("#movie-modal");
const modalBody = document.querySelector("#modal-body");
const closeBtn = document.querySelector(".close-btn");


function openModal(movie) {
    localStorage.setItem("lastMovie", JSON.stringify(movie));


    modalBody.innerHTML = `
    <h2>${movie.title}</h2> <br>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Year:</strong> ${movie.year}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p><strong>Director:</strong> ${movie.director}</p> <br>
    <p>${movie.description}</p>
    `;

    modal.style.display = "flex";
}


if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function showLastMovie() {
    const saved = localStorage.getItem("lastMovie");

    if (saved) {
        const movie = JSON.parse(saved);
        
        const lastMovieText = document.querySelector("#last-movie");

        if (lastMovieText) {
            lastMovieText.textContent = `Last viewed: ${movie.title}`;
        }
    }
}

showLastMovie();

const featuredContainer = document.querySelector(".featured")

async function getFeaturedMovies() {
    try {
        const response = await fetch("data/movies.json");

        if (!response.ok) {
            throw new Error("Error loading data");
        }

        const data = await response.json();

        displayFeatured(data);

    } catch (error) {
        console.error(error);
    }
}



function displayFeatured(movies) {

    
    if (!featuredContainer) return;

   
    const featured = shuffleArray(movies).slice(0, 3);

    featured.forEach(movie => {
        featuredContainer.innerHTML += `
        <div class="home-card">
            <img src="${movie.image}" alt=" Poster of the movie ${movie.title}" loading="lazy" width="300" height="450">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
        </div>
        `;
    });
}



if (featuredContainer) {
    getFeaturedMovies();
}


const currentYear = document.querySelector("#currentyear");
const today = new Date();

currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}