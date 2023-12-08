document.addEventListener('DOMContentLoaded',function () {
    fetchCafesAndDisplay();
});

document.addEventListener("DOMContentLoaded",function (){
    fetchDataAndDisplayMap();
});

const btnForCafe = document.querySelector('#btn-for-cafe');
btnForCafe.addEventListener('click', function () {
    getCoordinatesInDb();
});