// Example from: http://dgrid.io/tutorials/1.0/defining_grid_structures/
var declare = require('dojo/_base/declare');
var RequestMemory = require('dstore/RequestMemory');
var OnDemandGrid = require('dgrid/OnDemandGrid');
var CompoundColumns = require('dgrid/extensions/CompoundColumns');

var CustomGrid = declare([ OnDemandGrid, CompoundColumns ]);
var grid = new CustomGrid({
    collection: new RequestMemory({ target: 'example-resources/hof-batting.json' }),
    columns: [
        {
            label: 'Full Name',
            children: [
                { field: 'first', label: 'First' },
                { field: 'last', label: 'Last' }
            ]
        },
        { field: 'totalGAB', label: 'Games as Batter' }
    ]
}, 'grid');

grid.startup();