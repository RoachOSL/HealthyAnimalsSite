<template>
    <div class="container">
        <h2>Lista wizyt</h2>
        <div class="row">
            <div class="col-md-8">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Imię zwierzaka</th>
                        <th>Data</th>
                        <th>Imię weterynarza</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="appointment in appointments" :key="appointment.owner">
                        <td>{{ appointment.animalName }}</td>
                        <td>{{ appointment.date }}</td>
                        <td>{{ appointment.vetName }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script>
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from "@/main";

export default {
    name: "AppointmentsList",
    data() {
        return {
            appointments: [],
        };
    },
    created() {
        this.getAppointments();
    },
    methods: {
        async getAppointments() {
            const querySnapshot = await getDocs(collection(db, 'appointments'));
            const user = auth.currentUser;
            if (user) {
                this.email = user.email;
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.owner === user.email) {
                        this.appointments.push({
                            animalName: data.animalName,
                            date: data.date,
                            owner: data.owner,
                            vetName: data.vetName,
                        });
                    }
                });
            }
        },
    },
    mounted() {
        const user = auth.currentUser;
        if (user) {
            this.email = user.email;
        }
    },
};
</script>