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