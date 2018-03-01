var app = {
    galleryFolder: null,
    countriesAPI: 'https://restcountries.eu/rest/v2/region/',
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $('#cameraButton').on('click', function(){
          camera_plugin.capturePhoto();
        });
        app.galleryFolder = cordova.file.dataDirectory+ 'files/' +
                            camera_plugin.config.galleryFolder;
        app.refreshGallery();
        app.getCountries('europe');
    },
    refreshGallery: function(){
      window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
        entry.createReader().readEntries(app.loadGallery, app.onError);
      });
    },
    loadGallery: function(entries){
      var gallery = $("#myGallery");
      gallery.html('');
      for(var i=0; i<entries.length; i++){
        var img = '<div><img src="'+entries[i].nativeURL+'" /></div>';
        gallery.append(img);
      }
    },
    getCountries: function(region){
      $.ajax({
        url: app.countriesAPI+region
      }).success(app.loadCountries).error(app.onError);
    },
    loadCountries: function(resp){
      var countriesList = $("#countriesList");
      for(var i=0; i<resp.length; i++){
        var countryData = resp[i];
        console.log(countryData);
        var countryContainer = $("<div></div>");
        countryContainer.append($('<img src="'+countryData.flag+'" />'));
        countryContainer.append($('<span>'+countryData.name+'</span>'));
        countriesList.append(countryContainer);
      }
    },
    onError: function(error){
      console.log(error);
    }
};

app.initialize();
