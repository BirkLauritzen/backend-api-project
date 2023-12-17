async function fetchUserInfo() {
    const sessionId = localStorage.getItem('sessionId');
    console.log('Session id:', sessionId);

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


function displayUserFavorites(favorites, index) {
    const ulFavoriteList = document.querySelector('#cafe-list');
    ulFavoriteList.innerHTML = '';

    favorites.forEach((cafe, i) => {
        const liElement = document.createElement('li');

        const cafeId = cafe.cafes_id;
        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = cafe.cafe_name;
        checkbox.id = `checkbox-${index}-${i + 1}`;
        liElement.appendChild(checkbox);

        //checkbox label
        const label = document.createElement("label");
        label.setAttribute('for', checkbox.id);
        label.textContent = `${cafe.cafe_name} - ${cafe.address}`;
        liElement.appendChild(label);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const userId = localStorage.getItem('sessionId');
            if (userId) {
                removeSelectedFavorites(userId);
            } else {
                console.error('User ID not found');
            }
        });
        liElement.appendChild(removeBtn);

        ulFavoriteList.appendChild(liElement);

    });
}

function removeSelectedFavorites (userId) {
    const selectedBoxes = document.querySelectorAll('#cafe-list input[type="checkbox"]:checked');

    if (selectedBoxes.length === 0) {
        console.log('No cafes for removal');
        return;
    }

    Array.from(selectedBoxes).forEach(checkbox => {
        const cafeId = checkbox.value;
        removeFavorites(userId,cafeId);
    })
}

function removeFavorites(userId, cafeName) {
    fetch(`/favorites/remove/${userId}/${cafeName}`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fetchAndDisplayUserFavorites(userId);
        })
        .catch(error => {
            console.error('Error removing favorite:', error);
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
