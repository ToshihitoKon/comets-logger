import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase'

var config = {
        apiKey: process.env.VUE_APP_APIKEY, 
        authDomain: process.env.VUE_APP_AUTHDOMAIN,
        databaseURL: process.env.VUE_APP_DATABASEURL,
        projectId: process.env.VUE_APP_PROJECTID,
        storageBucket:process.env.VUE_APP_STORAGEBUCKET,
        messagingSenderId:process.env.VUE_APP_MESSAGINGSENDER 
}

firebase.initializeApp(config)
firebase.auth().signInAnonymously();

createApp(App).mount('#app')
