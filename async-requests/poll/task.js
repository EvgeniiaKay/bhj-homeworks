const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

function renderPoll(id, title, answers) {
  pollTitle.textContent = title;

  pollAnswers.innerHTML = '';

  answers.forEach((answer, index) => {
    const buttonHTML = `
      <button class="poll__answer">${answer}</button>
    `;
    pollAnswers.insertAdjacentHTML('beforeend', buttonHTML);
  });

  const buttons = pollAnswers.querySelectorAll('.poll__answer');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => handleVote(id, index));
  });
}

function renderResults(stat) {
  pollAnswers.innerHTML = '';
  pollAnswers.classList.remove('poll__answers_active');

  const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);
  stat.forEach(item => {
    const percentage = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;
    const resultHTML = `
      <div class="poll__result">
        <span>${item.answer}</span>: ${item.votes} голосов (${percentage}%)
      </div>
    `;
    pollAnswers.insertAdjacentHTML('beforeend', resultHTML);
  });
}

async function handleVote(voteId, answerIndex) {
  alert('Спасибо, ваш голос засчитан!');

  try {
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `vote=${voteId}&answer=${answerIndex}`
    });

    if (!response.ok) throw new Error('Ошибка сети');

    const data = await response.json();
    renderResults(data.stat);
  } catch (error) {
    console.error('Ошибка при голосовании:', error);
    pollAnswers.innerHTML = '<div>Ошибка загрузки результатов</div>';
  }
}

async function loadPoll() {
  try {
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
    if (!response.ok) throw new Error('Ошибка сети');

    const data = await response.json();
    renderPoll(data.id, data.data.title, data.data.answers);
  } catch (error) {
    console.error('Ошибка загрузки опроса:', error);
    pollTitle.textContent = 'Ошибка загрузки опроса';
  }
}

document.addEventListener('DOMContentLoaded', loadPoll);