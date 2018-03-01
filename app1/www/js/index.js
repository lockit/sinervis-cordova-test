
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
        camera_plugin.capturePhoto();
        $(`#cameraButton`).on(`click`,function(){
            camera_plugin.capturePhoto();

        })
        app.galleryFolder = cordova.file.dataDirectory + 'files/' + camera_plugin.config.galleryFolder;
    },
    refreshGallery: function(){
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.creatReader().readEntries(loadGallery,errorGallery);
        });
    }
};

app.initialize();