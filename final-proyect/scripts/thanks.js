const parameters = new URLSearchParams(window.location.search);

const name = parameters.get("name");

const email = parameters.get("email");

const genre = parameters.get("genre");


const result = document.querySelector("#result");

result.innerHTML = `
Thanks, ${name}! <br>
We will contact you at: ${email} <br>
Favorite genre: ${genre}
`;