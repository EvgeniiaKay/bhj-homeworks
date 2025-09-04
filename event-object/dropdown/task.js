const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
    const valueElement = dropdown.querySelector(".dropdown__value");
    const listElement = dropdown.querySelector(".dropdown__list");
    const links = dropdown.querySelectorAll(".dropdown__link");

    valueElement.addEventListener("click", () => {
        listElement.classList.toggle("dropdown__list_active");
    });

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const currentDropdown = link.closest(".dropdown");
            const currentValueElement = currentDropdown.querySelector(".dropdown__value");
            const currentListElement = currentDropdown.querySelector(".dropdown__list");

            currentValueElement.textContent = link.textContent;

            currentListElement.classList.remove("dropdown__list_active");
        });
    });
});