<template>
    <div class="container">
        <h2>List of Animals</h2>
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <div class="table-responsive-sm">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Species</th>
                                <th>Gender</th>
                                <th>Birth Date</th>
                                <th>Animal Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="animal in animals" :key="animal.name">
                                <td>{{ animal.animalName }}</td>
                                <td>{{ animal.animalSpecies }}</td>
                                <td>{{ animal.animalGender }}</td>
                                <td>{{ animal.animalBirthDate }}</td>
                                <td><img :src="animal.animalPhotoLink" :style="{ maxWidth: '100px', maxHeight: '100px' }"
                                        alt="Animal image"></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../main";

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