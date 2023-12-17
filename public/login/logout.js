document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Retrieve the userId from localStorage
            const userId = localStorage.getItem('sessionId');

            // Clear any stored data like sessionId, userInfo, and userFavorites
            if (userId) {
                localStorage.removeItem(`userFavorites-${userId}`);
            }
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userInfo');

            // Redirect to the login page
            window.location.href = '/index.html';
        });
    }
});
