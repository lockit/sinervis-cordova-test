
var cameraPlugin = {

    config: {
        elementId: "#myImage"
    },
    capturePhoto: function() {
        navigator.camera.getPicture(
            cameraPlugin.capturePhotoOnSuccess, 
            cameraPlugin.capturePhotoOnFail,
            { 
            quality: 50, 
            destinationType: Camera.DestinationType.FILE_URI }
         );
    },
    capturePhotoOnSuccess: function(imageURI) {
        var myImage = $(cameraPlugin.config.elementId);
        myImage.attr("src", imageURI);
    },
    capturePhotoOnFail: function(message) {
        console.log('capturePhoto failed: ' + message);
    }

};