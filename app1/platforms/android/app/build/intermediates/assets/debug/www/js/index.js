
var app = {

    galleryFolder: null,
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        
        $("#cameraButton").on("click", function(){
            camera_plugin.capturePhoto();
        });
        app.galleryFolder = cordova.file.dataDirectory + 'files/' + camera_plugin.config.galleryFolder;
        app.refreshGallery();

       
    

    },
    refreshGallery: function() {
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.createReader().readEntries(app.loadGallery, app.errorGallery);
        });
    },

    loadGallery: function(selection) {
        
        var gallery = $("#myGallery");
        gallery.html("");
        for(var i=0; i < selection.length; i++){
            var img = '<div><img src="'+selection[i].nativeURL+'"/></div>'
            gallery.append(img);
        }

    },
    
    errorGallery: function(error){
        console.log(error)
    }
        
}



app.initialize();
