// Kahoot-style Quiz Application
class KahootQuiz {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = 0;
    this.timeLeft = 20;
    this.timer = null;
    this.answersGiven = [];
    
    // DOM elements
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.resultsScreen = document.getElementById('results-screen');
    this.quizForm = document.getElementById('quiz-form');
    
    this.init();
  }
  
  init() {
    this.quizForm.addEventListener('submit', (e) => this.startQuiz(e));
    
    // Play again button
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('play-again-btn')) {
        this.resetQuiz();
      }
    });
  }
  
  async loadQuestions() {
    try {
      const response = await fetch('../data/quiz-questions.json');
      const allQuestions = await response.json();
      return allQuestions;
    } catch (error) {
      console.error('Error loading questions:', error);
      throw new Error('Không thể tải câu hỏi. Vui lòng thử lại.');
    }
  }
  
  filterQuestions(questions, { amount, difficulty, category }) {
    let filtered = questions;
    
    // Filter by difficulty
    if (difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(q => q.category === category);
    }
    
    // Shuffle and limit
    filtered = filtered.sort(() => Math.random() - 0.5);
    return filtered.slice(0, amount);
  }
  
  async startQuiz(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const settings = {
      amount: parseInt(formData.get('amount')),
      difficulty: formData.get('difficulty'),
      category: formData.get('category')
    };
    
    try {
      const allQuestions = await this.loadQuestions();
      this.questions = this.filterQuestions(allQuestions, settings);
      
      if (this.questions.length === 0) {
        alert('Không tìm thấy câu hỏi phù hợp. Vui lòng thử cài đặt khác.');
        return;
      }
      
      this.totalQuestions = this.questions.length;
      this.showGameScreen();
      this.showQuestion();
    } catch (error) {
      alert(error.message);
    }
  }
  
  showGameScreen() {
    this.welcomeScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.resultsScreen.style.display = 'none';
  }
  
  showResultsScreen() {
    this.welcomeScreen.style.display = 'none';
    this.gameScreen.style.display = 'none';
    this.resultsScreen.style.display = 'block';
  }
  
  showWelcomeScreen() {
    this.welcomeScreen.style.display = 'block';
    this.gameScreen.style.display = 'none';
    this.resultsScreen.style.display = 'none';
  }
  
  showQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults();
      return;
    }
    
    const question = this.questions[this.currentQuestionIndex];
    
    // Update progress
    this.updateProgress();
    
    // Update question
    document.querySelector('.question-text').textContent = question.question;
    
    // Update answers
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
      const answerText = btn.querySelector('.answer-text');
      if (question.answers[index]) {
        answerText.textContent = question.answers[index];
        btn.style.display = 'flex';
        btn.disabled = false;
        btn.className = btn.className.replace(/ (correct|incorrect|disabled)/g, '');
      } else {
        btn.style.display = 'none';
      }
    });
    
    // Add event listeners
    this.addAnswerListeners();
    
    // Start timer
    this.startTimer();
  }
  
  addAnswerListeners() {
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
      btn.onclick = () => this.selectAnswer(index);
    });
  }
  
  selectAnswer(selectedIndex) {
    this.stopTimer();
    
    const question = this.questions[this.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Calculate score based on speed
    let points = 0;
    if (isCorrect) {
      points = Math.max(500, 1000 - (20 - this.timeLeft) * 25);
      this.score += points;
    }
    
    // Record answer
    this.answersGiven.push({
      questionIndex: this.currentQuestionIndex,
      selectedAnswer: selectedIndex,
      correctAnswer: question.correct,
      isCorrect: isCorrect,
      points: points,
      timeLeft: this.timeLeft
    });
    
    // Visual feedback
    this.showAnswerFeedback(selectedIndex, question.correct);
    
    // Auto advance after 2 seconds
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }
  
  showAnswerFeedback(selectedIndex, correctIndex) {
    const answerBtns = document.querySelectorAll('.answer-btn');
    
    answerBtns.forEach((btn, index) => {
      btn.disabled = true;
      btn.classList.add('disabled');
      
      if (index === correctIndex) {
        btn.classList.add('correct');
      } else if (index === selectedIndex && selectedIndex !== correctIndex) {
        btn.classList.add('incorrect');
      }
    });
    
    // Play sound effects (if implemented)
    this.playAnswerSound(selectedIndex === correctIndex);
  }
  
  playAnswerSound(isCorrect) {
    // Simple audio feedback using Web Audio API or pre-loaded sounds
    if (window.AudioContext || window.webkitAudioContext) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const frequency = isCorrect ? 800 : 300;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  }
  
  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.timeLeft = 20;
      this.showQuestion();
    } else {
      this.showResults();
    }
  }
  
  startTimer() {
    this.timeLeft = 20;
    this.updateTimer();
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      
      if (this.timeLeft <= 0) {
        this.selectAnswer(-1); // Time's up, no answer selected
      }
    }, 1000);
  }
  
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  updateTimer() {
    const timerText = document.querySelector('.timer-text');
    if (timerText) {
      timerText.textContent = this.timeLeft;
      
      // Change color based on time left
      const timerCircle = document.querySelector('.timer-circle');
      if (this.timeLeft <= 5) {
        timerCircle.style.borderColor = '#e74c3c';
        timerText.style.color = '#e74c3c';
      } else if (this.timeLeft <= 10) {
        timerCircle.style.borderColor = '#f39c12';
        timerText.style.color = '#f39c12';
      } else {
        timerCircle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        timerText.style.color = 'white';
      }
    }
  }
  
  updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const questionCounter = document.querySelector('.question-counter');
    const scoreText = document.querySelector('.score-text');
    
    const progressPercentage = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
    
    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (questionCounter) {
      questionCounter.textContent = `Câu ${this.currentQuestionIndex + 1}/${this.totalQuestions}`;
    }
    
    if (scoreText) {
      scoreText.textContent = `Điểm: ${this.score}`;
    }
  }
  
  showResults() {
    this.showResultsScreen();
    
    const percentage = Math.round((this.score / (this.totalQuestions * 1000)) * 100);
    const correctAnswers = this.answersGiven.filter(a => a.isCorrect).length;
    
    // Update results display
    const finalScore = document.querySelector('.final-score');
    const scoreBreakdown = document.querySelector('.score-breakdown');
    
    if (finalScore) {
      finalScore.innerHTML = `
        <div>${this.score} điểm</div>
        <div style="font-size: 1.5rem;">${correctAnswers}/${this.totalQuestions} câu đúng</div>
      `;
    }
    
    if (scoreBreakdown) {
      let message = '';
      if (percentage >= 80) message = 'Xuất sắc! Bạn hiểu rất rõ về tư tưởng Hồ Chí Minh!';
      else if (percentage >= 60) message = 'Khá tốt! Bạn có kiến thức vững chắc.';
      else if (percentage >= 40) message = 'Cần cố gắng thêm! Hãy ôn tập thêm.';
      else message = 'Bạn cần học thêm về tư tưởng Hồ Chí Minh.';
      
      scoreBreakdown.innerHTML = `
        <p>${message}</p>
        <p>Tốc độ trả lời trung bình: ${this.calculateAverageSpeed()}s</p>
      `;
    }
  }
  
  calculateAverageSpeed() {
    const totalTime = this.answersGiven.reduce((sum, answer) => {
      return sum + (20 - answer.timeLeft);
    }, 0);
    return (totalTime / this.answersGiven.length).toFixed(1);
  }
  
  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeLeft = 20;
    this.answersGiven = [];
    this.stopTimer();
    this.showWelcomeScreen();
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new KahootQuiz();
});
