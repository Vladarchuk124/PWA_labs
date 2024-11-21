function generateFields() {
    const count = document.getElementById('menuCount').value;
    const container = document.getElementById('menuItems');
    container.innerHTML = ''; 

    if(count > 10 || count < 1) {
        return;
    }

    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div>
                <label for="menuText${i}">Text of the item ${i}:</label>
                <input type="text" id="menuText${i}" name="menuText${i}" required><br>
                <label for="menuLink${i}">Link of the item ${i}:</label>
                <input type="url" id="menuLink${i}" name="menuLink${i}" required><br><br>
            </div>
        `;
    }
}

document.getElementById('submitButton').addEventListener('click', async () => {
    const formData = new FormData(document.getElementById('dropdownForm'));
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('save_menu.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.text();
    document.getElementById('response').innerText = result;
});




function toggleMenu() {
    const menu = document.getElementById('burgerMenu');
    menu.classList.toggle('active');
}

