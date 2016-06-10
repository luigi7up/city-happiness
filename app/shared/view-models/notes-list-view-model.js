var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function NotesListViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.load = function() {
      console.log("loading:..."+ config.apiUrl + "notes")
      return fetch(config.apiUrl + "notes", {
        headers: {
          "Authorization": "Token token="+config.token
        }
      })
      .then(handleErrors)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log("loaded()...")
        console.dir(data)
        try{
          console.log("try")
          data.notes.forEach(function(note) {
            viewModel.push({
              id: note.id,
              title: note.title,
              description: note.description,
              images: note.images
            });
          });

        }catch(e){
          console.log("catch")
          console.log(e)
        }
      });
    };

  //   viewModel.add = function(note) {
  //     return fetch(config.apiUrl + "notes", {
  //         method: "POST",
  //         body: JSON.stringify({
  //             Name: grocery
  //         }),
  //         headers: {
  //             "Authorization": "Bearer " + config.token,
  //             "Content-Type": "application/json"
  //         }
  //     })
  //     .then(handleErrors)
  //     .then(function(response) {
  //         return response.json();
  //     })
  //     .then(function(data) {
  //         viewModel.push({ name: grocery, id: data.Result.Id });
  //     });
  // };


    viewModel.empty = function() {
      while (viewModel.length) {
        viewModel.pop();
      }
    };
    return viewModel;
}


function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = NotesListViewModel;
