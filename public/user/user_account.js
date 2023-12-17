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
        console.log('userInfo:', userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        document.querySelector('.user-data p:nth-child(1)').textContent = `Name: ${userInfo.first_name} ${userInfo.last_name}`;
        document.querySelector('.user-data p:nth-child(2)').textContent = `Email: ${userInfo.email}`;
        // ... update other fields

        const userId = userInfo.users_id;

        console.log('User Id:', userId);

        if (userId) {
            fetchAndDisplayUserFavorites(userId)
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display user's favorite cafes
// Display user's favorite cafes
function fetchAndDisplayUserFavorites(userId) {
    console.log('UserId:', userId);
    fetch(`/favorites/${userId}`, {
        credentials: "include"
    })
        .then(response => {
            console.log('Response Status', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(favorites => {
            console.log('Favorite cafes:', favorites);

            if (favorites.length > 0) {
                displayUserFavorites(favorites);

                const storedFavorites = localStorage.getItem(`userFavorites-${userId}`);
                const combinedFavorites = storedFavorites
                    ? [...JSON.parse(storedFavorites), ...favorites]
                    : favorites;

                localStorage.setItem(`userFavorites-${userId}`, JSON.stringify(combinedFavorites));
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

        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = cafe.cafe_id;
        liElement.appendChild(checkbox);

        //checkbox label
        const label = document.createElement("label");
        label.textContent = `${cafe.cafe_name} - ${cafe.address}`;
        liElement.appendChild(label);

        ulFavoriteList.appendChild(liElement);

    });
}

// Call this function when the user account page loads
document.addEventListener('DOMContentLoaded', async function () {
    await fetchUserInfo(); // Wait for user info before fetching favorites
    console.log('Domcontentloaded event fired');
});



document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('sessionId');
    if (userId) {
        fetchAndDisplayUserFavorites(userId);
    }

    document.addEventListener('favoritesAdded', function () {
        const userId = localStorage.getItem('sessionId');

        if (userId) {
            fetchAndDisplayUserFavorites(userId);
        }
    });
});
