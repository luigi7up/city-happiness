var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
// NAvigation, stacking...
var frameModule = require("ui/frame");
// var socialShare = require("nativescript-social-share");
var cameraModule = require("camera");
var geolocation = require("nativescript-geolocation");
var imageModule = require("ui/image");
// var fs = require("file-system");

var NoteViewModel = require("../../shared/view-models/note-view-model");
var page;


var noteViewModel = new NoteViewModel();
// var cloudinaryModel = new CloudinaryModel();

exports.loaded = function(args) {
    console.log("Loading note view...");
    page = args.object;
    page.bindingContext = noteViewModel;
    console.log("Loaded create note.xml");
    askForGeolocation()
};


function askForGeolocation(){

    if(!geolocation.isEnabled()){
        // inputType property can be dialogs.inputType.password or dialogs.inputType.text.
        dialogsModule.confirm({
          title: "GEOLOCATION",
          message: "Please enable geolocation to create notes",
          okButtonText: "ENABLE",
          cancelButtonText: "NO"
        }).then(function (result) {
          // result argument is boolean
          if(result == true){
            geolocation.enableLocationRequest();
          }else{
            frameModule.topmost().navigate("views/list/list");
          }
        });

    }


    // function enableLocationTap(args) {
    //     if (!geolocation.isEnabled()) {
    //         geolocation.enableLocationRequest();
    //     }
    // }
    // exports.enableLocationTap = enableLocationTap;

}






exports.save = function() {
  console.log("create-note#save");
  completeSaving();
};

function completeSaving() {
    noteViewModel.save()
        .then(function() {
            dialogsModule
                .alert("Note saved successfully.")
                .then(function() {
                    frameModule.topmost().navigate("views/list/list");
                });
        }).catch(function(error) {
            console.log(error);
            dialogsModule
                .alert({
                    message: "Unfortunately we were unable to save the noteViewModel",
                    okButtonText: "OK"
                });
        });
}

exports.takePhoto = function(){
  cameraModule.takePicture({width: 300, height: 300, keepAspectRatio: true}).then(function(imageSource) {
    var image = new imageModule.Image();
    image.imageSource = imageSource;
    noteViewModel.mainImage = imageSource;
    noteViewModel.images.push( {"imageSource": imageSource} );
  });
}
