<template>
  <div class="container">
    <h2>List of Appointments</h2>
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Vet Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.animal }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.vet }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentList",
  data() {
    return {
      newAppointment: {
        animal: "",
        date: "",
        vet: "",
      },
      appointments: [
        {
          animal: "Rufik",
          date: "11.05.2023",
          vet: "Franciszek",
        },
      ],
    };
  },
  created() {
    this.getAppointments();
  },
  methods: {
    async addAppointment() {
      const db = firebase.firestore();
      const appointmentRef = db.collection("appointments").doc();
      this.newAppointment.id = appointmentRef.id;
      await appointmentRef.set(this.newAppointment);
      this.newAppointment = {
        animal: "",
        date: "",
        vet: "",
      };
      this.getAppointments();
    },
    async getAppointments() {
      const db = firebase.firestore();
      const appointmentCollection = await db.collection("appointments").get();
      this.appointments = appointmentCollection.docs.map((doc) => doc.data());
    },
  },
};
</script>
