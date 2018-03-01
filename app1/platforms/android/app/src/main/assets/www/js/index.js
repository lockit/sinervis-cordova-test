
var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        document.addEventListener("deviceready", onCameraReady, false);
    }
};

app.initialize();

function onCameraReady() {
    console.log(navigator.camera);
}