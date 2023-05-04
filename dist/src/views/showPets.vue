
<template>
  <div class="container">
    <h2>List of Pets</h2>
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pet in pets" :key="pet.id">
              <td>{{ pet.name }}</td>
              <td>{{ pet.type }}</td>
              <td>{{ pet.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PetList",
  data() {
    return {
      newPet: {
        name: "",
        type: "",
        age: null,
      },
      pets: [{
        name: "Oskar",
        type: "Dog",
        age: 18,
      }],
    };
  },
  created() {
    this.getPets();
  },
  methods: {
    async addPet() {
      const db = firebase.firestore();
      const petRef = db.collection("pets").doc();
      this.newPet.id = petRef.id;
      await petRef.set(this.newPet);
      this.newPet = {
        name: "",
        type: "",
        age: null,
      };
      this.getPets();
    },
    async getPets() {
      const db = firebase.firestore();
      const petCollection = await db.collection("pets").get();
      this.pets = petCollection.docs.map((doc) => doc.data());
    },
  },
};
</script>