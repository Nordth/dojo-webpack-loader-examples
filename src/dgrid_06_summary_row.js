// Example from: http://dgrid.io/tutorials/1.0/summary_row/
var declare = require('dojo/_base/declare');
var lang = require('dojo/_base/lang');
var dom = require('dojo/dom');
var on = require('dojo/on');
var Memory = require('dstore/Memory');
var OnDemandGrid = require('dgrid/OnDemandGrid');
var ColumnSet = require('dgrid/ColumnSet');
var SummaryRow = require('./for-dgrid-demos/SummaryRow');

var store = new Memory({ data: [
    { id: 1, name: 'Create child widget 1', user1: 0.5, user2: 0, user3: 0, user4: 7 },
    { id: 2, name: 'Create child widget 2', user1: 0.5, user2: 0, user3: 7, user4: 0 },
    { id: 3, name: 'Create parent widget', user1: 3, user2: 0, user3: 0.5, user4: 0.5 },
    { id: 4, name: 'Write documentation', user1: 1, user2: 7, user3: 0, user4: 0 },
    { id: 5, name: 'Push updated build', user1: 0.5, user2: 0, user3: 1, user4: 0 }
]});

store.getTotals = function () {
    var totals = {};
    totals.user1 = totals.user2 = totals.user3 = totals.user4 = 0;

    for (var i = this.data.length; i--;) {
        for (var k in totals) {
            totals[k] += this.data[i][k];
        }
    }

    totals.name = 'Total';
    return totals;
}

// Create an instance of OnDemandGrid referencing the store
var commonArgs = {
    className: 'dgrid-autoheight',
    collection: store,
    sort: 'name'
};
var grid = new (declare([ OnDemandGrid, SummaryRow ]))(lang.mixin({
    columns: {
        name: 'Name',
        user1: 'John',
        user2: 'Jane',
        user3: 'Joe',
        user4: 'Kate'
    }
}, commonArgs), 'grid');
var gridColumnSet = new (declare([ OnDemandGrid, ColumnSet, SummaryRow ]))(lang.mixin({
    columnSets: [
        [[
            { field: 'name', label: 'Name' }
        ]],
        [[
            { field: 'user1', label: 'John' },
            { field: 'user2', label: 'Jane' },
            { field: 'user3', label: 'Joe' },
            { field: 'user4', label: 'Kate' }
        ]]
    ]
}, commonArgs), 'gridColumnSet');

var totals = store.getTotals();
grid.set('summary', totals);
gridColumnSet.set('summary', totals);