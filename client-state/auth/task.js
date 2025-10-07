const signinForm = document.getElementById('signin__form');
const signinBtn = document.getElementById('signin__btn');
const signinBlock = document.getElementById('signin');
const welcomeBlock = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

const errorMessage = document.createElement('div');
errorMessage.className = 'error-message';
errorMessage.style.color = 'red';
errorMessage.style.marginBottom = '10px';
signinForm.appendChild(errorMessage);

function showWelcome(userId) {
    userIdSpan.textContent = userId;
    welcomeBlock.classList.add('welcome_active');
    signinBlock.classList.remove('signin_active');

    const logoutButtonHTML = `
    <button class="btn" id="logout__btn">Выйти</button>
  `;
    welcomeBlock.insertAdjacentHTML('beforeend', logoutButtonHTML);

    const logoutBtn = document.getElementById('logout__btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userId');
        welcomeBlock.classList.remove('welcome_active');
        signinBlock.classList.add('signin_active');
        logoutBtn.remove();
    });
}

function checkAuth() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        showWelcome(userId);
    } else {
        signinBlock.classList.add('signin_active');
    }
}

signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.textContent = '';

    const formData = new FormData(signinForm);

    try {
        const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Ошибка сети');

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('userId', data.user_id);
            showWelcome(data.user_id);
            signinForm.reset();
        } else {
            errorMessage.innerHTML = `
        <div>Неверный логин/пароль</div>
      `;
        }
    } catch (error) {
        errorMessage.innerHTML = `
      <div>Ошибка: ${error.message}</div>
    `;
    }
});

document.addEventListener('DOMContentLoaded', checkAuth);