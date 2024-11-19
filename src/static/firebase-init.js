import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";

// Firebase configuration
const firebaseConfig = {
   
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request permission and get token
export async function requestPermissionAndSaveToken() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/firebase-messaging-sw.js', { scope: '/' })
            .then(function(registration) {
                console.log("Service Worker Registered!");
            }).catch(function(err) {
                console.log("Service Worker not registered!", err);
            });
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const registration = await navigator.serviceWorker.register('static/firebase-messaging-sw.js', { scope: '/static/' });

            console.log('Service Worker registered successfully:', registration.scope);

            // Get the FCM token
            const token = await getToken(messaging, {
                vapidKey: "",  // Your VAPID key here
                serviceWorkerRegistration: registration
            });

            if (token) {
                // Send the token to the backend
                await fetch('/save_fcm_token/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fcm_token: token })
                });
            }
        } else {
            alert('Please enable notifications to create products.');
        }
    } catch (error) {
        console.error("Error getting token or permission:", error);
    }
}

// Listener for receiving messages in the foreground
onMessage(messaging, (payload) => {
    console.log('Message received: ', payload);
    alert(`Notification received: ${payload.notification.title}`);
});

new DOMException()
new DOMException(message)
new DOMException(message, name)


const button = document.querySelector("button");

button.onclick = () => {
  try {
    throw new DOMException("Custom DOM Exception Triggered.");
  } catch (error) {
    document.querySelector("#output").textContent = `Error: ${error.message}`;
  }
};
