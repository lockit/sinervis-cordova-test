
var cameraPlugin = {
    config: {
        elementId: "#myImage",
        galleryFolder: "gallery"
    },
    // capturePhoto
    capturePhoto: function() {
        navigator.camera.getPicture(
            cameraPlugin.capturePhotoOnSuccess, 
            cameraPlugin.capturePhotoOnFail,
            { 
                quality: 50, 
                destinationType: Camera.DestinationType.FILE_URI 
            }
         );
    },
    capturePhotoOnSuccess: function(imageURI) {
        var myImage = $(cameraPlugin.config.elementId);
        myImage.attr("src", imageURI);
        cameraPlugin.savePhoto(imageURI);
    },
    capturePhotoOnFail: function(message) {
        console.log('capturePhoto failed: ' + message);
    },
    // savePhoto
    savePhoto: function(imageURI) {
        window.resolveLocalFileSystemURL(
            imageURI, 
            cameraPlugin.savePhotoOnSuccess, 
            cameraPlugin.savePhotoOnFail
        );
    },
    savePhotoOnSuccess: function(dataEntry) {
        var now = new Date();
        var name = now.getTime()+".jpg";
        var folder = cameraPlugin.config.galleryFolder;

        window.requestFileSystem(
            LocalFileSystem.PERSISTENT, 
            0, 
            function(fileSys) {
                fileSys.root.getDirectory(
                    folder,
                    { create: true, exclusive: false },
                    function(directory) {
                        dataEntry.moveTo(
                            directory, 
                            name, 
                            function(entry) {
                                // on success
                                console.log("savePhotoOnSuccess");
                                app.refreshGallery();
                                //console.log(entry);
                                //
                            }, 
                            cameraPlugin.savePhotoOnFail
                        );
                    },
                    cameraPlugin.savePhotoOnFail
                );
            }, 
            cameraPlugin.savePhotoOnFail
        );
    },
    savePhotoOnFail: function(error) {
        console.log("savePhoto failed: ");
        console.log(error);
    }
};