const parameters = new URLSearchParams(window.location.search);

const name = parameters.get("name");

const email = parameters.get("email");

const genre = parameters.get("genre");

const frequency = parameters.get("frequency");


const result = document.querySelector("#result");

result.innerHTML = `
Thanks, ${name}! you are a true <strong class="thank-strong">CineScoper</strong>! <br> <br>
We will contact you at: ${email} <br> <br>
Favorite genre: ${genre} <br> <br>
Watching frequency: ${frequency}
`;