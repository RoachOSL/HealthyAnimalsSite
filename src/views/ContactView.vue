

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-8 col-md-8">
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
        <div class="col-md-8 mx-auto">
            <form class="row g-3" action="https://formsubmit.co/45e01e9003d1f20987ad6f09a49af148" method="POST">
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
                    <label for="message">Message:</label>
                    <textarea class="form-control" name="Comments,&nbsp;questions:" id="message" rows="5"
                        required></textarea>
                </div>
                <div class="col-md-12 text-center">
                    <button type="submit" class="btn-lg btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>




