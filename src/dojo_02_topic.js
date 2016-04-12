// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/events/index.html
var on = require("dojo/on");
var topic = require("dojo/topic");
var dom = require("dojo/dom");
var domConstruct = require("dojo/dom-construct");

var alertButton = dom.byId("alertButton"),
    createAlert = dom.byId("createAlert");

on(alertButton, "click", function() {
    // When this button is clicked,
    // publish to the "alertUser" topic
    topic.publish("alertUser", "I am alerting you.");
});

on(createAlert, "click", function(evt){
    // Create another button
    var anotherButton = domConstruct.create("button", {
        innerHTML: "Another alert button"
    }, createAlert, "after");

    // When the other button is clicked,
    // publish to the "alertUser" topic
    on(anotherButton, "click", function(evt){
        topic.publish("alertUser", "I am also alerting you.");
    });
});

// Register the alerting routine with the "alertUser"
// topic.
topic.subscribe("alertUser", function(text){
    alert(text);
});