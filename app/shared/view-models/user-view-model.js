var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var emailValidator = require("email-validator");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        email: info.email || "luigi7up@gmail.com",
        password: info.password || "123123123"
    });

    viewModel.login = function() {
      return fetchModule.fetch(config.apiUrl + "oauth/token", {
          method: "POST",
          body: JSON.stringify({
              username: viewModel.get("email"),
              password: viewModel.get("password"),
              grant_type: "password"
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(handleErrors)
      .then(function(response) {
          console.log("response to json...");
          return response.json();
      })
      .then(function(data) {
          config.token = data.Result.access_token;
          console.log("saving the token...");
          console.dir(data)
      });
    };

    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "Users", {
            method: "POST",
            body: JSON.stringify({
                Username: viewModel.get("email"),
                Email: viewModel.get("email"),
                Password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    };

    viewModel.isValidEmail = function(){
      var email = this.get("email");
      return emailValidator.validate(email);
    }

    return viewModel;
}

function handleErrors(response) {
    console.log("handleErrors...");
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;
