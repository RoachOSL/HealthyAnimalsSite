<template>
    <div class="container">
        <h2>Add Appointment</h2>
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" required>
            </div>
            <div class="form-group">
                <label for="date">Date of Visit:</label>
                <input type="datetime-local" class="form-control" id="date" placeholder="Enter date" required>
            </div>
            <div class="form-group">
                <label for="vet">Vet Doc Name:</label>
                <input type="text" class="form-control" id="vet" placeholder="Enter vet name" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>