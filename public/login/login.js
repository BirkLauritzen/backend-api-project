async function loginUser(loginData) {
    try {
const response = await fetch('/login', {
    method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.userId) {
            localStorage.setItem('sessionId', data.userId);
            window.location.href = '/overview';
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const loginData = {
                username: loginForm.username.value,
                password: loginForm.password.value
            };
            loginUser(loginData);
        });
    }
});
