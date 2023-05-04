<template>
    <div class="container">
        <h2>Add Appointment</h2>
        <form id="appoForm">
            <div class="form-group">
                <label for="appoAnimalName">Imię zwierzaka:</label>
                <input type="text" class="form-control" id="appoAnimalName" name="appoAnimalName" required>
            </div>
            <div class="form-group">
                <label for="appoDate">Data wizyty:</label>
                <input type="datetime-local" class="form-control" id="appoDate" name="appoDate" required>
            </div>
            <div class="form-group">
                <label for="appoVetName">Imię weterynarza:</label>
                <input type="text" class="form-control" id="appoVetName" name="appoVetName" required>
            </div>
            <button type="button" class="btn btn-primary" @click="saveAppointment()">Zapisz wizytę!</button>
        </form>
    </div>
</template>
<script>
// Import the functions you need from the SDKs you need
import {collection, addDoc} from 'firebase/firestore';

import {auth, db} from "@/main";


export default {
    methods: {
        async saveAppointment() {
            const appointment = document.getElementById('appoForm');
            const appoAnimalName = appointment.appoAnimalName.value;
            const appoDate = appointment.appoDate.value;
            const appoVetName = appointment.appoVetName.value;

            const docRef = await addDoc(collection(db, 'appointments'), {
                animalName: appoAnimalName,
                date: appoDate,
                owner: this.email,
                vetName: appoVetName
            });
            console.log(`Appointment added with ID: ${docRef.id}`);

            appointment.reset();
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