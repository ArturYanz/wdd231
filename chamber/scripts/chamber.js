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

getMembersData();

function displayMembers(members) {
    const container = document.querySelector("#members");

    members.forEach(member => {
        const card = document.createElement("section");

        const name = document.createElement("h3");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const img = document.createElement("img");
        const link = document.createElement("a");

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

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(img);
        card.appendChild(phone);
        card.appendChild(link);

        container.appendChild(card);

    });
}

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