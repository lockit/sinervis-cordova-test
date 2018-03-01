
var app = {
    galleryFolder: null,

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $("#cameraButton").on('click', function() {
            camera_manager.capturePhoto();
        });
        this.galleryFolder = cordova.file.dataDirectory + 'files/' + camera_manager.galleryFolder;
    },

    refreshGallery: function() {
        window.resolveLocalFileSystemURL(app.galleryFolder, function(emtry){
            entry.createReader().readEntries(loadGallery, errorGallery);
        });
    }
};

app.initialize();