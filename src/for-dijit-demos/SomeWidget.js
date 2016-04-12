var declare = require("dojo/_base/declare");
var _WidgetBase = require("dijit/_WidgetBase");
var _OnDijitClickMixin = require("dijit/_OnDijitClickMixin");
var _TemplatedMixin = require("dijit/_TemplatedMixin");
var template = require("raw!./SomeWidget.html");

var dojoRequire = require("dojo-webpack-loader/lib/dojo-require"); // We should register widget to able using it in templates
module.exports = dojoRequire.register("demo/SomeWidget",
    declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin], {
        //	set our template
        templateString: template,

        //	some properties
        baseClass: "someWidget",
        title: "",	//	we'll set this from the widget def

        //	hidden counter
        _counter: 1,
        _firstClicked: false,

        //	define an onClick handler
        _onClick: function(){
            if(this._firstClicked){
                this.titleNode.innerHTML = this.title + " was clicked " + (++this._counter) + " times.";
            } else {
                this.titleNode.innerHTML = this.title + " was clicked!";
                this._firstClicked = true;
            }
        },

        postCreate: function(){
            this.titleNode.innerHTML = this.title;
        }
    }));

