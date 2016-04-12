// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/key_events/index.html
var dom = require("dojo/dom");
var domConstruct = require("dojo/dom-construct");
var on = require("dojo/on");
var query = require("dojo/query");
var keys = require("dojo/keys");
require("dojo/NodeList-traverse");

var inputs = query("input");

function log(msg){
    var c = dom.byId("console");
    if(!c){
        c = domConstruct.create("div", {
            id: "console"
        }, document.body);
    }
    c.innerHTML += "<div>" + msg + "</div>";
}

on(dom.byId("traverseForm"), "keydown", function(event) {
    var node = query.NodeList([event.target]);
    var nextNode;

    //on listens for the keydown events inside of the div node, on all form elements
    switch(event.keyCode) {
        case keys.UP_ARROW:
            nextNode = node.prev("input");
            if(nextNode[0]){
                //if not first element
                nextNode[0].focus();
                //moving the focus from the current element to the previous
            }
            break;
        case keys.DOWN_ARROW:
            nextNode = node.next("input");
            if(nextNode[0]){
                //if not last element
                nextNode[0].focus();
                //moving the focus from the current element to the next
            }
            break;
        case keys.HOME:
            inputs[0].focus();
            break;
        case keys.END:
            inputs[inputs.length - 2].focus();
            break;
        case keys.ENTER:
            event.preventDefault();
            //prevent default keeps the form from submitting when the enter button is pressed
            //on the submit button
            if(event.target.type !== "submit"){
                nextNode = node.next("input");
                if(nextNode[0]){
                    //if not last element
                    nextNode[0].focus();
                    //moving the focus from the current element to the next
                }
            }else {
                // submit the form
                log("form submitted!");
            }
            break;
        default:
            log("some other key: " + event.keyCode);
    }
});