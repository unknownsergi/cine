//querySelector(p, ul, #id, .classes)

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seats:not(.occupied)");
const counter = document.getElementById("couter");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

console.log(ticketPrice);
