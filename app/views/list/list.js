var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var socialShare = require("nativescript-social-share");
// NAvigation, stacking...
var frameModule = require("ui/frame");

var page;

var NotesListViewModel = require("../../shared/view-models/notes-list-view-model")

var notesList = new NotesListViewModel([]);

var pageData = new Observable({
  notesList: notesList,
  note: ""
})

exports.loaded = function(args) {
  console.log("Loaded list.xml")
  page = args.object;
  var listView = page.getViewById("notesList")
  page.bindingContext = pageData;

  notesList.empty();
  pageData.set("isLoading", true);

  notesList.load().then(function() {
    pageData.set("isLoading", false);
    console.log("load callback...")
    listView.animate({
      opacity: 1,
      duration: 600
    })
  });
};

exports.listViewItemTap = function(args){
  console.log("TAPPED");
  // console.dir(args);
  // args: listViewModule.ItemEventData
  var tappedItemIndex = args.index;
  var tappedItemView = args.view;

  console.log("tappedItemIndex")
  console.log(tappedItemIndex)
  console.log("tappedItemView")
  console.log(tappedItemView)

  // console.dir(tappedItemView)

  console.log("navigating to note details view");
  var topmost = frameModule.topmost();
  var navigationOptions = {
    moduleName: "views/note-details/note-details",
    context: {notesList: notesList, tappedItemIndex: tappedItemIndex, tappedItemView: tappedItemView}
  }

  console.log("frameModule.topmost().navigate(navigationOptions);");
  frameModule.topmost().navigate(navigationOptions);

}

exports.openCreateNoteView = function() {
  console.log("navigating to openCreateNoteView");
  var topmost = frameModule.topmost();
  console.log("var topmost = frameModule.topmost();");
  topmost.navigate("views/create-note2/create-note");

  console.log("topmost...");
};
