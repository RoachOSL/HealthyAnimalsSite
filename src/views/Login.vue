<template>
    <div class="container col-sm-4 col-md-4 text-center">
        <h1>Zaloguj się emailem!</h1>
        <form id="logInForm">
            <div class="container">
                <label for="logInEmail">Email: </label><input type="email" id="logInEmail" name="logInEmail" required>
            </div>
            <div class="container">
                <label for="logInPassword">Hasło: </label><input type="password" id="logInPassword" name="logInPassword" required>
            </div>
            <div class="container">
                <button type="button" @click="logInWithEmailAndPassword()">Zaloguj się!</button>
            </div>
        </form>

        <h1>Zaloguj się przez Google!</h1>
        <form id="registerGoogleForm">
            <button type="button" @click="signInWithGoogle()">Sign In with Google</button>
        </form>

        <h1>Zarejestruj się</h1>
        <form id="registerForm">
            <label for="registerEmail">e-mail</label><input type="email" id="registerEmail" name="registerEmail" required>
            <label for="registerPassword">Hasło</label><input type="password" id="registerPassword" name="registerPassword" required><br>
            <label for="registerPasswordRepeat">Powtórz hasło</label><input type="password" id="registerPasswordRepeat" name="registerPasswordRepeat" required>
            <label for="registerName">Imię</label><input type="text" id="registerName" name="registerName" required><br>
            <button type="button" @click="registerWithEmailAndPassword()">Zarejestruj</button>
        </form>

        <h1>Wyloguj się</h1>
        <form id="signOutForm">
            <button type="button" @click="signOut()">Wyloguj!</button>
        </form>
    </div>
</template>

<script>
// Import the functions you need from the SDKs you need
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/main";

export default {
    data() {
        return {
            userEmail: null
        }
    },
    methods: {
        registerWithEmailAndPassword() {
            const rejestracja = document.getElementById('registerForm');
            const email = rejestracja.registerEmail.value;
            const password = rejestracja.registerPassword.value;
            const passwordRepeat = rejestracja.registerPasswordRepeat.value;
            const name = rejestracja.registerName.value;
            if (password === passwordRepeat) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        const docRef = await addDoc(collection(db, 'users'), {
                            name: name,
                            email: email
                        });
                        console.log(`User added with ID: ${docRef.id}`);
                        const loggedUser = userCredential.user;
                        console.log('User signed up successfully:', loggedUser.email);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + ' - ' + errorMessage);
                        alert('Błąd rejestracji - ' + errorCode + ' - ' + errorMessage);
                    });
            }
            else {
                alert('Różne hasła');
            }
            rejestracja.reset();
        },
        logInWithEmailAndPassword() {
            const logowanie = document.getElementById('logInForm');
            const email = logowanie.logInEmail.value;
            const password = logowanie.logInPassword.value;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const loggedUser = userCredential.user;
                    console.log('User logged in successfully:', loggedUser.email);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + ' - ' + errorMessage);
                    alert('Błąd logowania - ' + errorCode + ' - ' + errorMessage);
                });
            logowanie.reset();
        },
        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const loggedUser = result.user;
                    const usersRef = collection(db, 'users');
                    const q = query(usersRef, where('email', '==', loggedUser.email));
                    const querySnapshotUsers = await getDocs(q);
                    if (querySnapshotUsers.empty) {
                        const docRef = await addDoc(collection(db, 'users'), {
                            name: loggedUser.displayName,
                            email: loggedUser.email
                        });
                        console.log(`User added with ID: ${docRef.id}`);
                    }
                    console.log('User signed in with Google:', loggedUser.displayName);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + ' - ' + errorMessage);
                    alert('Błąd rejestracji przez Google - ' + errorCode + ' - ' + errorMessage);
                });
        },
        signOut() {
            auth.signOut()
                .then(() => {
                    console.log(`User logged out.`);
                });
            this.user = null;
        },
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.userEmail = user.email;
            } else {
                this.userEmail = null;
            }
        });
    }
}
</script>