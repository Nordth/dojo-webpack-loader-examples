// From: http://dgrid.io/tutorials/1.0/drop_down/demo//my/Select.js
var declare = require('dojo/_base/declare');
var on = require('dojo/on');
var dom = require('dojo/dom');
var domConstruct = require('dojo/dom-construct');
var domClass = require('dojo/dom-class');
var _WidgetBase = require('dijit/_WidgetBase');
var _TemplatedMixin = require('dijit/_TemplatedMixin');
var List = require('dgrid/OnDemandList');
var Selection = require('dgrid/Selection');
var template = require('raw!./Select.html');

var DropDown = declare([ List, Selection ]);

module.exports = declare([ _WidgetBase, _TemplatedMixin ], {
    baseClass: 'mySelect',

    name: '',
    value: null,

    templateString: template,

    buildRendering: function () {
        this.inherited(arguments);

        this.list = new DropDown({
            selectionMode: 'single',
            showHeader: false,
            collection: this.collection,
            renderRow: this.renderItem
        }, this.listNode);

        var self = this;
        this.on('.button:click', function () {
            self.toggle();
        });

        this.list.on('dgrid-select', function (event) {
            self.set('value', event.rows[0].id);
            self.toggle(false);
        });

        this.own(this.list);
    },

    startup: function () {
        var self = this,
            collection = this.collection;
        if (this._started) {
            return;
        }

        this.inherited(arguments);

        if (!this.value && collection) {
            collection.fetch().then(function (items) {
                self.set('value', collection.getIdentity(items[0]));
            });
        }
    },

    _setValueAttr: function (value) {
        var self = this;
        this.collection.get(value).then(function (item) {
            if (item) {
                domConstruct.place(self.renderItem(item),
                    self.labelNode, 'only');
                self._set('value', value);
            }
        });
    },

    toggle: function (state) {
        if (typeof state === 'undefined') {
            state = !this.opened;
        }
        this.opened = state;

        domClass.toggle(this.list.domNode, 'opened', this.opened);
        if (state && !this.list._started) {
            this.list.startup();
        }
    },

    renderItem: function (item) {
        var divNode = domConstruct.create('div', { className: item.name });
        domConstruct.place(document.createTextNode(item.name), divNode);
        return divNode;
    }
});
