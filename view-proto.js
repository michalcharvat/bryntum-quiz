/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 13:10
 * To change this template use File | Settings | File Templates.
 */
var myData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
    ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
];

var store = Ext.create('Ext.data.ArrayStore', {
    // store configs
    autoDestroy: true,
    storeId: 'myStore',
    // reader configs
    idIndex: 0,
    data: myData,
    fields: [
        'company',
        {name: 'price', type: 'float'},
        {name: 'change', type: 'float'},
        {name: 'pctChange', type: 'float'},
        {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
    ]
});


Ext.define('MyGrid', {
    extend : 'Ext.grid.Panel',
    store: 'myStore',
    alias: 'widget.mygrid',

    columns : [
        {
            text      : 'Company',
            dataIndex : 'company',
            renderer  : function(value, meta, record, row, column, store, view) {
                meta.style = "background-color:" + view.getCellColor();

                return value;
            }
        }
    ],

    colors : {
        cell : '#00AAAA'
    },

    viewConfig: {
        setCellColor : function(color) {
            var form = this.ownerCt;
            form.cellColors.cell = color;

            this.refresh();
        },

        getCellColor : function() {
            var form = this.ownerCt;
            return form.cellColors.cell;
        }
    }
});
