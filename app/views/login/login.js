// NAvigation, stacking...
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
//  view module, which is the base class for all UI components. The module
// provides a lot of functionality, including the ability to control properties
// of a view and its children
var viewModule = require("ui/core/view");

var dialogsModule = require("ui/dialogs");

var user = new UserViewModel();

exports.loaded = function(args){
  var page = args.object;
  // email = viewModule.getViewById(page, "email")
  page.bindingContext = user;
  console.log("Loaded login view!");
}

exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            console.log("navigating to list");
            debugger
            var topmost = frameModule.topmost();
            topmost.navigate("views/list/list");


        });
};

exports.register = function(){
  // topmost is the frame usser is actually on
  var topmost = frameModule.topmost();
  topmost.navigate("views/register/register");
}
