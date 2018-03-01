
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
      $('#cameraButton').on('click', function(){
        camera_plugin.capturePhoto();
      });
      app.galleryFolder = cordova.file.dataDirectory+ 'files/' +camera_plugin.config.galleryFolder;
      app.refreshGallery();
  },
  refreshGallery: function(){
    window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
      entry.createReader().readEntries(app.loadGallery, app.errorGallery);
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
  errorGallery: function(error){
    console.log(error);
  }
};

app.initialize();