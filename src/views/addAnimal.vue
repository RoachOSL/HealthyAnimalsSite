<template>
    <div class="container">
        <form id="dodawanieForm">
            <div class="add-animal">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="animalName">Animal name:</label><input type="text" class="form-control"
                                                                               id="animalName" name="animalName"
                                                                               required>
                        </div>
                        <div class="form-group">
                            <label for="animalSpecies">Species:</label><input type="text" class="form-control"
                                                                              id="animalSpecies" name="animalSpecies"
                                                                              required>
                        </div>
                        <div class="form-group">
                            <label for="animalGender">Gender:</label>
                            <select class="form-control" id="animalGender" name="animalGender" required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="animalBirthDate">Birth date:</label><input type="date" class="form-control"
                                                                                   id="animalBirthDate"
                                                                                   name="animalBirthDate" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="animalPhoto">Animal photo:</label><input type="file" class="form-control-file"
                                                                             id="animalPhoto" name="animalPhoto"
                                                                             required>
                    </div>
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" @click="addAnimalToLoggedUser()">Add animal!
                        </button>
                    </div>
                    <div class="video-container">
                        <video class="video" ref="video" autoplay></video>
                    </div>
                    <div class="button-container">
                        <button class="buttonStartCam" @click="startCamera">Start Camera</button>
                        <button class="buttonPhoto" @click="takePhoto">Take Photo</button>
                        <a class="button download-button" :href="photo" download="photo.jpg">Download Photo</a>
                        <button class="buttonStopCam" @click="stopCamera">Stop Camera</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import {auth, db} from "../main";


export default {
    data() {
        return {
            photo: null,
            constraints: {video: {facingMode: "environment"}},
            stream: null,
            userEmail: null,
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
            if (animalName !== '' && animalSpecies !== '' && animalGender !== '' && animalBirthDate !== '' && animalPhoto) {
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
            } else {
                alert(`All fields are required!`);
            }
        },
        takePhoto() {
            const canvas = document.createElement("canvas");
            canvas.width = this.$refs.video.videoWidth;
            canvas.height = this.$refs.video.videoHeight;
            canvas.getContext("2d").drawImage(this.$refs.video, 0, 0);
            this.photo = canvas.toDataURL("image/jpeg");
        },
        stopCamera() {
            if (this.stream) {
                const tracks = this.stream.getTracks();
                tracks.forEach(track => track.stop());
                this.$refs.video.srcObject = null;
                this.stream = null;
            }
        },
        startCamera() {
            navigator.mediaDevices.getUserMedia(this.constraints)
                .then(stream => {
                    this.$refs.video.srcObject = stream;
                    this.stream = stream;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.startCamera();
        const user = auth.currentUser;
        if (user) {
            this.email = user.email;
        }
    },
}
</script>

<style scoped>
.video-container {
    text-align: center;
}

.video-container {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    margin-top: 20px;
    position: relative;
}

.video {
    width: 100%;
    height: auto;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.button {
    background-color: #2196F3;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 4px;
}

.button:hover {
    background-color: #0b7dda;
}

.buttonPhoto, .buttonStartCam {
    border: 2px solid black;
    color: white;
    background-color: #2196F3;
    padding: 12px 24px;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 15px;
}

.download-button {
    border: 2px solid black;
    color: white;
    background-color: rgb(42, 182, 42);
    padding: 12px 24px;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 15px;
}

.buttonStopCam {
    border: 2px solid black;
    color: white;
    background-color: red;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 15px;
}
</style>