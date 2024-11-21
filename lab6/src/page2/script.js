async function loadMenu() {
    const response = await fetch('menu_data.json');
    if (!response.ok) {
        console.error('Failed to load menu data');
        return;
    }

    const data = await response.json();
    const menuContainer = document.getElementById('MenuItems');

    menuContainer.innerHTML = '';

    for (let i = 1; i <= data.menuCount; i++) {
        const text = data[`menuText${i}`];
        const link = data[`menuLink${i}`];

        if (text && link) {
            menuContainer.innerHTML += `<li><a href="${link}" target="_blank">${text}</a></li>`;
        } else {
            console.warn(`Missing data for menu item ${i}`);
        }
    }
}

setInterval(loadMenu, 5000);
loadMenu();


function toggleMenu() {
    const menu = document.getElementById('burgerMenu');
    menu.classList.toggle('active');
}
