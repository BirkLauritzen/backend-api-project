function fetchCafesAndDisplay () {
    console.log("Fetching cafes");
    fetch('http://localhost:3000/cafe')
        .then(response => {
            console.log("Response status",response.status);
            return response.json();
        })
        .then(cafes => {
            console.log("Cafes",cafes);
            const cafeContainer = document.querySelector('#cafe');

            const ulCafes = document.createElement('ul');
            ulCafes.id = 'ul-cafe';

            cafeContainer.appendChild(ulCafes);

            cafes.forEach(cafe => {
                const cafeLi = document.createElement('li');
                cafeLi.innerText = cafe.cafe_name;
                ulCafes.appendChild(cafeLi);
            });
        })
        .catch(error => {
            console.error("Error fetching cafes", error);
        });
}

function fetchDataAndDisplayMap () {
    const map = L.map('map').setView([55.6761,12.5683],13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    fetch("http://localhost:3000/cafe")
        .then(response=> response.json())
        .then(cafes => {
            cafes.forEach(cafe => {
               const marker = L.marker([cafe.latitude, cafe.longitude])
                   .addTo(map)
                   .bindPopup(`<b>${cafe.cafe_name}</b><br>${cafe.address}`)
            });
        })
        .catch(error => {
            console.error("Error fetching cafe data",error);
        });
}


// Get latitude and longitude from the api  https://geocode.maps.co/search?q={address}

const cafeNameInput = document.querySelector('#cafe-name').value;
const cafeAddressInput = document.querySelector('#cafe-address').value;
function fetchlatandlong () {
    fetch(` https://geocode.maps.co/search?q={${cafeAddressInput}}`)
        .then(response => {
            console.log("response status", response.status);
            return response.json();
        })
        .then(coordinates => {
            const cafeDataArray = [];

            coordinates.forEach(coordinates => {
                const {lat,lon} = coordinates;

                const cafeData = {
                    latitude: {lat},
                    longitude: {lon},
                    cafe_name: cafeNameInput,
                    address: cafeAddressInput
                }

                cafeDataArray.push(cafeData);
            });
            console.log("Coordinates Array", cafeDataArray);
            return cafeDataArray;
        })
        .catch(error => {
            console.log("Error in fetching data", error);
            throw error;
        })
}

function getCoordinatesInDb () {
    fetch("http://localhost:3000/new-cafe", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchlatandlong()),
    })

        .then(response => {
            console.log("Response",response.status);
            return response.json();
        })
        .then(cafeData => {
            console.log('Server response',cafeData);
        })
        .catch(error => {
            console.log("Error message", error);
        })
}
