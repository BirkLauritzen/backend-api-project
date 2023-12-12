document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/user-info', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken') // or your method of sending the token
        }
    })
        .then(response => response.json())
        .then(data => {
            // Assuming data contains user details
            document.querySelector('.user-data p:nth-child(1)').textContent = 'Name: ' + data.name;
            document.querySelector('.user-data p:nth-child(2)').textContent = 'Email: ' + data.email;
            document.querySelector('.user-data p:nth-child(3)').textContent = 'Address: ' + data.address;
        })
        .catch(error => console.error('Error:', error));
});
