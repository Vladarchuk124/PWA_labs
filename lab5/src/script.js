document.addEventListener("DOMContentLoaded", () => {

    function task1() {
        alert("Завдання 1: Переміна блоків місцями.");

        const leftSide = document.querySelector(".left_side");
        const rightSide = document.querySelector(".right_side");

        const tempContent = leftSide.innerHTML;
        leftSide.innerHTML = rightSide.innerHTML;
        rightSide.innerHTML = tempContent;
    }

    function task2() {
        alert("Завдання 2: Розрахунок площі трикутника.");
    
        const block4 = document.querySelector(".upper_main_section");
        const form = document.createElement("form");
    
        const side1Input = document.createElement("input");
        const side2Input = document.createElement("input");
        const side3Input = document.createElement("input");
        const submitButton = document.createElement("button");
    
        side1Input.placeholder = "Введіть першу сторону";
        side2Input.placeholder = "Введіть другу сторону";
        side3Input.placeholder = "Введіть третю сторону";
        submitButton.textContent = "Розрахувати площу";
    
        form.append(side1Input, side2Input, side3Input, submitButton);
        block4.appendChild(form);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
    
            const side1 = parseFloat(side1Input.value);
            const side2 = parseFloat(side2Input.value);
            const side3 = parseFloat(side3Input.value);
    
            if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
                alert("Будь ласка, введіть правильні числові значення для всіх сторін.");
                return;
            }

            if ((side1 + side2) <= side3 || (side3 + side2) <= side1 || (side1 + side3) <= side2) {
                alert("Трикутник із такими сторонами не існує");
                return;
            }

            const p = (side1 + side2 + side3) / 2;
            const area = Math.sqrt(p*(p-side1)*(p-side2)*(p-side3));
    
            form.remove();
    
            const result = document.createElement("p");
            alert(`Введені сторони: ${side1}, ${side2}, ${side3}. Площа п’ятикутника: ${area.toFixed(2)}`);
            block4.appendChild(result);
        });
    }

    function task3() {
        alert("Завдання 3: Перевернення числа.");
        const block4 = document.querySelector(".upper_main_section");

        const form = document.createElement("form");
        const input = document.createElement("input");
        const submitButton = document.createElement("button");

        input.type = "number";
        input.placeholder = "Введіть число";
        submitButton.textContent = "Перевернути";
        form.append(input, submitButton);
        block4.appendChild(form);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const number = input.value;
            if (number) {
                const reversed = number.split("").reverse().join("");
                document.cookie = `reversedNumber=${reversed}; path=/`;

                alert(`Перевернуте число: ${reversed}`);
                location.reload();
            }
        });

        const cookies = document.cookie.split("; ").find((row) => row.startsWith("reversedNumber="));
        if (cookies) {
            const value = cookies.split("=")[1];
            if (confirm(`Збережене число: ${value}. Натисніть OK, щоб видалити cookies.`)) {
                document.cookie = "reversedNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                alert("Cookies видалено.");
                location.reload();
            }
        }
    }

    function task4() {
        alert("Завдання 4: Зміна кольору рамок.");
        const block4 = document.querySelector(".upper_main_section");

        const form = document.createElement("form");
        const blocks = document.querySelectorAll("header, div, section, aside, footer, .upper_logo, .footer_logo");
        const color = localStorage.getItem("borderColor");

        const newColorButton = document.createElement("button");
        const lastColorButton = document.createElement("button");

        newColorButton.textContent = "1: Задати новий колір";
        lastColorButton.textContent = "2: Завантажити старий колір";

        form.append(newColorButton, lastColorButton);
        block4.appendChild(form);

        form.style.display = "flex"; 
        form.style.flexDirection = "column"; 
        form.style.gap = "10px";

        newColorButton.addEventListener("click", (event) => { 
            event.preventDefault(); 
            const newColor = prompt("Введіть колір рамки (наприклад, red):");
            if (newColor) {
                blocks.forEach((block) => {
                   block.style.borderColor = newColor;
                });
                localStorage.setItem("borderColor", newColor);
            }
            block4.removeChild(form);
        });

        lastColorButton.addEventListener("click", (event) => { 
            event.preventDefault(); 
            if (color) {
                blocks.forEach((block) => {
                    block.style.borderColor = color;
                });
            }
            block4.removeChild(form);
        });
    }

    function task5() {
        alert("Завдання 5: Задання CSS-інструкцій.");
        const block4 = document.querySelector(".upper_main_section");

        block4.innerHTML = "";

        const form = document.createElement("form");
        const elementSelectorInput = document.createElement("input");
        const cssPropertyInput = document.createElement("input");
        const cssValueInput = document.createElement("input");
        const applyButton = document.createElement("button");
        const clearButton = document.createElement("button");
        const returnButton = document.createElement("button");

        elementSelectorInput.placeholder = "Елемент (наприклад, h1)";
        cssPropertyInput.placeholder = "CSS-властивість (наприклад, color)";
        cssValueInput.placeholder = "Значення (наприклад, red)";
        applyButton.textContent = "1: Застосувати";
        clearButton.textContent = "2: Очистити";
        returnButton.textContent = "3: Повернутися";

        form.append(elementSelectorInput, cssPropertyInput, cssValueInput, applyButton, clearButton, returnButton);
        block4.appendChild(form);

        form.style.display = "flex"; 
        form.style.flexDirection = "column"; 
        form.style.gap = "10px";

        applyButton.addEventListener("click", (event) => { 
            event.preventDefault(); 
            const element = elementSelectorInput.value; 
            const property = cssPropertyInput.value; 
            const value = cssValueInput.value; 
            if (element && property && value) { 
                document.querySelectorAll(element).forEach((el) => { 
                    el.style[property] = value; 
                }); 
                localStorage.setItem(`${element}-${property}`, value); 
            } 
        }); 
        
        clearButton.addEventListener("click", (event) => { 
            event.preventDefault(); 
            document.querySelectorAll("*").forEach((el) => { 
                el.style = ""; 
            }); 
            form.style.display = "flex"; form.style.flexDirection = "column"; form.style.gap = "10px";
            localStorage.clear(); 
        });

        returnButton.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "index.html";
        });
    }

    document.querySelectorAll(".task").forEach((taskElement) => {
        taskElement.addEventListener("click", () => {
            const taskNumber = taskElement.getAttribute("data-task");
            switch (taskNumber) {
                case "1":
                    task1();
                    break;
                case "2":
                    task2();
                    break;
                case "3":
                    task3();
                    break;
                case "4":
                    task4();
                    break;
                case "5":
                    task5();
                    break;
                default:
                    alert("Невідоме завдання.");
            }
        });
    });
});
