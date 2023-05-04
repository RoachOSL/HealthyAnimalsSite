<template>
    <div class="container">
        <h2>Add Appointment</h2>
        <form id="appoForm">
            <div class="row">
                <div class="addApoinment">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="appoAnimalName">Animal name:</label>
                            <input type="text" class="form-control" id="appoAnimalName" placeholder="Enter name" name="appoAnimalName" required>
                        </div>
                        <div class="form-group">
                            <label for="appoDate">Date of Visit:</label>
                            <input type="datetime-local" class="form-control" id="appoDate" placeholder="Enter date" name="appoDate" required>
                        </div>
                        <div class="form-group">
                            <label for="appoVetName">Vet Doc Name:</label>
                            <input type="text" class="form-control" id="appoVetName" placeholder="Enter vet name" name="appoVetName" required>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveAppointment()">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
// Import the functions you need from the SDKs you need
import {collection, addDoc} from 'firebase/firestore';
import {auth, db} from "../main";


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