
var app = {
    galleryFolder: null,
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        camera_plugin.capturePhoto();
        $(`#cameraButton`).on(`click`,function(){
            camera_plugin.capturePhoto();
         })
        app.galleryFolder = cordova.file.dataDirectory + 'fields/' + camera_plugin.config.galleryFolder;
        app.refreshGallery();
        $.ajax({
            url: app.countriesAPI,
            
        }).success(function(loadCountries);
        
    },
    refreshGallery: function(){
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.creatReader().readEntries(app.loadGallery,app.errorGallery);
        });
    },
    loadGallery: function (entries){
        var galler = $("#myGallery");
        Gallery.html('');
        for(var i=0; i<entries.length;i++){
            var img = '<div><img src ="'+entries[i].nativeURI+'"/></div>';
            gallery.append(img);
        }
        
    },
    loadContries: function(resp){

       console.log(resp);
       for (var i=0;i<resp.length;i++){
           var countryContainer = $("<div></div>");

           countryContainer.append ($('<img src="'+countryData.flag+'"/>'));
           countryContainer.append ($('<span>'+countryData.name+'</span>'));
       }
    },
    errorGallery:function(error){
        console.log(error)
;
    }
};

app.initialize();