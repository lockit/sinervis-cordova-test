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
        var element = $(camera_plugin.config.elementId);
        element.attr('src', imageURI);
        app.refreshGallery();
        camera_plugin.movePhoto(imageURI);
        
    },

    onPhotoFail: function(message){
        console.log('Fallito perché: '+ message);
    },

    movePhoto: function(file_uri){
        window.resolveLocalFileSystemURL(file_uri, 
                                        camera_plugin.onResolveSuccess, 
                                        camera_plugin.onResolveError);
    },

    onResolveSuccess: function(entry){
        var now = new Date();
        var newName = now.getTime() + '.jpg';
        var folder = camera_plugin.config.galleryFolder;

        window.requestFileSystem( // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(), onResolveError);
            LocalFileSystem.PERSISTENT, 
            0, 
            function(fileSys){ //function() { filesys.roo.getdirectory(folder, options, function(directory), onResolveError ); }
                fileSys.root.getDirectory(
                    folder,
                    {
                        create: true,
                        exclusive: false
                    },
                    function(directory){ // function(directory) { entry.moveTo( directory, newName, onMoveSuccess, onResolveError); }
                        entry.moveTo(
                            directory, 
                            newName, 
                            camera_plugin.onMoveSuccess, 
                            camera_plugin.onResolveError
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
    
    onResolveError: function(){
        console.log(error);
    }
}