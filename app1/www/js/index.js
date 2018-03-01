/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    galleryFolder: null,

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        app.galleryFolder = cordova.file.dataDirectory + '/files/' + camera_plugin.config.folderName;
        app.refreshGallery();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        

        $('#cameraButton').on('click', function(){
            console.log("I'm in the click");
            camera_plugin.capturePhoto();
            console.log(app.galleryFolder);
            
        })
    },

    refreshGallery: function(){
        console.log("I'm in the refreshGallery");
        window.resolveLocalFileSystemURL(app.galleryFolder, function(entry){
            entry.createReader().readEntries(app.loadGallery, app.errorGallery);
        })
    },

    loadGallery: function(entries){
        console.log("I'm in the loadGallery");
        for(var i = 0; i < entries.length; i++){
    
            $("#myGallery").append('<img class="gallery" src="' + entries[i].nativeURL + '">');
        }
    },

    errorGallery: function(){
        console.log("Error while readEntries");
    }
};

app.initialize();