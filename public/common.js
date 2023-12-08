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
                const { latitude,longitude, cafe_name, address } = cafe;

                if (latitude !== null && longitude !== null) {
                    const marker = L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup(`<b>${cafe_name}</b><br>${address}`);
                } else {
                    // Log cafes with missing or invalid location information
                    console.warn(`Cafe "${cafe_name}" has missing or invalid location information.`);
                }
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
    return new Promise((resolve, reject) => {
        fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(cafeAddressInput)}`)
            .then(response => {
                console.log("response status", response);
                return response.json();
            })
            .then(coordinates => {
                const cafeDataArray = coordinates.map(coord => {
                    const {lat,lon} = coord;
                    return {
                        latitude: lat,
                        longitude: lon,
                        cafe_name: cafeNameInput,
                        address: cafeAddressInput
                    };
                })
                console.log("Coordinates Array", cafeDataArray);
                resolve(cafeDataArray);
            })
            .catch(error => {
                console.log("Error in fetching data", error);
                reject(error);
            })
    })

}

function getCoordinatesInDb () {
    fetchlatandlong()
        .then(data => {
            return fetch("http://localhost:3000/new-cafe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
        })

        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(cafeData => {
            console.log('Server response',cafeData);
        })
        .catch(error => {
            console.log("Error message", error);
        })
}
