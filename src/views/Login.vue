<template>
    <div class="container col-sm-4 col-md-4 text-center">
        <h1>Login form:</h1>
        <form id="logInForm">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <label for="logInEmail">Email: </label><input type="email" id="logInEmail" name="logInEmail"
                        required>
                </div>
                <div class="col-sm-12 col-md-12">
                    <label for="logInPassword">Password: </label><input type="password" id="logInPassword"
                        name="logInPassword" required>
                </div>
                <div class="col-sm-12 col-md-12">
                    <button type="button" @click="logInWithEmailAndPassword()">Log in</button>
                </div>
            </div>
        </form>

        <h1>Sign in with Google!</h1>
        <button id="login-google" @click="signInWithGoogle()">Sign In with Google</button>

        <h1>Registration form:</h1>

        <form id="registerForm">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <label for="registerName" class="col-sm-2 col-form-label">Name:</label>
                    <input type="text" class="form-control" id="registerName" name="registerName" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="registerEmail">E-mail:</label>
                    <input type="email" class="form-control" id="registerEmail" name="registerEmail" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="registerPassword">Password:</label>
                    <input type="password" class="form-control" id="registerPassword" name="registerPassword" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="registerPasswordRepeat">Repeat password:</label>
                    <input type="password" class="form-control" id="registerPasswordRepeat"
                        name="registerPasswordRepeat" required>
                </div>
            </div>
            <button type="button" @click="registerWithEmailAndPassword()" class="btn btn-primary">Register</button>
        </form>

<!--        <h1>Wyloguj się</h1>-->
<!--        <form id="signOutForm">-->
<!--            <button type="button" @click="logOut()">Wyloguj!</button>-->
<!--        </form>-->
    </div>
</template>

<script>
// Import the functions you need from the SDKs you need
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../main";

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
        // logOut() {
        //     auth.signOut()
        //         .then(() => {
        //             console.log(`User logged out.`);
        //         });
        //     this.user = null;
        // },
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