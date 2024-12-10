let userScore = 0;
let compScore = 0;
let userStreak = 0;
let compStreak = 0;
let timer = 10;
let countdown;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const streakMsg = document.querySelector("#streak-msg");
const timerDisplay = document.querySelector("#timer");
const resetBtn = document.querySelector("#reset-btn");

const winSound = new Audio('./sounds/win.mp3');
const loseSound = new Audio('./sounds/lose.mp3');
const drawSound = new Audio('./sounds/draw.mp3');

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * 3)];
};

const updateStreak = () => {
    if (userStreak > 0) {
        streakMsg.innerText = `You're on a ${userStreak}-game winning streak!`;
        streakMsg.style.color = "#28a745";
    } else if (compStreak > 0) {
        streakMsg.innerText = `Computer is on a ${compStreak}-game winning streak!`;
        streakMsg.style.color = "#dc3545";
    } else {
        streakMsg.innerText = "";
    }
};

const startTimer = () => {
    clearInterval(countdown);
    timer = 10;
    timerDisplay.innerText = `Time Left: ${timer}s`;
    countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.innerText = `Time Left: ${timer}s`;
        } else {
            clearInterval(countdown);
            msg.innerText = "Time's up!";
            msg.style.backgroundColor = "#6c757d";
        }
    }, 1000);
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    startTimer();
    if (userChoice === compChoice) {
        drawSound.play();
        msg.innerText = "It's a draw!";
        msg.style.backgroundColor = "navy"; // Navy blue for draw
        msg.style.color = "#ffffff"; // White text for contrast
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        userScore++;
        userStreak++;
        compStreak = 0;
        winSound.play();
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green"; // Green for win
        msg.style.color = "#ffffff"; // White text for contrast
    } else {
        compScore++;
        compStreak++;
        userStreak = 0;
        loseSound.play();
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! ${compChoice} beats ${userChoice}.`;
        msg.style.backgroundColor = "red"; // Red for lose
        msg.style.color = "#ffffff"; // White text for contrast
    }
    updateStreak();
};

choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        const userChoice = e.currentTarget.getAttribute("data-choice");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the game?")) {
        userScore = 0;
        compScore = 0;
        userStreak = 0;
        compStreak = 0;
        userScorePara.innerText = userScore;
        compScorePara.innerText = compScore;
        streakMsg.innerText = "";
        msg.innerText = "Play your move!";
    }
});
