const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close_times');
const modalContent = document.querySelector('.modal__content');

function showModal() {
  const isClosed = localStorage.getItem('modalClosed');
  if (isClosed !== 'true') {
    modal.classList.add('modal_active');
    
    const buttonsHTML = `
      <div class="modal__buttons">
        <a href="#" class="btn btn_success">Подписаться</a>
        <a href="#" class="btn btn_danger modal__decline">Отказаться</a>
      </div>
    `;
    modalContent.insertAdjacentHTML('beforeend', buttonsHTML);
    
    const declineButton = modalContent.querySelector('.modal__decline');
    declineButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
}

function closeModal() {
  modal.classList.remove('modal_active');
  try {
    localStorage.setItem('modalClosed', 'true');
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
}

closeButton.addEventListener('click', closeModal);
document.addEventListener('DOMContentLoaded', showModal);