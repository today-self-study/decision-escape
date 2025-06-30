const form = document.getElementById('decision-form');
const questionInput = document.getElementById('question');
const choicesInput = document.getElementById('choices');
const resultDiv = document.getElementById('result');
const recentList = document.getElementById('recent-list');

const RECENT_KEY = 'decision_escape_recent';
const MAX_RECENT = 7;

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function saveRecent(question) {
  let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  recent = recent.filter(q => q !== question);
  recent.unshift(question);
  if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

function loadRecent() {
  let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  recentList.innerHTML = '';
  recent.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q;
    recentList.appendChild(li);
  });
}

function showResult(text) {
  resultDiv.textContent = text;
  resultDiv.classList.remove('show');
  setTimeout(() => {
    resultDiv.classList.add('show');
  }, 50);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const question = questionInput.value.trim();
  let choices = choicesInput.value.split(',').map(s => s.trim()).filter(Boolean);
  if (choices.length === 0) choices = ['예', '아니오'];
  const answer = getRandom(choices);
  showResult(`[${answer}]`);
  saveRecent(question);
  loadRecent();
});

window.addEventListener('DOMContentLoaded', loadRecent); 