const container = document.querySelector(".movies-container");

async function getMovies() { 
    try {
        const response = await fetch("data/movies.json");

        if (!response.ok) {
            throw new Error("Error loading data");
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getMovies();