
var app = {
    galleryFolder: null,
    countriesAPI: 'https://restcountries.eu/rest/v2/all',

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $("#cameraButton").on('click', function() {
            camera_manager.capturePhoto();
        });
        this.galleryFolder = cordova.file.dataDirectory + 'files/' + camera_manager.config.galleryFolder;
        app.refreshGallery();

        $.ajax({
            url: app.countriesAPI
        }).success(app.loadcountries).error(onError);
    },

    loadcountries: function(resp){
        console.log(resp);
        var countriesList = $("#countries");
        for(var i = 0; i<resp.length; i++){
            var countryData = resp[i];
            var countryContainer = $("<div></div>");
            countryContainer.append($('<img src="' + countryData.flag + '"/>'));
            countryContainer.append($('<span>' + countryData.name + '</span>'));               
        };
        countriesList.append(countryContainer);
    },

    refreshGallery: function() {
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.createReader().readEntries(app.loadGallery,app.errorGallery);
        });
    },
    
    loadGallery: function(selection){
        var gallery = $("#myGallery");
        gallery.html("");
        for (var i = 0; i < selection.length; i++) {
            var img ='<div class="container"><img src="' + selection[i].nativeURL + '"/></div>';
            gallery.append(img);
        }
    },
};

app.initialize();