//querySelector(p, ul, #id, .classes)

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seats:not(.occupied)");
const counter = document.getElementById("counter");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count
function updateSelectedSeats() {
	const selectedSeats = document.querySelectorAll(".row .seats.selected");

	const seatsIndex = [...selectedSeats].map(function (seat) {
		return [...seats].indexOf(seat);
	});

	// const seatsIndexArrow = [...selectedSeats].map((seat) => {
	// 	return [...seats].indexOf(seat);
	// });

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
	const selectedSeatsCounter = selectedSeats.length;

	counter.innerText = selectedSeatsCounter;
	total.innerText = ticketPrice * selectedSeatsCounter;
}

// get data from localStorage and populate the ui
function populateUI() {
	// JSON parse to get it converted back to array
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}
	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("seats") && !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected");
		updateSelectedSeats();
	}
});

movieSelect.addEventListener("change", (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);

	updateSelectedSeats();
});

updateSelectedSeats();
