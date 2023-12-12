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

function fetchlatandlong (cafeName,cafeAddress,city,postalCode) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(cafeAddress)}&city=${encodeURIComponent(city)}&postalcode=${encodeURIComponent(postalCode)}&format=json`
        fetch(apiUrl)
            .then(response => {
                console.log("response status", response);
                return response.json();
            })
            .then(coordinates => {
                const cafeDataArray = coordinates.map(coord => {
                    const {lat,lon,display_name} = coord;
                    return {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                        cafe_name: cafeName,
                        address: display_name
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

function getCoordinatesInDb (cafeName,cafeAddress,city,postalCode) {
    fetchlatandlong(cafeName,cafeAddress,city,postalCode)
        .then(data => {
            const fetchRequest = data.map(coordinates => {
                return fetch("http://localhost:3000/new-cafe", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(coordinates),
                });
            });
            return Promise.all(fetchRequest);
        })

        .then(responses => {
            const isError = responses.some(response => !response.ok);
            if (isError) {
                throw new Error(`One or more request failed`);
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(cafeData => {
            console.log('Server response',cafeData);
        })
        .catch(error => {
            console.log("Error message", error);
        })
}

function fetchCafeDataAndDisplayInTheBox () {
    fetch('http://localhost:3000/cafe')
        .then(response => {
            console.log("Response", response.status);
            return response.json();
        })
        .then(cafeData => {
            const cafeSection = document.querySelector('.cafe-info-section');

            cafeData.forEach((cafe, index) => {
                const cafeBox = document.createElement('div');
                cafeBox.classList.add('cafe-box');
                cafeBox.id = 'cafe' + (index + 1);

                const pTagCafeName = document.createElement('p');
                pTagCafeName.textContent = cafe.cafe_name;

                const pTagDescription = document.createElement('p');
                pTagDescription.textContent = cafe.descriptions;

                const pTagAddress = document.createElement('p');
                pTagAddress.textContent = cafe.address;

                cafeBox.appendChild(pTagCafeName);
                cafeBox.appendChild(pTagDescription);
                cafeBox.appendChild(pTagAddress);
                cafeSection.appendChild(cafeBox);
            });
        })
        .catch(error => {
            console.error('Error fetching the cafe data', error);
        })
}
