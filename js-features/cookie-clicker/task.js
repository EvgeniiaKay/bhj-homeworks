const counterElement = document.getElementById("clicker__counter");
const cookieElement = document.getElementById("cookie");

let clickCount = 0;
let isCookieSmall = false;
let lastClickTime = null;

cookieElement.onclick = function() {
    clickCount++;

    const currentTime = Date.now();
    let clickSpeed = 0;

    if (lastClickTime != null) {
        const timeDiff = currentTime - lastClickTime;
        const timeDiffSeconds = timeDiff / 1000;
        clickSpeed = 1 / timeDiffSeconds;
    }

    counterElement.textContent = `${clickCount} (${clickSpeed.toFixed(2)} кликов/с)`;

    lastClickTime = currentTime;
    
    if (isCookieSmall) {
        cookieElement.width = 200;
    } else {
        cookieElement.width = 180;
    }

    isCookieSmall = !isCookieSmall;
};