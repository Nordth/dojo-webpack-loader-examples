// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/menus/demo/ComboButton.html
var dom = require("dojo/dom");
var parser = require("dojo/parser");
var registry = require("dijit/registry");
var Menu = require("dijit/Menu");
var MenuItem = require("dijit/MenuItem");
var ComboButton = require("dijit/form/ComboButton");
var DropDownButton = require("dijit/form/DropDownButton");
require("dijit/WidgetSet"); // for registry.byClass

// a menu item selection handler
var onItemSelect = function(evt){
    dom.byId("lastSelected").innerHTML = this.get("label");
};

var menu = new Menu({ id: "mainMenu" });

// create child item widgets for each
// of 'edit','view','task'
menu.addChild(new MenuItem({
    label: "Edit"
}) );

menu.addChild(new MenuItem({
    label: "View"
}) );

menu.addChild(new MenuItem({
    label: "Task"
}) );

// create a ComboButton and DropDownButton and add the Menu to each
var comboBtn = new ComboButton({
    label: "Do Something",
    dropDown: menu
}, "comboBtn");

var dropDownBtn = new DropDownButton({
    label: "Select Action",
    dropDown: menu
}, "dropDownBtn");

menu.startup();
comboBtn.startup();
dropDownBtn.startup();

parser.parse();

registry.byClass("dijit.MenuItem").forEach(function(item){
    item.on("click", onItemSelect);
});