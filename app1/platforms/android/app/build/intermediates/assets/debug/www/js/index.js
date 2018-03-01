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
    countriesAPI: "https://restcountries.eu/rest/v2/region/",
    region: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
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
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $("#buttonTakePhoto").on("click", function() {
            cameraPlugin.capturePhoto();
        });
        app.setLinks();
        $(".link").on("click", function() {
            $.ajax({
                url: app.countriesAPI+this.id,            
            }).success(app.loadContries).error(app.errorContries);            
        });
        app.galleryFolder = cordova.file.dataDirectory+"files/"+cameraPlugin.config.galleryFolder;
        app.refreshGallery();
    },

    refreshGallery: function() {
        window.resolveLocalFileSystemURL(
            app.galleryFolder, 
            function(entry) {
                entry.createReader().readEntries(app.loadGallery, app.errorGallery);
            }, 
            app.errorGallery
        );
    },
    loadGallery: function(files) {        
        var images="";
        for(var i=0;i<files.length;i++) {
            images+="\n<img class=\"imageGallery\" src=\""+files[i].nativeURL+"\"/>";
        }
        $("#gallery").html(images);
        console.log("loadGallery");
    },
    errorGallery: function(error) {
        console.log("error gallery");
        console.log(error);
    },
    // rest contries
    loadContries: function(resp) {
        console.log(resp);
        var list=$("#countriesList");
        list.html("");
        for(var i=0;i<resp.length;i++) {
            var container = $("<div></div>");
            var data=resp[i];
            container.append($("<img src=\""+data.flag+"\"/>"));
            container.append($("<span>"+data.name+"</span>"));
            list.append(container);
        }
    },
    errorContries: function(error) {
        console.log(error);
    },
    setLinks: function() {
        var s="";
        for(var i=0;i<app.region.length;i++) {
            s+="\n<button type=\"button\" class=\"link\" id=\""+app.region[i]+"\">"+app.region[i]+"</button>";
        }
        $("#linkCountries").html(s);
        //console.log("loadGallery");
    }    
};

app.initialize();