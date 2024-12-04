let circles = [];
let animationFrame;
let events = [];
let eventCounter = 0;

async function logEvent(message) {
    eventCounter++;
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;

    const logDiv = document.createElement('div');
    logDiv.textContent = logMessage;

    logArea.appendChild(logDiv);
    logArea.scrollTop = logArea.scrollHeight;

    events.push(logMessage);

    localStorage.setItem('eventLogs', JSON.stringify(events));

    const payload = {
        eventNumber: eventCounter,
        message,
        timestamp,
    };

    try {
        const response = await fetch('save_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Error saving event:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function saveLocalStorageToServer() {
    const savedLogs = localStorage.getItem('eventLogs');
    if (!savedLogs) {
        console.log('No logs to save.');
        return;
    }

    const payload = {
        logs: JSON.parse(savedLogs),
        savedAt: new Date().toISOString(),
    };

    try {
        const response = await fetch('save_accumulated_events.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Error saving logs to server:', response.statusText);
            return;
        }

        const result = await response.json();
        console.log('Logs saved to server:', result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

playButton.addEventListener('click', () => {
    work.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    work.style.display = 'none';
    logEvent('Work area closed.');
    saveLocalStorageToServer();

    const savedLogs = localStorage.getItem('eventLogs');
    if (savedLogs) {
        const logs = JSON.parse(savedLogs);

        const logArea2 = document.getElementById('logArea2');
        logArea2.innerHTML = ''; 
        logs.forEach(log => {
            const logDiv = document.createElement('div');
            logDiv.textContent = log;
            logArea2.appendChild(logDiv);
        });

        logArea2.style.display = 'block';
    }
});

function createCircle(color, x, y, angle) {
    const circle = document.createElement('div');
    circle.classList.add('circle', color);
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    anim.appendChild(circle);

    return {
        element: circle,
        x,
        y,
        dx: Math.cos(angle) * 1.5,
        dy: Math.sin(angle) * 1.5,
        radius: 10,
    };
}

function handleWallCollision(circle) {
    const animWidth = anim.offsetWidth;
    const animHeight = anim.offsetHeight;

    if (circle.x <= 0 || circle.x + 20 >= animWidth) {
        circle.dx *= -1;
        logEvent(`${circle.element.className} circle hit vertical wall.`);
    }

    if (circle.y <= 0 || circle.y + 20 >= animHeight) {
        circle.dy *= -1;
        logEvent(`${circle.element.className} circle hit horizontal wall.`);
    }
}

function handleCircleCollision(c1, c2) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < c1.radius + c2.radius) {
        [c1.dx, c2.dx] = [c2.dx, c1.dx];
        [c1.dy, c2.dy] = [c2.dy, c1.dy];
        logEvent('Circles collided and changed direction.');
    }
}

function moveCircles() {
    let allTopHalf = true;
    let allBottomHalf = true;

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        circle.x += circle.dx;
        circle.y += circle.dy;

        circle.element.style.left = `${circle.x}px`;
        circle.element.style.top = `${circle.y}px`;

        handleWallCollision(circle);

        for (let j = i + 1; j < circles.length; j++) {
            handleCircleCollision(circle, circles[j]);
        }
        
        const topEdge = circle.y;
        const bottomEdge = circle.y + circle.radius * 2;

        if (bottomEdge <= anim.offsetHeight / 2) {
            allBottomHalf = false;
        } else if (topEdge >= anim.offsetHeight / 2) {
            allTopHalf = false;
        } else {
            allTopHalf = false;
            allBottomHalf = false;
        }
    }

    if (allTopHalf || allBottomHalf) {
        cancelAnimationFrame(animationFrame);
        logEvent('Animation stopped: all circles in one half.');
        reloadBtn.style.display = 'block';
        startBtn.style.display = 'none';
    } else {
        animationFrame = requestAnimationFrame(moveCircles);
    }
}

startBtn.addEventListener('click', () => {
    const blueAngle = Math.random() * Math.PI * 2;
    const orangeAngle = Math.random() * Math.PI * 2;

    const blue = createCircle(
        'blue',
        Math.random() * (anim.offsetWidth - 20), 
        30, 
        blueAngle
    );

    const orange = createCircle(
        'orange',
        Math.random() * (anim.offsetWidth - 20), 
        anim.offsetHeight - 50,
        orangeAngle
    );

    circles = [blue, orange];

    logEvent('Animation started.');
    startBtn.style.display = 'none';
    reloadBtn.style.display = 'none';

    animationFrame = requestAnimationFrame(moveCircles);
});


reloadBtn.addEventListener('click', () => {
    logEvent('Reloaded animation.');
    anim.innerHTML = '';
    startBtn.style.display = 'block';
    reloadBtn.style.display = 'none';
});
