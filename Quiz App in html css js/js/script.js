const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Markup Language",
        d: "Hyper Tool Markup Language",
        correct: "a"
    },
    {
        question: "Who is making the Web standards?",
        a: "Mozilla",
        b: "Microsoft",
        c: "Google",
        d: "The World Wide Web Consortium",
        correct: "d"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        a: "<heading>",
        b: "<h6>",
        c: "<h1>",
        d: "<head>",
        correct: "c"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        a: "<break>",
        b: "<lb>",
        c: "<br>",
        d: "<line>",
        correct: "c"
    },
    {
        question: "What is the correct HTML for adding a background color?",
        a: "<body bg='yellow'>",
        b: "<body style='background-color:yellow;'>",
        c: "<background>yellow</background>",
        d: "<body background='yellow'>",
        correct: "b"
    },
    {
        question: "Choose the correct HTML element to define important text",
        a: "<important>",
        b: "<b>",
        c: "<i>",
        d: "<strong>",
        correct: "d"
    },
    {
        question: "Choose the correct HTML element to define emphasized text",
        a: "<italic>",
        b: "<em>",
        c: "<i>",
        d: "<emphasized>",
        correct: "b"
    },
    {
        question: "Which character is used to indicate an end tag?",
        a: "*",
        b: "/",
        c: "<",
        d: "^",
        correct: "b"
    },
    {
        question: "How can you make a numbered list?",
        a: "<ul>",
        b: "<ol>",
        c: "<dl>",
        d: "<list>",
        correct: "b"
    },
    {
        question: "How can you make a bulleted list?",
        a: "<ul>",
        b: "<ol>",
        c: "<dl>",
        d: "<list>",
        correct: "a"
    }
];

const quiz = document.getElementById("quiz");
const answersAll = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    resetAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    progressEl.innerText = `Question ${currentQuiz + 1} of ${quizData.length}`;
}

function resetAnswers() {
    answersAll.forEach((ansAll) => {
        ansAll.checked = false;
    });
}

function getSelected() {
    let answer;
    answersAll.forEach((ansAll) => {
        if (ansAll.checked) {
            answer = ansAll.id;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.classList.add("hidden");
            resultEl.classList.remove("hidden");
            scoreEl.innerText = `You answered ${score}/${quizData.length} questions correctly.`;
        }
    } else {
        alert("Please select an answer before submitting.");
    }
});
