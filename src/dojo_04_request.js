// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/ajax/demo/dojo-request-script-pulls.html
var dom = require("dojo/dom");
var on = require("dojo/on");
var script = require("dojo/request/script");
var domConstruct = require("dojo/dom-construct");
var arrayUtil = require("dojo/_base/array");

var pullsNode = dom.byId("pullrequests");

// Attach the onclick event handler to tweetButton
on(dom.byId("pullrequestsButton"), "click", function(evt){
    // Request the open pull requests from Dojo's GitHub repo
    script.get("https://api.github.com/repos/dojo/dojo/pulls", {
        // Use the "callback" query parameter to tell
        // GitHub's services the name of the function
        // to wrap the data in
        jsonp: "callback"
    }).then(function(response){
        // Empty the tweets node
        domConstruct.empty(pullsNode);

        // Create a document fragment to keep from
        // doing live DOM manipulation
        var fragment = document.createDocumentFragment();

        // Loop through each pull request and create a list item
        // for it
        arrayUtil.forEach(response.data, function(pull){
            var li = domConstruct.create("li", {}, fragment);
            var link = domConstruct.create("a", {href: pull.url, innerHTML: pull.title}, li);
        });

        // Append the document fragment to the list
        domConstruct.place(fragment, pullsNode);
    });
});