const buttons = document.querySelectorAll(".move-btn");
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const resultEl = document.getElementById("result");
const finalMessageEl = document.getElementById("finalMessage");

const winEl = document.getElementById("win");
const lostEl = document.getElementById("lost");
const tieEl = document.getElementById("tie");

const roundSelect = document.getElementById("roundSelect");
const resetBtn = document.getElementById("reset");

let score = { win: 0, lost: 0, tie: 0 };
let totalRounds = Number(roundSelect.value);
let roundsPlayed = 0;


const moves = ["STONE", "PAPER", "SCISSOR"];
const icons = {
  STONE: "✊",
  PAPER: "✋",
  SCISSOR: "✌️",
};

function computerMove() {
  return moves[Math.floor(Math.random() * 3)];
}

function decideWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "STONE" && computer === "SCISSOR") ||
    (player === "PAPER" && computer === "STONE") ||
    (player === "SCISSOR" && computer === "PAPER")
  ) {
    return "win";
  }
  return "lost";
}

function updateUI() {
  winEl.textContent = score.win;
  lostEl.textContent = score.lost;
  tieEl.textContent = score.tie;
}


function playRound(playerChoice) {
  if (roundsPlayed >= totalRounds) return;

  roundsPlayed++;

  const compChoice = computerMove();

  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  setTimeout(() => {
    playerHand.textContent = icons[playerChoice];
    computerHand.textContent = icons[compChoice];

    const result = decideWinner(playerChoice, compChoice);

    if (result === "win") {
      score.win++;
      resultEl.textContent = "🔥You Won This Round 🔥!";
      launchConfetti();
    } else if (result === "lost") {
      score.lost++;
      resultEl.textContent = "Computer Won This Round!";
    } else {
      score.tie++;
      resultEl.textContent = "This Round is a Tie!";
    }

    updateUI();

    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    // FINAL RESULT CHECK
    if (roundsPlayed === totalRounds) {
      showFinalResult();
    }
  }, 800);
}
function showFinalResult() {
  let finalMessage = "";

  if (score.win > score.lost) {
    finalMessage = "🏆 You won the game! 🏆";
    launchConfetti();
  } else if (score.win < score.lost) {
    finalMessage = "💻 Computer won the game 💻";
  } else {
    finalMessage = "🤝 Game tied 🤝";
  }

  // Display Game Over message
  resultEl.textContent = "Game Over!";
  finalMessageEl.textContent = finalMessage;

  // Disable buttons to prevent extra clicks
  buttons.forEach(btn => btn.disabled = true);

  // ✅ Automatically reset the game after 8 seconds
  setTimeout(() => {
    resetGame(); // resets scores, UI, and rounds
  }, 8000);
}


function resetGame() {
  score = { win: 0, lost: 0, tie: 0 };
  roundsPlayed = 0;

  updateUI();

  resultEl.textContent = "";
  finalMessageEl.textContent = "";
  playerHand.textContent = "👤";
  computerHand.textContent = "💻";

  buttons.forEach(btn => btn.disabled = false);
}


roundSelect.addEventListener("change", () => {
  totalRounds = Number(roundSelect.value);
  resetGame();
});


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    playRound(btn.dataset.move);
  });
});


resetBtn.addEventListener("click", () => {
  resetGame();
});

/* Simple Confetti */
function launchConfetti() {
  document.body.style.background =
    "linear-gradient(135deg, #dcfce7, #f0fdf4)";
  setTimeout(() => {
    document.body.style.background =
      "linear-gradient(135deg, #eef2ff, #f8fafc)";
  }, 600);
}
