var camera_plugin = {
  config: {
    elementId: '#myImage'
  },
  capturePhoto: function(){
    navigator.camera.getPicture(this.onPhotoTaken, this.onPhotoFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI
    });
  },
  onPhotoTaken: function(imageURI){
    var myImage = $(camera_plugin.config.elementId);
    myImage.attr('src', imageURI);
  },
  onPhotoFail: function(message){
    console.log('Fallito perché: '+ message);
  }
};
