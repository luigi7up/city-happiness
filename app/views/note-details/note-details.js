var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var socialShare = require("nativescript-social-share");
// NAvigation, stacking...
var frameModule = require("ui/frame");
var NoteViewModel = require("../../shared/view-models/note-view-model");
var imageSource = require("image-source");
var page;
var note;

exports.loaded = function(args) {
    console.log("Loading note details view...")
    var page = args.object;
    // {notesList: notesList, tappedItemIndex: tappedItemIndex, tappedItemView: tappedItemView}
    var receivedData  = page.navigationContext;
    notesList       = receivedData.notesList;
    tappedItemIndex = receivedData.tappedItemIndex;
    tappedItemView  = receivedData.tappedItemView;
    currentNote     = notesList.getItem(tappedItemIndex);
    note = new NoteViewModel(currentNote);

    note.images.forEach(function(val, index){
      console.log("INDEX")
      console.log(index)
      console.log("val[url]")
      console.log(val["url"])
      var img = imageSource.fromBase64(val.base64);
      note.images.setItem(index, {"imageSource": img} )
    })


    debugger

    page.bindingContext = note;
};

exports.save = function() {
  console.log("create-note#save")
  completeSaving()
};

function completeSaving() {
    note.save()
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
                    message: "Unfortunately we were unable to save the note.",
                    okButtonText: "OK"
                });
        });
}









// var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model")
//
// var groceryList = new GroceryListViewModel([]);
//
// var pageData = new Observable({
//   groceryList: groceryList,
//   grocery: ""
// })
//
// exports.add = function(){
//   if (pageData.get("grocery").trim() === "") {
//       dialogsModule.alert({
//           message: "Enter a grocery item",
//           okButtonText: "OK"
//       });
//       return;
//   }
//
//   // Dismiss the keyboard
//   page.getViewById("grocery").dismissSoftInput();
//   groceryList.add(pageData.get("grocery"))
//         .catch(function() {
//             dialogsModule.alert({
//                 message: "An error occurred while adding an item to your list.",
//                 okButtonText: "OK"
//             });
//         });
//
//     // Empty the input field
//     pageData.set("grocery", "");
// };
//
// exports.share = function share() {
//   var list = [];
//   var finalList = "";
//   for (var i = 0, size = groceryList.length; i < size ; i++) {
//     list.push(groceryList.getItem(i).name);
//   }
//   var listString = list.join(", ").trim();
//   socialShare.shareText(listString);
// }
//
// exports.openCreateNoteView = function() {
//   console.log("navigating to openCreateNoteView");
//   var topmost = frameModule.topmost();
//   console.log("var topmost = frameModule.topmost();");
//   topmost.navigate("views/create_note/create_note");
//   console.log("topmost...");
// };
//
// exports.loaded = function(args) {
//     console.log("Loaded list.xml")
//     page = args.object;
//     var listView = page.getViewById("groceryList")
//     page.bindingContext = pageData;
//
//     groceryList.empty();
//     pageData.set("isLoading", true);
//
//     groceryList.load().then(function() {
//       pageData.set("isLoading", false);
//       console.log("load callback...")
//
//       listView.animate({
//         opacity: 1,
//         duration: 600
//       })
//     });
// };
