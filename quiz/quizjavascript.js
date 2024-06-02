let question_count = 0;
let selectedOption;
let timer;
let time = 0;

let questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    // Add more questions as needed
];

function startQuiz() {
    loadQuestion(questions[question_count]);
    document.getElementById('mainBody').style.display = 'block';
    document.getElementById('mainPanel').style.display = 'none';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('adminBtn').style.display = 'none';
    startTimer();
}

function loadQuestion(question) {
    document.getElementById('quizHeader').innerHTML = `<h3>Question ${question_count + 1}</h3>`;
    document.getElementById('quizBody').innerHTML = `
        <div>${question.question}</div>
        <ul class="option_group">
            ${question.options.map((option, index) => `
                <li class="option" onclick="selectOption(this, ${index})">${option}</li>
            `).join('')}
        </ul>
    `;
}

function selectOption(element, index) {
    let options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('active'));
    element.classList.add('active');
    selectedOption = index;
}

function nextQuestion() {
    if (typeof selectedOption === 'undefined') {
        alert('Please select an option!');
        return;
    }
    question_count++;
    if (question_count < questions.length) {
        loadQuestion(questions[question_count]);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('adminBtn').style.display = 'block';
    clearInterval(timer);
    alert('Quiz Ended!');
}

function startTimer() {
    timer = setInterval(function() {
        time++;
        document.getElementById('timer').innerText = time;
    }, 1000);
}

function adminPanel() {
    document.getElementById('mainPanel').style.display = 'block';
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('adminBtn').style.display = 'none';
    displayQuestions();
}

function displayQuestions() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = questions.map((q, index) => `
        <div>
            <b>Q${index + 1}:</b> ${q.question}
            <button onclick="deleteQuestion(${index})">Delete</button>
            <button onclick="editQuestion(${index})">Edit</button>
        </div>
    `).join('');
}

function addQuestion() {
    const newQuestion = document.getElementById('newQuestion').value;
    const newOption1 = document.getElementById('newOption1').value;
    const newOption2 = document.getElementById('newOption2').value;
    const newOption3 = document.getElementById('newOption3').value;
    const newOption4 = document.getElementById('newOption4').value;
    const newAnswer = parseInt(document.getElementById('newAnswer').value);

    questions.push({
        question: newQuestion,
        options: [newOption1, newOption2, newOption3, newOption4],
        answer: newAnswer
    });

    displayQuestions();
    clearAdminForm();
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    displayQuestions();
}

function editQuestion(index) {
    const question = questions[index];
    document.getElementById('newQuestion').value = question.question;
    document.getElementById('newOption1').value = question.options[0];
    document.getElementById('newOption2').value = question.options[1];
    document.getElementById('newOption3').value = question.options[2];
    document.getElementById('newOption4').value = question.options[3];
    document.getElementById('newAnswer').value = question.answer;
    deleteQuestion(index);
}

function clearAdminForm() {
    document.getElementById('newQuestion').value = '';
    document.getElementById('newOption1').value = '';
    document.getElementById('newOption2').value = '';
    document.getElementById('newOption3').value = '';
    document.getElementById('newOption4').value = '';
    document.getElementById('newAnswer').value = '';
}

function homePage() {
    document.getElementById('mainPanel').style.display = 'none';
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('adminBtn').style.display = 'block';
}
