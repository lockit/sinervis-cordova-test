var camera_plugin = {
    config: {
        elementId: '#myImage',
        folderName: 'myPhotos'
    },

    capturePhoto: function(){
        navigator.camera.getPicture(camera_plugin.onPhotoTaken, camera_plugin.onCameraError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });    
    },

    onPhotoTaken: function(imageURI){
        var myImage = $(camera_plugin.config.elementId);

        myImage.attr("src", imageURI);

        camera_plugin.movePhoto(imageURI);
    },

    movePhoto: function(imageURI){
        window.resolveLocalFileSystemURL(imageURI, camera_plugin.onSaveSuccess, camera_plugin.onSaveError);
    },

    onSaveSuccess: function(entry){
        var name = $.now() + ".jpg";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys){
            fileSys.root.getDirectory(camera_plugin.config.folderName, {create: true, exclusive: false}, function(directory){
                entry.moveTo(directory, name, camera_plugin.onMoveSuccess, camera_plugin.onSaveError);
            })
        }, camera_plugin.onSaveError);
    },

    onSaveError: function(){
        console.log("Error while trying to saving the photo");
    },

    onMoveSuccess: function(entry){
        console.log(entry);
        app.refreshGallery();
    },

    onCameraError: function(message){
        console.log('Failed because : ' + message);
    }
};