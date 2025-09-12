const book = document.getElementById('book');

const fontSizeControls = document.querySelectorAll('.font-size');
fontSizeControls.forEach(control => {
  control.addEventListener('click', function (event) {
    event.preventDefault();

    fontSizeControls.forEach(item => item.classList.remove('font-size_active'));
    this.classList.add('font-size_active');

    book.classList.remove('book_fs-small', 'book_fs-big');

    const size = this.dataset.size;
    if (size) {
      book.classList.add(`book_fs-${size}`);
    }
  });
});

const textColorControls = document.querySelectorAll('.color[data-text-color]');
textColorControls.forEach(control => {
  control.addEventListener('click', function (event) {
    event.preventDefault();

    textColorControls.forEach(item => item.classList.remove('color_active'));
    this.classList.add('color_active');

    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

    const color = this.dataset.textColor;
    book.classList.add(`book_color-${color}`);
  });
});

const bgColorControls = document.querySelectorAll('.color[data-bg-color]');
bgColorControls.forEach(control => {
  control.addEventListener('click', function (event) {
    event.preventDefault();

    bgColorControls.forEach(item => item.classList.remove('color_active'));
    this.classList.add('color_active');

    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

    const bgColor = this.dataset.bgColor;
    book.classList.add(`book_bg-${bgColor}`);
  });
});