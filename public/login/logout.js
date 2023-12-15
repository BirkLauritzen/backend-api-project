document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear any stored data like sessionId or userInfo
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userInfo');
            localStorage.removeItem(`userFavorites-${userId}`);

            // Redirect to the login page
            window.location.href = '/index.html';
        });
    }
});
