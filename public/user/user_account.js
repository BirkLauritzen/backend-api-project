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



// Fetch and display user's favorite cafes
// Display user's favorite cafes
function fetchAndDisplayUserFavorites(userId) {
    console.log('UserId:', userId);
    fetch(`/favorites/${userId}}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(favorites => {
            console.log('Favorite cafes:', favorites);
            if (favorites.length > 0) {
                displayUserFavorites(favorites);
                localStorage.setItem(`userFavorites-${userId}`, JSON.stringify(favorites));
            } else {
                console.log('No cafes found for this user');
            }

        })
        .catch(error => {
            console.error('Error fetching favorites:', error);
        });
}
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
document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('sessionId');
    console.log('User Id:', userId);

    if (userId) {
        const storedFavorites = localStorage.getItem(`userFavorites-${userId}`);
        if (storedFavorites) {
            displayUserFavorites(JSON.parse(storedFavorites));
        } else {
            fetchAndDisplayUserFavorites(userId);
        }
    }
})

console.log('Domcontentloaded event fired');
