var camera_plugin = {
    config:{
        elementID:"#myImage",
        galleryFolder: 'myPhoto'
    },
    
    capturePhoto: function(){
        navigator.camera.getPicture(this.onPhotoTaken,this.onPhotoFail, {
            quality : 50,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true
        });
        
    },
    
    onPhotoTaken:function(imageURI){
        var myImage = $(camera_plugin.config.elementID)
        myImage.attr('src',imageURI);
        camera_plugin.movePhoto(imageURI);


    },
    onPhotoFail: function (message){
        console.log(`Falito perchè:` + message);
    },

    movePhoto: function (file_uri){
        window.resolveLocalFileSystemURL(file_uri,camera_plugin.onResolveSuccess,camera_plugin.onResolveError);
    },

    onResolveSuccess: function(entry){
        var now = new Date ();
        var newName = now.getTime () + `.jpg`;
        var folder = camera_plugin.config.galleryFolder;
        window.requestFileSystem(LocalFileSystem.PERSISTENT,
                                 0,
                                 function(fileSys){
                                    fileSys.root.getDirectory(folder,
                                        {
                                            create: true,exlusive:false
                                        },
                                        function (directory) {
                                            entry.moveTo(directory,
                                                         newName,
                                                         camera_plugin.onSuccess,
                                                         camera_plugin.OnError);
                                        },
                                        camera_plugin.OnResolveError
                                    );
                                },
                                camera_plugin.OnResolveError);
    },
    onMoveSuccess: function(entry){
        console.log(entry);
    },
    onResolveError: function(){
        console.log(error);

    }
}