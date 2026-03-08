const currentYear = document.querySelector("#currentyear");

const today = new Date();

currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;