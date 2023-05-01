<script>

</script>

<template>
    <div class="container col-sm-4 col-md-4 text-center">
        <h1>Login form:</h1>
        <form id="logowanie">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <label for="login-logowanie">Login: </label><input type="email" id="login-logowanie" name="login"
                        required>
                </div>
                <div class="col-sm-12 col-md-12">
                    <label for="password-logowanie">Password: </label><input type="password" id="password-logowanie"
                        name="password" required>
                </div>
                <div class="col-sm-12 col-md-12">
                    <button type="submit">Log in</button>
                </div>
            </div>
        </form>

        <h1>Sign in with Google!</h1>
        <button id="login-google">Sign In with Google</button>

        <h1>Registration form:</h1>

        <form id="register">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <label for="register-name" class="col-sm-2 col-form-label">Name:</label>
                    <input type="text" class="form-control" id="register-name" name="register-name" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="register-login">Login:</label>
                    <input type="text" class="form-control" id="register-login" name="register-login" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="register-email">E-mail:</label>
                    <input type="email" class="form-control" id="register-email" name="register-email" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="register-password">Password:</label>
                    <input type="password" class="form-control" id="register-password" name="register-password" required>
                </div>
                <div class="col-md-6 col-sm-6">
                    <label for="register-password-repeat">Repeat password:</label>
                    <input type="password" class="form-control" id="register-password-repeat"
                        name="register-password-repeat" required>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</template>