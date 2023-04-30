<template>
    <div class="container">
        <form>
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
            </div>
        </form>
    </div>
</template>