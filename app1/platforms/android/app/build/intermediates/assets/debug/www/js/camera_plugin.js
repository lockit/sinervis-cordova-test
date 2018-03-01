var camera_plugin = {

    config: {
        elementId: '#myImage'
    },

    capturePhoto: function(){
        navigator.camera.getPicture(this.onPhotoTaken, this.onPhotoFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true,
        });
    },

    onPhotoTaken: function(imageURI){
        var element = $(camera_plugin.config.elementId);
        element.attr('src', imageURI);
    },

    onPhotoFail: function(message){
        console.log('Fallito perché: '+ message);
    }
}