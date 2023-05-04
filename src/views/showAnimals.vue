<template>
    <div class="container">
        <h2>Lista zwierzaków</h2>
        <div class="row">
            <div class="col-md-8">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Gatunek</th>
                        <th>Płeć</th>
                        <th>Data urodzenia</th>
                        <th>Zdjęcie zwierzaka</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="animals in animals" :key="animals.name">
                        <td>{{ animals.animalName }}</td>
                        <td>{{ animals.animalSpecies }}</td>
                        <td>{{ animals.animalGender }}</td>
                        <td>{{ animals.animalBirthDate }}</td>
                        <td><img :src="animals.animalPhotoLink" :style="{ maxWidth: '100px', maxHeight: '100px' }" alt="Animal image"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script>
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "@/main";

export default {
    name: "AnimalsList",
    data() {
        return {
            animals: [],
        };
    },
    created() {
        this.getAnimals();
    },
    methods: {
        async getAnimals() {
            const user = auth.currentUser;
            if (user) {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('email', '==', user.email));
                const querySnapshotUsers = await getDocs(q);
                querySnapshotUsers.forEach(async (doc) => {
                    console.log(`Owners ID: ${doc.id}`);
                    const animalsRef = collection(doc.ref, 'animals');
                    try {
                        const querySnapshotAnimals = await getDocs(animalsRef);
                        querySnapshotAnimals.forEach((doc) => {
                            const data = doc.data();
                            this.animals.push({
                                animalBirthDate: data.animalBirthDate,
                                animalGender: data.animalGender,
                                animalName: data.animalName,
                                animalPhotoLink: data.animalPhotoLink,
                                animalSpecies: data.animalSpecies,
                            });

                        });
                    } catch (error) {
                        console.error(error);
                    }
                });
            }
        },
    },
};
</script>