console.log("common.js loaded");
const wifiradio = document.querySelector('#wifi-input');
const kbhKRadio = document.querySelector('#københavn-k');
const kbhVRadio = document.querySelector('#københavn-v');
const kbhSRadio = document.querySelector('#københavn-s');
const kbhSVRadio = document.querySelector('#københavn-sv');
const kbhNRadio = document.querySelector('#københavn-n');
const kbhNVRadio = document.querySelector('#københavn-nv');
const kbhØRadio = document.querySelector('#københavn-ø');
const frederiksbjergRadio = document.querySelector('#frederiksberg');

function fetchCafesAndDisplay () {
    console.log("Fetching cafes");

    const cafeContainer = document.querySelector('#cafe');
    cafeContainer.innerHTML = '';

    const ulCafes = document.createElement('ul');
    ulCafes.id = 'ul-cafe';

    cafeContainer.appendChild(ulCafes);

    fetch('http://localhost:3000/cafe')
        .then(response => {
            console.log("Response status",response.status);
            return response.json();
        })
        .then(cafes => {
            console.log("Cafes",cafes);

            cafes.forEach(cafe => {
                const shouldDisplayCafe =
                    (wifiradio.checked && cafe.has_wifi) ||
                    (
                        (kbhKRadio.checked || kbhNRadio.checked || kbhNVRadio.checked || kbhVRadio.checked ||
                            kbhSRadio.checked || kbhSVRadio.checked || kbhØRadio.checked || frederiksbjergRadio.checked) &&
                        (
                            (kbhKRadio.checked && (cafe.address.includes('København K') || cafe.address.includes('Indre By'))) ||
                            (kbhNRadio.checked && (cafe.address.includes('København N') || cafe.address.includes('Nørrebro'))) ||
                            (kbhNVRadio.checked && (cafe.address.includes('København NV') || cafe.address.includes('Mjølnerparken') ||
                                cafe.address.includes('Bispebjerg'))) ||
                            (kbhVRadio.checked && (cafe.address.includes('København V') || cafe.address.includes('Vesterbro'))) ||
                            (kbhSRadio.checked && (cafe.address.includes('København S') ||
                                cafe.address.includes('Sundbyerne') || cafe.address.includes('Amagerbro'))) ||
                            (kbhSVRadio.checked && (cafe.address.includes('København SV') ||
                                cafe.address.includes('Sluseholmen'))) ||
                            (kbhØRadio.checked && (cafe.address.includes('København Ø') || cafe.address.includes('Østerbro'))) ||
                            (frederiksbjergRadio.checked && cafe.address.includes('Frederiksberg'))
                        )
                    );


                console.log("cafe:", cafe.cafe_name, "Should display:", shouldDisplayCafe);

                if (shouldDisplayCafe) {
                    const cafeLi = document.createElement('li');
                    cafeLi.innerText = cafe.cafe_name;
                    ulCafes.appendChild(cafeLi);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching cafes", error);
        });
}
document.querySelectorAll('input[type="checkbox"]').forEach(radio => {
    radio.addEventListener('change',fetchCafesAndDisplay);
})


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
                    console.warn(`Cafe "${cafe_name}" has missing or invalid location information.`);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching cafe data",error);
        });
}


// Get latitude and longitude from the api  https://geocode.maps.co/search?q={address}
//https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(cafeAddress)}&city=${encodeURIComponent(city)}&postalcode=${encodeURIComponent(postalCode)}&format=json

function fetchlatandlong (cafeName,cafeAddress,city,postalCode,descriptions) {
    console.log('fetchlatandlong called');
    return new Promise((resolve, reject) => {
        const apiUrl = `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(cafeAddress)}&city=${encodeURIComponent(city)}&postalcode=${encodeURIComponent(postalCode)}&format=json`
        fetch(apiUrl)
            .then(response => {
                console.log("response status", response);
                return response.json();
            })
            .then(coordinates => {
                console.log("Geocoding API response:", coordinates);
                let cafeData;
                if (Array.isArray(coordinates) && coordinates.length > 0 ) {
                    const {lat,lon} = coordinates[0];
                    cafeData = {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                        cafe_name: cafeName,
                        address: coordinates[0].display_name,
                        descriptions: descriptions
                    };
                } else {
                    console.error("Geocoding API response is empty or not in the expected format");
                    reject("Invalid geocoding response");
                    return;
                }
                console.log("Coordinates Data", cafeData);
                resolve([cafeData]);

            })
            .catch(error => {
                console.log("Error in fetching data", error);
                reject(error);
            })
    })

}

function getCoordinatesInDb (cafeName,cafeAddress,city,postalCode,descriptions) {
    fetchlatandlong(cafeName,cafeAddress,city,postalCode,descriptions)
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

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'checkbox' + (index + 1);
                checkbox.classList.add('favorite-checkbox');

                const labelForCheckbox = document.createElement('label');
                labelForCheckbox.setAttribute('for',checkbox.id);
                labelForCheckbox.textContent = 'Add to favorite'
                labelForCheckbox.classList.add('favorite-checkbox-label');

                const pTagCafeName = document.createElement('p');
                pTagCafeName.textContent = cafe.cafe_name;
                pTagCafeName.id = 'pTagCafeName' + (index + 1);
                pTagCafeName.classList.add('cafe-name');

                const pTagDescription = document.createElement('p');
                pTagDescription.textContent = cafe.descriptions;
                pTagDescription.id = 'pTagDescription' + (index + 1);
                pTagDescription.classList.add('description');

                const pTagAddress = document.createElement('p');
                pTagAddress.textContent = cafe.address;
                pTagAddress.id = 'pTagAddress' + (index + 1);
                pTagAddress.classList.add('address');


                cafeBox.appendChild(checkbox);
                cafeBox.appendChild(labelForCheckbox);
                cafeBox.appendChild(pTagCafeName);
                cafeBox.appendChild(pTagDescription);
                // Ensures that the rating gets appended between description and address
                if (cafe.rating !== null && cafe.rating > 0) {
                    const pTagRating = document.createElement('p');
                    pTagRating.textContent = `Rating: ${cafe.rating}`;
                    pTagRating.id = 'pTagRating' + (index + 1);
                    pTagRating.classList.add('rating');
                    cafeBox.appendChild(pTagRating);
                }
                cafeBox.appendChild(pTagAddress);
                cafeSection.appendChild(cafeBox);
            });
        })
        .catch(error => {
            console.error('Error fetching the cafe data', error);
        })
}




