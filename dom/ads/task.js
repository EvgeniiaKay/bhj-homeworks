const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = rotator.querySelectorAll('.rotator__case');
  let currentIndex = 0;

  function rotate() {
    cases[currentIndex].classList.remove('rotator__case_active');

    currentIndex = (currentIndex + 1) % cases.length;

    const nextCase = cases[currentIndex];
    nextCase.classList.add('rotator__case_active');

    const color = nextCase.dataset.color;
    if (color) {
      nextCase.style.color = color;
    }

    const speed = parseInt(nextCase.dataset.speed) || 1000;

    clearInterval(rotator.interval);
    rotator.interval = setInterval(rotate, speed);
  }

  rotate();
});