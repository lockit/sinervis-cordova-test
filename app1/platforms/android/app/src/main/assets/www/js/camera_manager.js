var camera_manager = {
    config : {
        elementId: '#myImage' 
    },

    capturePhoto: function() {
        //Per vedere le option visita la pagina del plugin
        navigator.camera.getPicture(this.onPhotoTaken, this.onCameraError, cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    },
    
    //Consigliato imageURI anziché Base64 per problemi di pesantezza dell'immagine
    onPhotoTaken: function(imageURI){ 
        var myImage = $(camera_manager.config.elementId);
        //Imposta come src dell'img l'imageURI
        myImage.attr('src', imageURI);
    },

    onCameraError: function(message){
        console.log("Fallito perché: " + message)
    }
};