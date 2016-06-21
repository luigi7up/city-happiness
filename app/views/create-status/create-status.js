"use strict"

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

var StatusViewModel = require("../../shared/view-models/status-view-model");
var page;
var slider;
var gestures = require("ui/gestures");
var absoluteLayout = require("ui/layouts/absolute-layout");

var statusViewModel = new StatusViewModel();

exports.loaded = function(args) {
    console.log("Loaded...");
    page = args.object;
    page.bindingContext = statusViewModel;
    slider = new Slider(page, statusViewModel);
};

exports.submitStatus = function() {
  statusViewModel.save();
}


function Slider(page, model){
  var slider = {}
  slider.getValue = function(){
    return nobPosition;
  }
  var pageContainer   = viewModule.getViewById(page, "page-layout");
  var sliderBackground = viewModule.getViewById(page, "sliderbackground");
  var sliderNob       = viewModule.getViewById(page, "slidernob");
  slider.getScaledValue = function(position, height){
    var percentage = position/height*100;
    if(percentage == 100){
      percentage = 99
    }else if(percentage == 0){
      percentage = 1
    }
    var percentageReverse = 100 - percentage
    var value = Math.ceil(percentageReverse/10)
    console.log("finalValue: " + value);
    return value
  }
  var semanticStatus = [
    "I feel like shit!",
    "Shitty...",
    "Down, but I'll survive",
    "Down, but things might change",
    "I've been better",
    "I am fine",
    "I am more than fine",
    "I am great",
    "I never felt better",
    "You wouldn't believe me anyway"]

  var nobPosition = 100;

  // var middle = sliderBackground.getActualSize().width / 2;
  // absoluteLayout.AbsoluteLayout.setLeft(sliderNob, middle);

  absoluteLayout.AbsoluteLayout.setTop(sliderNob, nobPosition);

  var observer = sliderNob.observe(gestures.GestureTypes.pan, function (panGestureEventData) {
    // var deltaX = panGestureEventData.deltaX;
    // var deltaY = panGestureEventData.deltaY + nobPosition;

    slider.maxHeight = sliderBackground.getActualSize().height - this.getActualSize().height-1

    console.log("slider.maxHeight: " + slider.maxHeight)

    var deltaY  = panGestureEventData.deltaY;
    var state   = panGestureEventData.state

    // states: 1 - begin, 2 - on, 3 - done
    switch(state){
      case 1:
        console.log("begin: " + nobPosition)
        absoluteLayout.AbsoluteLayout.setTop(this, nobPosition);
        break;
      case 2:
        console.log("dragging: " +newPosition)
        var newPosition = deltaY + nobPosition
        if(newPosition <=0 ){
          newPosition = 0;
        }else if(newPosition >= slider.maxHeight){
          // absoluteLayout.AbsoluteLayout.setTop(this, slider.maxHeight );
          newPosition = slider.maxHeight;
        }
        model.status          = slider.getScaledValue(newPosition, slider.maxHeight);
        model.semanticStatus  = semanticStatus[ slider.getScaledValue(newPosition, slider.maxHeight)-1 ];
        absoluteLayout.AbsoluteLayout.setTop(this, newPosition );
      break;
      case 3:
        console.log("done: "+nobPosition)
        nobPosition = parseInt(deltaY + nobPosition)
        if(nobPosition <=0 ){
          nobPosition = 0;
        }else if(nobPosition >= slider.maxHeight){
          // absoluteLayout.AbsoluteLayout.setTop(this, slider.maxHeight );
          nobPosition = slider.maxHeight;

        }
        break;
      default:
        console.log("Unknown");
        break;
    }
  }, sliderNob);





  return slider;
}
