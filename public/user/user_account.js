async function fetchUserInfo() {
    const sessionId = localStorage.getItem('sessionId');

    if (!sessionId) {
        console.error('No session ID found');
        return;
    }

    try {
        const response = await fetch(`/api/user-info/${sessionId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userInfo = await response.json();
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        document.querySelector('.user-data p:nth-child(1)').textContent = `Name: ${userInfo.first_name} ${userInfo.last_name}`;
        document.querySelector('.user-data p:nth-child(2)').textContent = `Email: ${userInfo.email}`;
        // ... update other fields
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);

function updateUserFavoriteList(favorites) {
    const ulFavoriteList = document.querySelector('#cafe-list');
    ulFavoriteList.innerHTML = '';

    favorites.forEach(favorite => {
        const liElement = document.createElement('li');
        liElement.textContent = `${favorite.cafe_name} - Rating: ${favorite.rating}`;
        ulFavoriteList.appendChild(liElement);
    });
}

// Fetch and display user's favorite cafes
function fetchAndDisplayUserFavorites(userId) {
    fetch(`/favorites/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(favorites => {
            localStorage.setItem(`userFavorites-${userId}`, JSON.stringify(favorites));
            displayUserFavorites(favorites);
        })
        .catch(error => {
            console.error('Error fetching favorites:', error);
        });
}

// Display user's favorite cafes
function displayUserFavorites(favorites) {
    const ulFavoriteList = document.querySelector('#cafe-list');
    ulFavoriteList.innerHTML = '';

    favorites.forEach(cafe => {
        const liElement = document.createElement('li');
        liElement.textContent = `${cafe.cafe_name} - ${cafe.address} - Rating: ${cafe.rating}`;
        ulFavoriteList.appendChild(liElement);
    });
}

// Call this function when the user account page loads
const userId = localStorage.getItem('sessionId');
if (userId) {
    const storedFavorites = localStorage.getItem(`userFavorites-${userId}`);
    if (storedFavorites) {
        displayUserFavorites(JSON.parse(storedFavorites));
    } else {
        fetchAndDisplayUserFavorites(userId);
    }
}
