// Example from: http://dgrid.io/tutorials/1.0/single_query/
var declare = require('dojo/_base/declare');
var dom = require('dojo/dom');
var on = require('dojo/on');
var RequestMemory = require('dstore/RequestMemory');
var Grid = require('dgrid/Grid');
var SingleQuery = require('./for-dgrid-demos/SingleQuery');

// Once the response is received, build an in-memory store with the data
var store = new RequestMemory({ target: 'example-resources/hof-batting.json' });

// Create an instance of OnDemandGrid referencing the store
var grid = window.grid = new (declare([ Grid, SingleQuery ]))({
    className: 'dgrid-autoheight',
    collection: store,
    sort: 'last', // Initialize sort on last name, ascending
    columns: {
        first: 'First Name',
        last: 'Last Name',
        totalG: 'Games Played'
    }
}, 'grid');

on(dom.byId('queryForm'), 'submit', function(event) {
    event.preventDefault();
    grid.set('collection', store.filter({
        // Pass a RegExp to Memory's filter method
        // Note: this code does not go out of its way to escape
        // characters that have special meaning in RegExps
        last: new RegExp(this.elements.last.value, 'i')
    }));
});

on(dom.byId('queryForm'), 'reset', function() {
    // Reset the collection when the form is reset
    grid.set('collection', store);
});