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