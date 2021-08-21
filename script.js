"use strict";

const holdBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const renewBtn = document.querySelector(".btn--new");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");

let activePlayer, currentScore, gameState, scores;

const playerToggle = () => {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0.classList.toggle("player--active");
	player1.classList.toggle("player--active");
};

const init = () => {
	activePlayer = 0;
	currentScore = 0;
	scores = [0, 0];
	gameState = true;

	document.getElementById("current--0").textContent = 0;
	document.getElementById("current--1").textContent = 0;
	document.getElementById("score--0").textContent = 0;
	document.getElementById("score--1").textContent = 0;

	player0.classList.remove("player--winner");
	player1.classList.remove("player--winner");
	player0.classList.add("player--active");
	player1.classList.remove("player--active");
};
init();
rollBtn.addEventListener("click", () => {
	if (gameState) {
		let diceNumber = Math.trunc(Math.random() * 6) + 1;
		dice.classList.remove("hidden");
		dice.src = `dice-${diceNumber}.png`;

		if (diceNumber !== 1) {
			currentScore += diceNumber;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			playerToggle();
		}
	}
});

holdBtn.addEventListener("click", () => {
	if (gameState) {
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		if (scores[activePlayer] >= 100) {
			gameState = false;
			dice.classList.add("hidden");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
		}
		playerToggle();
	}
});

renewBtn.addEventListener("click", init);
