const burgerBtn = document.querySelector("#burger-btn");
const nav = document.querySelector(".navigation");

burgerBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    burgerBtn.classList.toggle("open");
});

const currentYear = document.querySelector("#currentyear");
const today = new Date();

currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;

const url = "data/members.json"

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.company_members);
}

if (document.querySelector("#members")) {
    getMembersData();
}

function displayMembers(members) {
    const container = document.querySelector("#members");

    members.forEach(member => {
        const card = document.createElement("section");

        const name = document.createElement("h3");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const img = document.createElement("img");
        const link = document.createElement("a");
        const level = document.createElement("p");
        const levels = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        name.textContent = member.company_name;
        address.textContent = member.company_address;
        phone.textContent = `Phone: ${member.company_phone}`
        img.setAttribute("src", member.company_img);
        img.setAttribute("alt", `${member.company_name} Logo`);
        img.setAttribute("width", "440");
        img.setAttribute("height", "300");
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");

        link.setAttribute("href", member.company_url);
        link.textContent = "Visit Website";

        level.textContent = `Membership Level: ${levels[member.membership_level]}`;

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(img);
        card.appendChild(phone);
        card.appendChild(link);
        card.appendChild(level);

        container.appendChild(card);

    });
}

if (document.querySelector("#grid") && document.querySelector("#list")) {

    const gridBtn = document.querySelector("#grid");
    const listBtn = document.querySelector("#list");
    const membersContainer = document.querySelector("#members");

    gridBtn.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    });
}

async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displaySpotlights(data.company_members);
}

function displaySpotlights(members) {

    const container = document.querySelector("#spotlights");

    if (!container) return;

    const filtered = members.filter(member => member.membership_level >= 2);

    const random = filtered.sort(() => 0.5 - Math.random());

    const count = Math.floor(Math.random() * 2) + 2;
    const selected = random.slice(0, count);

    selected.forEach(member => {

        const card = document.createElement("section");

        const name = document.createElement("h3");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const img = document.createElement("img");
        const link = document.createElement("a");
        const level = document.createElement("p");
        const levels = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        name.textContent = member.company_name;
        address.textContent = member.company_address;
        phone.textContent = `Phone: ${member.company_phone}`
        img.setAttribute("src", member.company_img);
        img.setAttribute("alt", `${member.company_name} Logo`);
        img.setAttribute("width", "440");
        img.setAttribute("height", "300");
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");

        link.setAttribute("href", member.company_url);
        link.textContent = "Visit Website";

        level.textContent = `Membership Level: ${levels[member.membership_level]}`;

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(img);
        card.appendChild(phone);
        card.appendChild(link);
        card.appendChild(level);

        container.appendChild(card);

        
    });
}

if (document.querySelector("#spotlights")) {
    loadSpotlights();
}


// WEATHER

const myKey = "eacee60bcbfabb57859c1abb41020f05"
const myLat = "-33.46664621039968"
const myLon = "-70.66203999316937"

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;

async function apiFetch() {
    try {
        // NORMAL
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

        // FORECAST

        const forecastResponse = await fetch(forecastURL);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {

    const weatherIcon = document.querySelector("#weatherIcon");
    const temp = document.querySelector("#current-temp");
    const desc = document.querySelector("#weather-desc");

    temp.innerHTML = `Temperature: ${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let description = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", data.weather[0].description);
    desc.textContent = `${description}`;
}


function displayForecast(data) {

    const container = document.querySelector("#forecast");

    if (!container) return;

    container.innerHTML = "";

    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    const threeDays = daily.slice(0, 3);

    threeDays.forEach(day => {
        const card = document.createElement("p");

        const date = new Date(day.dt_txt);
        const temp = day.main.temp;

        card.textContent = `${date.toDateString()}: ${temp}°C`;

        container.appendChild(card);
    });

}


if (document.querySelector("#forecast")) {
    apiFetch();
}

//JOIN DIALOG



document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();

        modal.querySelector(".close-btn").addEventListener("click", () => {
            modal.close();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });

    });
});

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Thanks Page

const params = new URLSearchParams(window.location.search);

const results = document.querySelector("#results");

if (results) {
    const name = params.get("first");
    const last = params.get("last");
    const fullName = `${name || ""} ${last || ""}`;
    const email = params.get("email");
    const phone = params.get("phone");
    const business = params.get("business");
    const timestamp = params.get("timestamp");

    results.innerHTML = `
    <p><strong>Fullname:</strong> ${fullName || "Not provided"}</p>
    <p><strong>Email:</strong> ${ email || "Not provided"}</p>
    <p><strong>Phone:</strong> ${ phone || "Not provided"}</p>
    <p><strong>Business:</strong> ${ business || "Not provided"}</p>
    <p><strong>Submitted:</strong> ${ timestamp || "Not provided"}</p>
    `
    




}


// DIRECTORY

import { places } from "../data/directory.mjs";

const directoryInfo = document.querySelector(".directory-cards");

if (directoryInfo) {
    
    places.forEach((place, index) => {
        const isFirst = index === 0;

        const directoryCard = document.createElement("section");

        directoryCard.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
    <img src="${place.images}" alt="${place.name}" loading="${isFirst ? "eager" : "lazy"}" width="300" height="200" ${isFirst ? 'fetchpriority="high"' : ''}>
    </figure>
    <address>${place.location}</address>
    <p>${place.description}</p>
    <button>Learn More</button>
    `;

        directoryInfo.appendChild(directoryCard);
    });
}
 


// VISITS MESSAGE


const messageElement = document.querySelector("#visit-message");

const now = Date.now();

const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {

    message = "Welcome! Let us know if you have any questions.";
} else {
    const difference = now - Number(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {
        message = "Back so soon! Awesome!";
    } else if (days === 1) {

        message = "You last visited 1 day ago."
    } else {
        message = `You last visited ${days} days ago.`
    }
}

messageElement.textContent = message;

localStorage.setItem("lastVisit", now);