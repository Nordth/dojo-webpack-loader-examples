// Example from: http://dgrid.io/tutorials/1.0/grids_and_stores/
var dom = require('dojo/dom');
var on = require('dojo/on');
var RequestMemory = require('dstore/RequestMemory');
var OnDemandGrid = require('dgrid/OnDemandGrid');

// Once the response is received, build an in-memory store with the data
var store = new RequestMemory({ target: 'example-resources/hof-batting.json' });

// Create an instance of OnDemandGrid referencing the store
var grid = window.grid = new OnDemandGrid({
    collection: store,
    sort: 'last', // Initialize sort on last name, ascending
    columns: {
        first: 'First Name',
        last: 'Last Name',
        totalG: 'Games Played'
    }
}, 'grid');

grid.startup();

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
    // Reset the query when the form is reset
    grid.set('collection', store);
});

on(dom.byId('sortLastAsc'), 'click', function() {
    // Simple case: pass a string representing field to be
    // sorted in ascending order
    grid.set('sort', 'last');
});

on(dom.byId('sortGamesDesc'), 'click', function() {
    // Advanced case: pass array of objects, following
    // the same format as sort in dstore
    grid.set('sort', [ { property: 'totalG', descending: true } ]);
});