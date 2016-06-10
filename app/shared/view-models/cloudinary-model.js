// var config = require("../../shared/config");
var fetchModule = require("fetch");
// var ObservableArray = require("data/observable-array").ObservableArray;

function CloudinaryModel(items) {
  cloudinary = {}


  cloudinary.upload = function(base64image){

    console.log("UPLOADING...")

    // cloud_name: 'dpm6ilubu',
    //   api_key: '231623857949555',
    //   api_secret: 'mkD0gYiiPGe26ApdrJSN9696h28'
    // upload_preset: ''

    var upload_preset = 'hcnt2zqg';
    var url = "https://api.cloudinary.com/v1_1/dpm6ilubu/image/upload";

    return fetchModule.fetch(url, {
        method: "POST",
        body: JSON.stringify({
          "file": "data:image/png;base64,"+base64image,
          "upload_preset": upload_preset
        }),
        headers: {
          "Content-Type": "application/json"
        }
    }).then(handleErrors)
      .then(function(response) {
          console.log("response to json()...");
          return response.json();
      })
      .then(function(data) {
          console.log("data")
          console.log("BBBBBB");
          console.dir(data)
      });

    function handleErrors(response) {
      console.log("handleErrors...");
      console.log("STATUS:");
      console.dir(response.status);
      if (response.status !== 200) {
        console.log("ERRROROROOROROROROROROR...");
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
        return;
      }
      return response;
    }
  }//upload

  return cloudinary;

}

module.exports = CloudinaryModel;
