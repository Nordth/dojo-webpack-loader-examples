// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/key_events/index.html
var declare = require("dojo/_base/declare");
var arrayUtil = require("dojo/_base/array");
var parser = require("dojo/parser");
var query = require("dojo/query");
var _WidgetBase = require("dijit/_WidgetBase");
var _KeyNavMixin = require("dijit/_KeyNavMixin");

global.MyGrid = declare([_WidgetBase, _KeyNavMixin], {
    buildRendering: function(){
        // This is a behavioral widget so we'll just use the existing DOM.
        // Alternately we could have a template.
        this.inherited(arguments);

        // Set containerNode.   Usually this is set in the template.
        this.containerNode = this.domNode;
    },

    postCreate: function(){
        // Don't forget the this.inherited() call
        this.inherited(arguments);

        // Set tabIndex on the container <table> node, since by default it's not tab navigable
        this.domNode.setAttribute("tabIndex", "0");
    },

    // Specifies which DOMNode children can be focused
    childSelector: "td",

    _focusedChildIndex: function(children){
        // summary:
        //      Helper method to return the index of the currently focused child in the array
        return arrayUtil.indexOf(children, this.focusedChild);
    },

    // Home/End key support
    _getFirst: function(){
        return this.getChildren()[0];
    },
    _getLast: function(){
        var children = this.getChildren();
        return children[children.length - 1];
    },

    // Simple arrow key support.   Up/down logic assumes that evey row has the same number of cells.
    _onLeftArrow: function(){
        var children = this.getChildren();
        this.focusChild(children[(this._focusedChildIndex(children) - 1 + children.length) % children.length]);
    },
    _onRightArrow: function(){
        var children = this.getChildren();
        this.focusChild(children[(this._focusedChildIndex(children) + 1) % children.length]);
    },
    _numCols: function(){
        // summary:
        //      Helper method to return the number of columns in the table
        return query("tr:first-child > td", this.domNode).length;
    },
    _onDownArrow: function(){
        var children = this.getChildren();
        this.focusChild(children[(this._focusedChildIndex(children) + this._numCols()) % children.length]);
    },
    _onUpArrow: function(){
        var children = this.getChildren();
        this.focusChild(children[(this._focusedChildIndex(children) - this._numCols() + children.length) % children.length]);
    },

    // Letter key navigation support
    _getNext: function(child){
        var children = this.getChildren();
        return children[(arrayUtil.indexOf(children, child) + 1) % children.length];
    }
});

global.MyCell = declare(_WidgetBase, {
    postCreate: function(){
        this.domNode.setAttribute("tabIndex", "-1");
    },
    focus: function(){
        this.domNode.focus();
    }
});

parser.parse();