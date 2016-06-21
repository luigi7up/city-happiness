var view = require("ui/core/view");
var count = 0;

function buttonTap(args) {
    count++;
    var parent = args.object.parent;
    if (parent) {
        var lbl = view.getViewById(parent, "Label1");
        if (lbl) {
            lbl.text = "You tapped " + count + " times!";
        }
    }
}
exports.buttonTap = buttonTap;