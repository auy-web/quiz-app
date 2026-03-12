const questions = [
    {
        question: "Which hook is used for side effects in React?",
        answers: [
            { text: "useState", correct: false },
            { text: "useEffect", correct: true },
            { text: "useContext", correct: false },
            { text: "useReducer", correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Management", correct: false },
            { text: "Digital Ordinance Model", correct: false },
            { text: "Document Online Management", correct: false }
        ]
    }
];

class QuizApp {
    constructor(questions) {
        this.questions = questions;
        this.currentIdx = 0;
        this.score = 0;
        
        // DOM Elements
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.questionCont = document.getElementById('question-container');
        this.setupScreen = document.getElementById('setup-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionElement = document.getElementById('question-text');
        this.answerButtonsElement = document.getElementById('answer-buttons');
        this.progressElement = document.getElementById('progress');

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.start());
        this.nextBtn.addEventListener('click', () => {
            this.currentIdx++;
            this.setNextQuestion();
        });
    }

    start() {
        this.setupScreen.classList.add('hide');
        this.questionCont.classList.remove('hide');
        this.setNextQuestion();
    }

    setNextQuestion() {
        this.resetState();
        this.showQuestion(this.questions[this.currentIdx]);
        this.progressElement.innerText = `Question ${this.currentIdx + 1} of ${this.questions.length}`;
    }

    showQuestion(question) {
        this.questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) button.dataset.correct = answer.correct;
            button.addEventListener('click', (e) => this.selectAnswer(e));
            this.answerButtonsElement.appendChild(button);
        });
    }

    resetState() {
        this.nextBtn.classList.add('hide');
        while (this.answerButtonsElement.firstChild) {
            this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild);
        }
    }

    selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) this.score++;
        
        Array.from(this.answerButtonsElement.children).forEach(button => {
            this.setStatusClass(button, button.dataset.correct === "true");
            button.disabled = true; // Prevent multiple clicks
        });

        if (this.questions.length > this.currentIdx + 1) {
            this.nextBtn.classList.remove('hide');
        } else {
            this.showResults();
        }
    }

    setStatusClass(element, correct) {
        element.classList.add(correct ? 'correct' : 'wrong');
    }

    showResults() {
        this.questionCont.classList.add('hide');
        this.resultScreen.classList.remove('hide');
        document.getElementById('score-text').innerText = `You scored ${this.score} out of ${this.questions.length}!`;
    }
}

// Initialize the App
new QuizApp(questions);