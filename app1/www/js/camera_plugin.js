var camera_plugin = {
    config: {
      elementId: '#myImage',
      galleryFolder: 'myPhoto'
    },
    capturePhoto: function(){
      navigator.camera.getPicture(this.onPhotoTaken, this.onPhotoFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true
      });
    },
    onPhotoTaken: function(imageURI){
      var myImage = $(camera_plugin.config.elementId);
      myImage.attr('src', imageURI);
      app.refreshGallery();
      camera_plugin.movePhoto(imageURI);
    },
    onPhotoFail: function(message){
      console.log('Fallito perché: '+ message);
    },
    movePhoto: function(file_uri){
      window.resolveLocalFileSystemURL(file_uri, camera_plugin.onResolveSuccess, camera_plugin.onResolveError);
    },
    onResolveSuccess: function(entry){
      var now = new Date();
      var newName = now.getTime() + '.jpg';
      var folder = camera_plugin.config.galleryFolder;
  
      window.requestFileSystem(LocalFileSystem.PERSISTENT,
                               0,
                               function(fileSys){
                                   fileSys.root.getDirectory(
                                   folder,
                                   { create: true, exclusive: false },
                                   function(directory){
                                     entry.moveTo(directory, newName, camera_plugin.onMoveSuccess, camera_plugin.onResolveError
                                                );
                                   },
                                   camera_plugin.onResolveError
                                 );
                               },
                               camera_plugin.onResolveError
                            );
    },
    onMoveSuccess: function(entry){
      console.log(entry);
    },
    onResolveError: function(error){
      console.log(error);
    }
  };
  