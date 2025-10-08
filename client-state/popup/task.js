const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close_times');
const modalContent = document.querySelector('.modal__content');

function setCookie(name, value, days = 365) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function showModal() {
  const isClosed = getCookie('modalClosed');
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
    setCookie('modalClosed', 'true', 365);
  } catch (error) {
    console.error('Ошибка установки cookie:', error);
  }
}

closeButton.addEventListener('click', closeModal);
document.addEventListener('DOMContentLoaded', showModal);