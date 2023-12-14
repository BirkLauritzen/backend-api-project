document.addEventListener('DOMContentLoaded', function () {
    fetchCafesAndDisplay();
    fetchDataAndDisplayMap();
});

document.addEventListener('DOMContentLoaded', function () {
    fetchCafeDataAndDisplayInTheBox();

    const submitbtn = document.querySelector('#submit-btn');

    submitbtn.addEventListener('click', function (event) {
        console.log('Clicked submit button:', event.target);
        const checkboxIdPrefix = 'checkbox';
        const cafeNameIdPrefix = 'pTagCafeName';

        const checkboxes = document.querySelectorAll(`[id^="${checkboxIdPrefix}"]`);

        const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (selectedCheckboxes.length > 0) {
            const selectedCafeName = selectedCheckboxes.map(checkbox => {
                const index = checkbox.id.replace(checkboxIdPrefix, '');
                const cafeNameId = `${cafeNameIdPrefix}${index}`;
                const cafeNameElement = document.querySelector(`#${cafeNameId}`);

                if (!cafeNameElement){
                    console.error('Selected cafe name element not found:', cafeNameId);
                    return null;
                }

                const cafeName = cafeNameElement.textContent.trim();

                return {
                    id: index,
                    name: cafeName,
                };
            }).filter(item => item !== null);

            fetch('http://localhost:3000/new-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ selectedCafeName }),
            })
                .then(response => {
                    console.log('Response status:', response.status);
                    return response.json(); // This already returns a parsed JSON object
                })
                .then(data => {
                    console.log('Parsed response data:', data);
                    updateUserFavoriteList(data);
                })
                .catch(error => {
                    console.error('Error during fetch:', error);

                    // Log the raw response text
                    response.text()
                        .then(responseText => {
                            console.log('Raw response text:', responseText);
                            alert('An error occurred during the fetch. Check the console for more details.');
                        })
                        .catch(textError => {
                            console.error('Error getting raw response text:', textError);
                            alert('An error occurred during the fetch. Check the console for more details.');
                        });
                });
        } else {
            console.log('No selected cafes');
            alert('No selected cafes');
        }

    });
})
