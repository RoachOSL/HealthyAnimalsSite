<template>
    <div class="map"></div>
</template>
  
<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
    name: 'Map',
    data() {
        return {
            currentLocation: null,
        }
    },
    async mounted() {
        const map = L.map(this.$el).setView([51.505, -0.09], 10)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

        // Get current location
        if (navigator.geolocation) {
            const position = await this.getCurrentPosition()
            this.currentLocation = L.latLng(position.coords.latitude, position.coords.longitude)
            map.setView(this.currentLocation, 10)
            const marker = L.marker(this.currentLocation).addTo(map)
            marker.bindPopup('Your current location').openPopup() // add popup and open it
            // Get nearest wet clinics
            const vetLocations = await this.getNearestVets(this.currentLocation)
            if (vetLocations) {
                vetLocations.forEach(marker => {
                    marker.addTo(map)
                })
            }
        }
    },
    methods: {
        getCurrentPosition() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        },
        async getNearestVets(location) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=weterynarz&format=json&limit=10&bounded=1&viewbox=${location.lng - 0.1},${location.lat - 0.1},${location.lng + 0.1},${location.lat + 0.1}`)
            const data = await response.json()
            if (data.length > 0) {
                const markers = data.map(result => {
                    const latlng = L.latLng(result.lat, result.lon)
                    const name = result.display_name || ''
                    const address = ''
                    const popupContent = `<strong>${name}</strong><br>${address}`
                    return L.marker(latlng).bindPopup(popupContent)
                })
                return markers
            }
            return null
        },

    },
}
</script>
  
<style>
.map {
    height: 500px;
}
</style>
