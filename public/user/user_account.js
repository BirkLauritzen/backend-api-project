async function fetchUserInfo() {
    try {
        const response = await fetch('/api/user-info', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken') // or your method of sending the token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming data contains user details
        document.querySelector('.user-data p:nth-child(1)').textContent = `Name: ${data.first_name} ${data.last_name}`;
        document.querySelector('.user-data p:nth-child(2)').textContent = `Email: ${data.email}`;
        document.querySelector('.user-data p:nth-child(3)').textContent = `Address: ${data.address}`;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);