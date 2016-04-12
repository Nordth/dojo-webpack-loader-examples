// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/animation/index.html
var baseFx = require("dojo/_base/fx");
var fx = require("dojo/fx");
var easing = require("dojo/fx/easing");
var domStyle = require("dojo/dom-style");
var dom = require("dojo/dom");
var aspect = require("dojo/aspect");
var on = require("dojo/on");

// define a function to return the animation which
// swaps the positions of 2 nodes
function swapAnim(node1, node2) {
    var posn1 = parseInt(domStyle.get(node1, "left")),
        posn2 = parseInt(domStyle.get(node2, "left"));

    return moveNodes = fx.combine([
        fx.slideTo({
            duration: 1200,
            node: node2,
            left: posn1
        }),
        fx.slideTo({
            duration: 1200,
            node: node1,
            left: posn2
        })
    ]);
}


var originalOrder = true; // track which order our content nodes are in

var swapButton = dom.byId("swapButton"),
    c1 = originalOrder ? dom.byId("content1") : dom.byId("content2"),
    c2 = originalOrder ? dom.byId("content2") : dom.byId("content1"),
    container = dom.byId("container");

// Set up a click handlers to run our animations
on(swapButton, "click", function(evt){

    // chain the swap nodes animation
    // with another to fade out a background color in our container
    var anim = fx.chain([
        swapAnim(c1, c2),
        baseFx.animateProperty({
            node: container,
            properties: {
                backgroundColor: "#fff"
            }
        })
    ]);
    // before the animation begins, set initial container background
    aspect.before(anim, "beforeBegin", function(){
        domStyle.set(container, "backgroundColor", "#eee");
    });

    // when the animation ends, toggle the originalOrder
    on(anim, "End", function(n1, n2){
        originalOrder = !originalOrder;
    });

    anim.play();
});