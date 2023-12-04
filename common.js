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
            cafeContainer.innerHTML = '';
            cafes.forEach(cafe => {
                const cafeDiv = document.createElement('div');
                cafeDiv.innerText = cafe.cafe_name;
                cafeContainer.appendChild(cafeDiv);
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
}