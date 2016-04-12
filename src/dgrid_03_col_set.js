// Example from: http://dgrid.io/tutorials/1.0/defining_grid_structures/
var declare = require('dojo/_base/declare');
var RequestMemory = require('dstore/RequestMemory');
var OnDemandGrid = require('dgrid/OnDemandGrid');
var ColumnSet = require('dgrid/ColumnSet');

var CustomGrid = declare([ OnDemandGrid, ColumnSet ]);
var grid = new CustomGrid({
    collection: new RequestMemory({ target: 'example-resources/hof-batting.json' }),
    columnSets: [
        [
            [
                { field: 'first', label: 'First'},
                { field: 'last', label: 'Last' }
            ],
            [
                { field: 'bats', label: 'Bats' },
                { field: 'throws', label: 'Throws' }
            ]
        ],
        [
            [
                { field: 'totalG', label: 'G' },
                { field: 'totalAB', label: 'AB' },
                { field: 'totalR', label: 'R' },
                { field: 'totalRBI', label: 'RBI' },
                { field: 'totalBB', label: 'BB' },
                { field: 'totalK', label: 'K' }
            ],
            [
                { field: 'totalGAB', label: 'Games as Batter', colSpan: 2 },
                { field: 'totalH', label: 'H' },
                { field: 'total2B', label: '2B' },
                { field: 'total3B', label: '3B' },
                { field: 'totalHR', label: 'HR' }
            ]
        ]
    ]
}, 'grid');

grid.startup();