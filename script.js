let previousPosition;
let currentSpeed = 0;

const speedDisplay = document.getElementById("speedDisplay");

if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        (position) => {
            if (previousPosition) {
                const currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                const distance = calculateDistance(previousPosition, currentPosition);
                const elapsedTime = (position.timestamp - previousPosition.timestamp) / 1000;
                currentSpeed = (distance / elapsedTime) * 3.6;
                speedDisplay.innerText = currentSpeed.toFixed(1);
            }
            previousPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp,
            };
        },
        (error) => {
            console.error(error);
        }
    );
} else {
    console.error("Geolocation is not supported by your browser");
}

function calculateDistance(p1, p2) {
    const radians = (p1, p2) => {
        const lat1 = (Math.PI / 180) * p1.latitude;
        const lat2 = (Math.PI / 180) * p2.latitude;
        const lon1 = (Math.PI / 180) * p1.longitude;
        const lon2 = (Math.PI / 180) * p2.longitude;
        return { lat1, lat2, lon1, lon2 };
    };
    const R = 6371e3; // metres
    const { lat1, lat2, lon1, lon2 } = radians(p1, p2);
    const a =
        Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) * Math.sin((lon2 - lon1) / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}