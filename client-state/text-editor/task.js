const editor = document.getElementById('editor');

const statusMessage = document.createElement('div');
statusMessage.className = 'status-message';
editor.after(statusMessage);

function saveText() {
  try {
    localStorage.setItem('editorText', editor.value);
    statusMessage.innerHTML = `
      <div style="color: green;">Текст сохранён</div>
    `;
    setTimeout(() => {
      statusMessage.innerHTML = '';
    }, 2000);
  } catch (error) {
    statusMessage.innerHTML = `
      <div style="color: red;">Ошибка сохранения: ${error.message}</div>
    `;
  }
}

function loadText() {
  try {
    const savedText = localStorage.getItem('editorText');
    if (savedText) {
      editor.value = savedText;
      statusMessage.innerHTML = `
        <div style="color: blue;">Текст восстановлен из памяти</div>
      `;
      setTimeout(() => {
        statusMessage.innerHTML = '';
      }, 2000);
    }
  } catch (error) {
    statusMessage.innerHTML = `
      <div style="color: red;">Ошибка загрузки: ${error.message}</div>
    `;
  }
}

editor.addEventListener('input', saveText);
document.addEventListener('DOMContentLoaded', loadText);