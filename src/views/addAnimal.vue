<template>
    <div class="container">
        <form id="dodawanieForm">
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="animalName">Imię zwierzaka:</label><input type="text" class="form-control" id="animalName" name="animalName" required>
                    </div>
                    <div class="form-group">
                        <label for="animalSpecies">Gatunek:</label><input type="text" class="form-control" id="animalSpecies" name="animalSpecies" required>
                    </div>
                    <div class="form-group">
                        <label for="animalGender">Płeć:</label>
                        <select class="form-control" id="animalGender" name="animalGender" required>
                            <option value="samiec">Samiec</option>
                            <option value="samica">Samica</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="animalBirthDate">Data urodzenia:</label><input type="date" class="form-control" id="animalBirthDate" name="animalBirthDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="animalPhoto">Zdjęcie zwierzaka:</label><input type="file" class="form-control-file" id="animalPhoto" name="animalPhoto" required>
                </div>
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary" @click="addAnimalToLoggedUser()">Dodaj zwierzaka!</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

import {auth, db} from "@/main";


export default {
    data() {
        return {
            userEmail: null
        }
    },
    methods: {
        async addAnimalToLoggedUser() {
            const dodawanie = document.getElementById('dodawanieForm');
            const animalName = dodawanie.animalName.value;
            const animalSpecies = dodawanie.animalSpecies.value;
            const animalGender = dodawanie.animalGender.value;
            const animalBirthDate = dodawanie.animalBirthDate.value;
            const animalPhoto = dodawanie.animalPhoto.files[0];
            let animalPhotoLink = null;

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', this.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                console.log(`Owners ID: ${doc.id}`);
                const animalsRef = collection(doc.ref, 'animals');
                try {
                    const storage = getStorage();
                    const storageRef = ref(storage, animalPhoto.name);
                    await uploadBytes(storageRef, animalPhoto).then(() => {
                        console.log('Uploaded a file!');
                    });
                    animalPhotoLink = await getDownloadURL(storageRef);
                    const docRef = await addDoc(animalsRef, {
                        animalName: animalName,
                        animalSpecies: animalSpecies,
                        animalGender: animalGender,
                        animalBirthDate: animalBirthDate,
                        animalPhotoLink: animalPhotoLink
                    });
                    console.log(`Collection added with ID: ${docRef.id}`);
                } catch (error) {
                    console.error(error);
                }
            });

            dodawanie.reset();
        }
    },
    mounted() {
        const user = auth.currentUser;
        if (user) {
            this.email = user.email;
        }
    },
}
</script>