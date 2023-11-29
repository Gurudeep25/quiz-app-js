const questions = [
    {
        question: "Which front-end framework is widely used nowadays?",
        answers: [
            { text: "Vue", correct: false},
            { text: "Angular", correct: false},
            { text: "React", correct: true},
            { text: "Tailwind CSS", correct: false},
        ]
    },
    {
        question: "Which back-end technology is single threaded and event driven JS runtime environment?",
        answers: [
            { text: "Node JS", correct: true},
            { text: "Django", correct: false},
            { text: "Spring Boot", correct: false},
            { text: "Laravel", correct: false},
        ]
    },
    {
        question: "A noSQL database that has no schema and stores data in BSON format?",
        answers: [
            { text: "MySQL", correct: false},
            { text: "PostgreSQL", correct: false},
            { text: "Oracle Database", correct: false},
            { text: "MongoDB", correct: true},
        ]
    },
    {
        question: "Which framework is capable of both client and server side rendering?",
        answers: [
            { text: "React JS", correct: false},
            { text: "Next JS", correct: true},
            { text: "Node JS", correct: false},
            { text: "Bootstrap", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    } 
}

function selectAnswer() {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();