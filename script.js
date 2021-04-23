// DEPENDENCIES=================================================
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var startEl = document.getElementById("start");
var questionEl = document.getElementById("question-container");
var questionTitleEl = document.getElementById("question-title");
var initialInput = document.getElementById("intial-input");
var answerCheck = document.getElementById("answerCheck");
var finalScore = document.getElementById("final-score");
var highScoreEl = document.getElementById("highscore-section");
var submitInitialButton = document.getElementById("submit-initials");
var viewHighScoreLink = document.getElementById("view-highscore");
var userScoresEl = document.getElementById("user-scores");
var listOfHighScores = document.getElementById("listOfHighScores");
var goBackButton = document.getElementById("go-back");
var clearScoresButton = document.getElementById("clear-scores");
var initialInput = document.getElementById("initial-input");
var choiceA = document.getElementById("button1");
var choiceB = document.getElementById("button2");
var choiceC = document.getElementById("button3");
var choiceD = document.getElementById("button4");
// STARTING DATA================================================
var timeLeft = 90;
var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent
};
var scoreResult;
var questionIndex = 0;
var wins = 0
var questions = [
    {
        question: "What is the 8th planet from the sun?",
        choices: [
            "A. Mercury",
            "B. Saturn",
            "C. Uranus",
            "D. Neptune"
        ],
        answer: "D. Neptune"
    },
    {
        question: "Who was the first the first person in space?",
        choices: [
            "A. Amelia Earheart",
            "B. Louis Armstrong",
            "C. Yuri Gagarin",
            "D. Neil Young"
        ],
        answer: "C. Yuri Gagarin"
    },
    {
        question: "Who was the director of 2001: A Space Odyssey?",
        choices: [
            "A. Stanley Kubrick",
            "B. James Cameron",
            "C. Wes Anderson",
            "D. Greta Gerwig"
        ],
        answer: "A. Stanley Kubrick"
    },
    {
        question: "What is the surface of a blackhole called?",
        choices: [
            "A. Event Field",
            "B. Horizon",
            "C. Event Horizon",
            "D. Crust"
        ],
        answer: "C. Event Horizon"
    },
    {
        question: "What is the most common element in the universe?",
        choices: [
            "A. Helium",
            "B. Hydrogen",
            "C. Neon",
            "D. Californium"
        ],
        answer: "B. Hydrogen"
    }
];
// FUNCTIONS====================================================

function countdown() {
    questionIndex = 0;
    timeLeft = 90;
    timerEl.textContent = timeLeft;
    startEl.style.display = "none";
    questionEl.style.display = "block";
    
    var startTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);
    
    showQuiz();
}

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitleEl.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        wins++
        answerCheck.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        timerEl.textContent = timeLeft;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() {
    checkAnswer(0);
}

function chooseB() {
    checkAnswer(1);
}

function chooseC() {
    checkAnswer(2);
}

function chooseD() {
    checkAnswer(3);
}

function gameOver() {
    questionEl.style.display = "none";
    startEl.style.display = "none";
    highScoreEl.style.display = "block";
    userScoresEl.style.display = "block";


    finalScore.textContent = wins;
}

function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === " ") {
        alert("Please enter your initials!");
        return;
    }

    startEl.style.display = "none";
    timerEl.style.display = "none";
    highScoreEl.style.display= "block";

    var savedHighScores = localStorage.getItem("high scores")
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}


function showHighScores() {
    startEl.style.display = "none";
    timerEl.style.display = "none";
    questionEl.style.display = "none";
    highScoreEl.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (i = 0; i < storeHighScores.length; i++) {
        
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
            
    
    }


}

startButton.addEventListener("click", countdown);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialButton.addEventListener("click", function(event){
    storeHighScores(event);
});

viewHighScoreLink.addEventListener("click", function(event){
    showHighScores(event);
});

goBackButton.addEventListener("click", function(){
    startEl.style.display = "block";
    highScoreEl.style.display = "none";
    userScoresEl.style.display = "none";

});

clearScoresButton.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared";
});