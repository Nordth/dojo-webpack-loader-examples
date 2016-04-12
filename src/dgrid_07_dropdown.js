// Example from: http://dgrid.io/tutorials/1.0/drop_down/
var Select = require("./for-dgrid-demos/Select");
var dom = require("dojo/dom");
var Memory = require("dstore/Memory");

var select = new Select({
    collection: new Memory({
        idProperty: 'id',
        data: [
            { id: 0, name: 'One', value: 1 },
            { id: 1, name: 'Two', value: 2 },
            { id: 2, name: 'Three', value: 3 },
            { id: 3, name: 'Four', value: 4 }
        ]
    })
}, 'select');
select.startup();