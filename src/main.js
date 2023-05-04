import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe4LI9zLeRdLkdKBemzK1Aq0udU-50W90",
    authDomain: "projekt-a9a54.firebaseapp.com",
    projectId: "projekt-a9a54",
    storageBucket: "projekt-a9a54.appspot.com",
    messagingSenderId: "999250009417",
    appId: "1:999250009417:web:a1b9e4717d0f285fe80e98"
};

export const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
export const auth = getAuth();

const app = createApp(App)
app.use(router)
app.mount('#app')

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}