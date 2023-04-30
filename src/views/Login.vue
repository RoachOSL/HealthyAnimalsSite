<script>

</script>



<template>
    <div class="container col-sm-4 col-md-4 text-center">
        <h1>Zaloguj się emailem!</h1>
        <form id="logowanie">
            <div class="container">
                <label for="login-logowanie">Login: </label><input type="email" id="login-logowanie" name="login" required>
            </div>
            <div class="container">
                <label for="password-logowanie">Hasło: </label><input type="password" id="password-logowanie"
                    name="password" required>
            </div>
            <div class="container">
                <button type="submit">Zaloguj się!</button>
            </div>
        </form>

        <h1>Zaloguj się przez Google!</h1>
        <button id="zaloguj-google">Sign In with Google</button>

        <h1>Zarejestruj się</h1>


        <form id="register">
            <div class="container">
                <label for="register-email">e-mail</label><input type="email" id="register-email" name="register-email">
            </div>
            <label for="register-password">Hasło</label><input type="password" id="register-password"
                name="register-password">
            <br>
            <div class="container">
                <label for="register-password-repeat">Powtórz hasło</label><input type="password" id="register-password-repeat"
                    name="register-password-repeat">
            </div>
            <label for="register-login">Login</label><input type="text" id="register-login" name="register-login">
            <br>
            <label for="register-name">Imię</label><input type="text" id="register-name" name="register-name">
            <br>
            <button type="submit">Zarejestruj</button>
        </form>

    </div>
</template>