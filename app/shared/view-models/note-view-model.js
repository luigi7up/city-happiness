var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var emailValidator = require("email-validator");


function NoteViewModel(data) {
    data = data || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        id: data.id || null,
        title: data.title || "title default",
        description: data.description || "description default",
        images: new ObservableArray( data.images )
    });

    viewModel.save = function() {
        // Convert notesImages imageSources into an array of base64 images
        var imagesInBase64 = [];
        var imageSources = viewModel.get("images");

        console.log("ADDING TO ARRAY");
        console.log(imageSources.length);
        console.dir(imageSources);

        imageSources.forEach(function(val, index){
        console.log("BBBB");
          console.dir(val);
          console.log("CCCCC");
          imagesInBase64.push({"base64": val['imageSource'].toBase64String()})

        });


        return fetchModule.fetch(config.apiUrl + "notes", {
            method: "POST",
            body: JSON.stringify({
              note: {
                title: viewModel.get("title"),
                description: viewModel.get("description"),
                images_attributes: imagesInBase64
              }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token token="+config.token
            }
        }).then(handleErrors);
    };


    return viewModel;
}



function handleErrors(response) {
    console.log("handleErrors...");
    console.dir(response)
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = NoteViewModel;
