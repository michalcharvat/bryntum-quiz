/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 13:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyPanel', {
    extend: 'Ext.Panel',
    xtype: 'mypanel',

    sayHello: function() {
        console.log('Hello world');
        alert('Hello Mats, I fixed your bug :)');
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);

        var button = me.down('button[action=hello]');

        if (button) {
            button.on('click', me.sayHello, me);
        }
    },

    tbar: [{
        action: 'hello',
        text: 'Click to say hello'
    }]
});