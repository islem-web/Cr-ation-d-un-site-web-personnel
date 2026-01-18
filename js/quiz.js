const quizQuestions = [
    {
        question: "Quelle balise HTML5 est utilisée pour le contenu principal?",
        options: ["<main>", "<body>", "<section>", "<article>"],
        correct: 0
    },
    {
        question: "Quelle propriété CSS permet de créer des flexbox?",
        options: ["display: grid", "display: flex", "display: block", "display: inline"],
        correct: 1
    },
    {
        question: "Quelle méthode JavaScript permet de sélectionner un élément par son ID?",
        options: ["querySelector()", "getElementById()", "getElementsByClassName()", "querySelectorAll()"],
        correct: 1
    },
    {
        question: "Quelle classe Bootstrap crée un conteneur fluide?",
        options: [".container", ".container-fluid", ".row", ".col"],
        correct: 1
    },
    {
        question: "Quelle est la dernière version de HTML?",
        options: ["HTML4", "XHTML", "HTML5", "HTML6"],
        correct: 2
    },
    {
        question: "Quelle propriété CSS3 permet d'ajouter des ombres?",
        options: ["shadow", "box-shadow", "text-shadow", "shadow-effect"],
        correct: 1
    },
    {
        question: "Quelle méthode JavaScript convertit une chaîne en nombre?",
        options: ["toString()", "parseInt()", "toNumber()", "convert()"],
        correct: 1
    },
    {
        question: "Quelle classe Bootstrap est utilisée pour les boutons?",
        options: [".button", ".btn", ".click", ".action"],
        correct: 1
    },
    {
        question: "Quelle balise HTML5 est sémantique pour la navigation?",
        options: ["<div>", "<nav>", "<menu>", "<header>"],
        correct: 1
    },
    {
        question: "Comment déclarer une variable constante en JavaScript?",
        options: ["var", "let", "const", "constant"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Initialize Quiz
function initQuiz() {
    if (document.getElementById('quiz-container')) {
        loadQuestion();
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
        document.getElementById('prev-btn').addEventListener('click', prevQuestion);
        document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    }
}

// Load Current Question
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="quiz-question">
            <h4>Question ${currentQuestion + 1}/${quizQuestions.length}</h4>
            <p class="lead">${question.question}</p>
            <div id="options-container">
                ${question.options.map((option, index) => `
                    <div class="quiz-option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
                         onclick="selectOption(${index})">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    updateProgress();
    updateButtons();
}

// Select Option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
}

// Next Question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `Question ${currentQuestion + 1} sur ${quizQuestions.length}`;
}

// Update Navigation Buttons
function updateButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').style.display = 
        currentQuestion === quizQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = 
        currentQuestion === quizQuestions.length - 1 ? 'inline-block' : 'none';
}

// Submit Quiz and Calculate Score
function submitQuiz() {
    score = 0;
    const results = [];
    
    quizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        if (isCorrect) score++;
        
        results.push({
            question: question.question,
            userAnswer: question.options[userAnswers[index]] || "Non répondu",
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect
        });
    });
    
    displayResults(score, results);
}

// Display Results
function displayResults(finalScore, results) {
    const percentage = (finalScore / quizQuestions.length) * 100;
    const resultHTML = `
        <div class="alert ${percentage >= 70 ? 'alert-success' : percentage >= 50 ? 'alert-warning' : 'alert-danger'}">
            <h4><i class="fas fa-chart-bar me-2"></i>Résultats du Quiz</h4>
            <p>Votre score: <strong>${finalScore}/${quizQuestions.length}</strong> (${percentage.toFixed(1)}%)</p>
            <p>${getResultMessage(percentage)}</p>
        </div>
        <h5 class="mt-4"><i class="fas fa-list-check me-2"></i>Réponses détaillées:</h5>
        ${results.map((result, index) => `
            <div class="card mb-3 ${result.isCorrect ? 'border-success' : 'border-danger'}">
                <div class="card-body">
                    <h6>Question ${index + 1}: ${result.question}</h6>
                    <p class="${result.isCorrect ? 'text-success' : 'text-danger'}">
                        <i class="fas ${result.isCorrect ? 'fa-check' : 'fa-times'} me-2"></i>
                        Votre réponse: ${result.userAnswer}
                    </p>
                    ${!result.isCorrect ? `
                        <p class="text-success">
                            <i class="fas fa-check me-2"></i>
                            Réponse correcte: ${result.correctAnswer}
                        </p>
                    ` : ''}
                </div>
            </div>
        `).join('')}
        <button class="btn btn-primary" onclick="restartQuiz()">
            <i class="fas fa-redo me-2"></i>Recommencer le Quiz
        </button>
    `;
    
    document.getElementById('quiz-container').innerHTML = resultHTML;
    document.querySelector('.quiz-navigation').style.display = 'none';
}

// Get Result Message
function getResultMessage(percentage) {
    if (percentage >= 90) return "Excellent ! Vous maîtrisez parfaitement le sujet !";
    if (percentage >= 70) return "Très bien ! Vous avez de bonnes connaissances.";
    if (percentage >= 50) return "Passable. Continuez à pratiquer !";
    return "Insuffisant. Il faut revoir les bases.";
}

// Restart Quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.querySelector('.quiz-navigation').style.display = 'block';
    initQuiz();
}

// Form Validation for Contact Page
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showAlert('Veuillez remplir tous les champs obligatoires.', 'danger');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Veuillez entrer une adresse email valide.', 'danger');
                return;
            }
            
            // Simulate form submission
            showAlert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            form.reset();
        });
    }
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show Alert Message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.className = 'fas fa-sun';
        }
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    validateContactForm();
    initThemeToggle();
    initSmoothScroll();
});