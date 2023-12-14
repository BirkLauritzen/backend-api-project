async function fetchUserInfo() {
    const sessionId = localStorage.getItem('sessionId');

    if (!sessionId) {
        console.error('No session ID found');
        return;
    }

    try {
        const response = await fetch(`/api/user-info/${sessionId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userInfo = await response.json();
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        document.querySelector('.user-data p:nth-child(1)').textContent = `Name: ${userInfo.first_name} ${userInfo.last_name}`;
        document.querySelector('.user-data p:nth-child(2)').textContent = `Email: ${userInfo.email}`;
        // ... update other fields
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);



/*function isLoggedIn (req,res,next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}*/

function updateUserFavoriteList () {

}