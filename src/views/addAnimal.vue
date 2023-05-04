<template>
    <div class="container">
        <form>
            <div class="add-animal">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="species">Species:</label>
                            <input type="text" class="form-control" id="species" name="species" required>
                        </div>
                        <div class="form-group">
                            <label for="gender">Gender:</label>
                            <select class="form-control" id="gender" name="gender" required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="birthdate">Birthdate:</label>
                            <input type="date" class="form-control" id="birthdate" name="birthdate" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="photo">Photo:</label>
                        <input type="file" class="form-control-file" id="photo" name="photo">
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary">Add Animal</button>
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
    color:white;
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
.download-button{
    border: 2px solid black;
    color:white;
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

<script>
export default {
    data() {
        return {
            photo: null,
            constraints: { video: { facingMode: "environment" } },
            stream: null
        };
    },
    mounted() {
        this.startCamera();
    },
    methods: {
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
    }
};
</script>