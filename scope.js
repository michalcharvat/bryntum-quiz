/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 13:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyPanel', {
	extend : 'Ext.Panel',
	xtype : 'mypanel',

	sayHello : function() {
		console.log('Hello world');
	},

	initComponent : function() {
		this.callParent(arguments);
		var tbar = this.getDockedItems()[0],
			button = tbar.items.items[0];

		button.on('click', this.sayHello, this);
	},

	tbar : [{
		text : 'Click to say hello'
	}],

	listeners : {
		render: function(me) {
			var tbar = this.getDockedItems()[0],
				targetEl = tbar.targetEl;
		}
	}
});