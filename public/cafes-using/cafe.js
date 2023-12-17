document.addEventListener('DOMContentLoaded', function () {
    fetchCafesAndDisplay();
    fetchDataAndDisplayMap();
    fetchCafeDataAndDisplayInTheBox();

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Clicked submit button:', event.target);

        const checkboxIdPrefix = 'checkbox';
        const cafeNameIdPrefix = 'pTagCafeName';
        let selectedCafeName = [];

        const checkboxes = document.querySelectorAll(`[id^="${checkboxIdPrefix}"]`);
        const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (selectedCheckboxes.length > 0) {
            selectedCafeName = selectedCheckboxes.map(checkbox => {
                const index = checkbox.id.replace(checkboxIdPrefix, '');
                const cafeNameId = `${cafeNameIdPrefix}${index}`;
                const cafeNameElement = document.querySelector(`#${cafeNameId}`);

                if (!cafeNameElement) {
                    console.error('Selected cafe name element not found:', cafeNameId);
                    return null;
                }

                return cafeNameElement.textContent.trim();
            }).filter(item => item !== null);

            const userId = localStorage.getItem('sessionId'); // Retrieve user ID from local storage

            if (selectedCafeName.length > 0 && userId) {
                fetch(`/new-favorite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ favoriteCafeNames: selectedCafeName, userId: userId }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Favorite added:', data);
                        alert('Favorite cafe added successfully!'); // Alert here
                    })
                    .catch(error => {
                        console.error('Error during fetch:', error);
                    });
            } else {
                console.log('No cafe selected or user not identified');
            }
        }
    });
});
