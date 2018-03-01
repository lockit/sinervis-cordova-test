
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
        this.galleryFolder = cordova.file.dataDirectory + 'files/' + camera_manager.config.galleryFolder;
        app.refreshGallery();
    },

    refreshGallery: function() {
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.createReader().readEntries(app.loadGallery,app.errorGallery);
        });
    },
    
    loadGallery: function(selection){
        var gallery = $("#myGallery");
        gallery.html("");
        for (var i = 0; i < selection.length; i++) {
            var img ='<div><img src="' + selection[i].nativeURL + '"/></div>';
            gallery.append(img);
        }
    },
};

app.initialize();