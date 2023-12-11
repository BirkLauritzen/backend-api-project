// main.js

// Simulated initial ratings for cafes (can be replaced by actual data from a server)
const cafeRatings = {
    cafe1: [4, 5, 3],
    cafe2: [5, 5, 4, 3],
    cafe3: [3, 4],
    // Add more simulated ratings for other cafes
};

// Function to calculate average rating
function calculateAverageRating(ratings) {
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
}

// Function to update cafe ratings based on simulated data
function updateCafeRatings() {
    const cafeBoxes = document.querySelectorAll('.cafe-box');

    cafeBoxes.forEach(cafe => {
        const cafeId = cafe.getAttribute('id');
        const ratings = cafeRatings[cafeId] || []; // Get simulated ratings for the cafe

        if (ratings.length > 0) {
            const averageRating = calculateAverageRating(ratings);
            cafe.setAttribute('data-rating', averageRating.toFixed(1));
            cafe.querySelector('p').textContent = `${cafeId} - Rating: ${averageRating.toFixed(1)}`;
        }
    });
}

// Call the function to update cafe ratings when the page loads
updateCafeRatings();

// Function to handle rating a cafe (simulated for front-end)
function rateCafe(cafeId) {
    const ratings = cafeRatings[cafeId] || [];
    const newRating = parseFloat(prompt(`Enter your rating for ${cafeId} (out of 5):`));

    if (!isNaN(newRating) && newRating >= 0 && newRating <= 5) {
        ratings.push(newRating);
        cafeRatings[cafeId] = ratings;
        updateCafeRatings();
        alert(`Thank you for rating ${cafeId}!`);
    } else {
        alert('Please enter a valid rating between 0 and 5.');
    }
}

// Function to add a cafe to favorites (simulated for front-end)
function addToFavorites(cafeId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(cafeId)) {
        favorites.push(cafeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`Added ${cafeId} to favorites!`);
    } else {
        alert(`${cafeId} is already in your favorites!`);
    }
}

// Add event listeners to each cafe box for rating and favorites
document.querySelectorAll('.cafe-box').forEach(cafe => {
    cafe.addEventListener('click', () => {
        const cafeId = cafe.getAttribute('id');
        rateCafe(cafeId);
    });

    cafe.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const cafeId = cafe.getAttribute('id');
        addToFavorites(cafeId);
    });
});




// Function to display additional cafe boxes
function showMoreCafes() {
    const additionalCafes = document.querySelectorAll('.additional-cafe-box');
    additionalCafes.forEach(cafe => {
        cafe.style.display = 'flex'; // Show the hidden cafe boxes
    });

}

// Event listener for the 'Show More' button
document.getElementById('showMoreBtn').addEventListener('click', showMoreCafes);
