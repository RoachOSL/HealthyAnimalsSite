
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-9 col-md-9">
                <h2>Contact Us</h2>
                <p>Thank you for considering Healthy Animal for your pet care needs. Our team of experts is always available
                    to answer your questions, provide advice, and schedule appointments for your pets. Whether you need to
                    book a visit to the veterinarian, request a treatment for your animal, or simply have a question about
                    pet health and wellbeing, we're here to help.</p>

                <p>To get in touch with us, please fill out the form below or reach out to us directly via email.
                    We strive to respond to all inquiries as quickly as possible, usually within 24 hours. We look forward
                    to hearing
                    from you soon!</p>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="col-sm-9 col-md-9 mx-auto">
            <form class="row g-3" action="https://formsubmit.co/45e01e9003d1f20987ad6f09a49af148" method="POST"
                enctype="multipart/form-data">
                <!-- Honeypot -->
                <input type="text" name="_honey" style="display: none">

                <!-- Disable Captcha-->
                <input type="hidden" name="_captcha" value="false">

                <input type="hidden" name="_next" value="https://roachosl.github.io/HealthyAnimalsSite/">

                <div class="col-md-5">
                    <label for="firstName">Name:</label>
                    <input type="text" class="form-control" name="Name:" id="firstName" required>
                </div>
                <div class="col-md-7">
                    <label for="emailInfo">Email:</label>
                    <input type="email" class="form-control" name="E-mail:" id="emailInfo" required>
                </div>
                <div class="col-md-12">
                    <input type="file" name="attachment" accept="audio/*">
                </div>
                <div class="col-md-12">
                    <label for="message">Message:</label>
                    <textarea class="form-control" name="Comments,&nbsp;questions:" id="message" rows="5"
                        required></textarea>
                </div>
                <div class="col-md-12 text-center">
                    <button type="submit" class="btn-lg btn-primary">Submit</button>
                </div>
            </form>
            <div class="microButtons text-center">
                <button class="start" @click="startRecording">Start Recording</button>
                <button class="stop" @click="stopRecording">Stop Recording</button>
                <button @click="playRecording">Play Recording</button>
                <a :href="audioURL" download="recording.wav">Download Recording</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.microButtons {
    margin-top: 15px;
}

.microButtons button,
.microButtons a {
    text-align: center;
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

.microButtons button.start {
    background-color: green;
}

.microButtons button.stop {
    background-color: red;
}

.microButtons button:hover,
.microButtons a:hover {
    background-color: #0c7cd5;
}
</style>

<script>
export default {
    data() {
        return {
            mediaRecorder: null,
            audioChunks: [],
            audioURL: null,
        };
    },
    methods: {
        async startRecording() {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.addEventListener('dataavailable', (event) => {
                this.audioChunks.push(event.data);
            });
            this.mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(this.audioChunks);
                this.audioURL = URL.createObjectURL(audioBlob);
            });
            alert('Microphone recording started!');
            this.mediaRecorder.start();
        },
        stopRecording() {
            this.mediaRecorder.stop();
        },
        playRecording() {
            const audio = new Audio(this.audioURL);
            audio.play();
        },
    },
};
</script>




