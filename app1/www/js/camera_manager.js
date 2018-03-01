var camera_manager = {
    config : {
        elementId: '#myImage',
        galleryFolder: 'myPhotos' 
    },

    capturePhoto: function() {
        //Per vedere le option visita la pagina del plugin
        navigator.camera.getPicture(this.onPhotoTaken, this.onCameraError, cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true
        });
    },
    
    //Consigliato imageURI anziché Base64 per problemi di pesantezza dell'immagine
    onPhotoTaken: function(imageURI){ 
        var myImage = $(camera_manager.config.elementId);
        //Imposta come src dell'img l'imageURI
        myImage.attr('src', imageURI);
        camera_manager.movePhoto(imageURI);
    },

    onCameraError: function(message){
        console.log("Fallito perché: " + message)
    },

    movePhoto: function(file_URI){
        window.resolveLocalFileSystemURL(file_URI, camera_manager.onResolveSuccess, camera_manager.onResolveError);
    },
    
    onResolveSuccess: function(entry) {
        var now = new Date();
        var newName = now.getTime() + '.jpg';
        var folder = camera_manager.config.galleryFolder;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys){
            fileSys.root.getDirectory(
                folder,
                {create: true, exclusive: false},
                function (directory){
                    entry.moveTo(directory, newName, camera_manager.onMoveSuccess, camera_manager.onMoveError);
                },
                camera_manager.onResolveError
            );
        },
        camera_manager.onResolveError
        );
    },
    onMoveSuccess: function(){
        console.log("");
    }, 

    onResolveError: function() {
        console.log("");
    },
};