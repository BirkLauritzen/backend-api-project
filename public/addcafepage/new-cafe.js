const btnForCafe = document.querySelector('#btn-for-cafe');
btnForCafe.addEventListener('click', function () {
    const cafeNameInput = document.querySelector('#cafe-name').value;
    const cafeAddressInput = document.querySelector('#cafe-address').value;
    const cityInput = document.querySelector("#city").value;
    const postalCodeInput = document.querySelector("#postal-code").value;
    const descriptions = document.querySelector('#description').value;

    console.log(cafeNameInput, cafeAddressInput, cityInput, postalCodeInput,descriptions);

    fetchlatandlong(cafeNameInput, cafeAddressInput, cityInput, postalCodeInput,descriptions).then(coordinates => {
        // Do something with the coordinates if needed
        console.log("Coordinates:", coordinates);
    })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
        });


    getCoordinatesInDb(cafeNameInput, cafeAddressInput, cityInput, postalCodeInput,descriptions);
});