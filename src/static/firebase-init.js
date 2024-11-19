import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermissionAndSaveToken() {
    try {
        // Register the Service Worker
        const registration = await navigator.serviceWorker.register('/static/firebase-messaging-sw.js', { scope: '/static/' });
        console.log('Service Worker registered:', registration);

        // Request Notification Permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Notification permission not granted.');
        }

        // Get FCM Token
        const token = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY", // Replace with your Firebase project's VAPID key
            serviceWorkerRegistration: registration
        });

        console.log('FCM Token:', token);

        // Send the token to the server
        await fetch('/save_fcm_token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fcm_token: token })
        });

        console.log('Token saved to backend.');
    } catch (error) {
        console.error('Error during permission request or token generation:', error);
    }
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);

    const { title, body } = payload.notification;
    alert(`Notification received:\n\nTitle: ${title}\nBody: ${body}`);
});
