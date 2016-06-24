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
  busMarkers = busses.map(bus => {
    console.log(bus)
    let marker = new google.maps.Marker({
      positon: {lat: bus.lat, lng: bus.long},
      map
    })
    marker.setMap(map)
    return marker
  })
})
