let map
function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude}
    })
  })
}

const socket = io('/')
let busMarkers = []
socket.on('tick', busses => {
  busMarkers.forEach(busMarker => {
    busMarker.setMap(null)
  })
  busMarkers = busses.map(bus => {
    let marker = new google.maps.Marker({
      position: {lat: bus.lat, lng: bus.long}
    })
    marker.setMap(map)
    return marker
  })
})
