const form = document.getElementById('form');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file');
const sendButton = document.getElementById('send');

const statusMessage = document.createElement('div');
statusMessage.className = 'status-message';
form.appendChild(statusMessage);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
        statusMessage.innerHTML = `
      <div style="color: red;">Ошибка: выберите файл</div>
    `;
        return;
    }

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            progress.value = percentComplete;
        }
    });

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            statusMessage.innerHTML = `
        <div style="color: green;">Файл успешно загружен</div>
      `;
            progress.value = 0;
            form.reset();
        } else {
            statusMessage.innerHTML = `
        <div style="color: red;">Ошибка сервера: ${xhr.status} ${xhr.statusText}</div>
      `;
        }
    };

    xhr.onerror = () => {
        statusMessage.innerHTML = `
      <div style="color: red;">Ошибка сети при загрузке файла</div>
    `;
    };

    xhr.send(formData);
});