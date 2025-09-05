class Game {
    constructor(container) {
        this.container = container;
        this.wordElement = container.querySelector('.word');
        this.winsElement = container.querySelector('.status__wins');
        this.lossElement = container.querySelector('.status__loss');
        this.timerElement = container.querySelector('.status__timer');
        this.timer = null;
        this.timeLeft = 0;

        this.reset();

        this.registerEvents();
    }

    reset() {
        this.winsElement.textContent = 0;
        this.lossElement.textContent = 0;
        this.setNewWord();
    }

    registerEvents() {
        document.addEventListener('keyup', (event) => {
            if (this.winsElement.textContent >= 10 || this.lossElement.textContent >= 5) return;

            const inputChar = event.key.toLowerCase();
            const currentChar = this.currentSymbol.textContent.toLowerCase();

            if (inputChar === currentChar) {
                this.success();
            } else {
                this.fail();
            }
        });
    }

    success() {
        if (this.currentSymbol.classList.contains('symbol_current')) {
            this.currentSymbol.classList.remove('symbol_current');
        }
        this.currentSymbol.classList.add('symbol_correct');
        this.currentSymbol = this.currentSymbol.nextElementSibling;

        if (this.currentSymbol !== null) {
            this.currentSymbol.classList.add('symbol_current');
            return;
        }

        if (++this.winsElement.textContent === 10) {
            alert('Победа!');
            clearInterval(this.timer);
            this.reset();
        }
        this.setNewWord();
    }

    fail() {
        this.wordElement.classList.add('word_incorrect');

        if (++this.lossElement.textContent === 5) {
            alert('Вы проиграли!');
            clearInterval(this.timer);
            this.reset();
        }

        setTimeout(() => {
            this.wordElement.classList.remove('word_incorrect');
            this.setNewWord();
        }, 1000);
    }

    setNewWord() {
        const word = this.getWord();
        this.renderWord(word);
        this.startTimer(word.length);
    }

    getWord() {
        const words = [
            'bob',
            'awesome',
            'netology',
            'hello',
            'kitty',
            'rock',
            'youtube',
            'popcorn',
            'cinema',
            'love',
            'javascript'
        ];
        const index = Math.floor(Math.random() * words.length);
        return words[index];
    }

    renderWord(word) {
        const html = [...word]
            .map(
                (s, i) =>
                    `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
            )
            .join('');
        this.wordElement.innerHTML = html;

        this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    }

    startTimer(seconds) {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timeLeft = seconds;
        this.timerElement.textContent = this.timeLeft;
        this.timerElement.classList.remove('timer_expired');

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timerElement.classList.add('timer_expired');
                this.fail();
            }
        }, 1000);
    }
}

new Game(document.getElementById('game'));
