var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
// var ObservableArray = require("data/observable-array").ObservableArray;
// var emailValidator = require("email-validator");
function StatusViewModel(_data) {
  "use strict";
  var data = _data || {};
  // You can add properties to observables on creation
  var viewModel = new Observable({
      status: data.status,
      lat: "40.416775" || data.lat,
      lng: "-3.703790" || data.lng,
      semanticStatus: ""
  });

  viewModel.save = function() {
    return fetchModule.fetch(config.apiUrl+"happinesses", {
      method: "POST",
      body: JSON.stringify({
        device_id: "x123x123",
        feeling_like: viewModel.get("status"),
        lat: viewModel.get("lat"),
        lng: viewModel.get("lng")
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token token="+config.token
      }
    })
    .then(handleErrors)
    .then(function(response) {
        console.log("response to json...");
        return response.json();
    })
    .then(function(data) {
        // config.token = data.Result.access_token;
        console.log("saving the token...");
        console.dir(data);
    });

  };

  function handleErrors(response) {
    console.log("handleErrors...");
    console.dir(response)
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
  }
  return viewModel;
}


module.exports = StatusViewModel;
