<template>
  <div class="container">
    <h2>List of Appointments</h2>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="table-responsive-sm">
          <table class="table">
            <thead>
              <tr>
                <th>Animal</th>
                <th>Date</th>
                <th>Vet Name</th>
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
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from "../main";

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

      const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }

      if (user) {
        this.email = user.email;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.owner === user.email) {
            this.appointments.push({
              animalName: data.animalName,
              date: formatTimestamp(data.date),
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
