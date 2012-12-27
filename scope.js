/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 13:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyPanel', {
	extend : 'Ext.Panel',
	xtype: 'mypanel',

	sayHello : function() { console.log('Hello world'); },

	tbar : [
		{
			text : 'Click to say hello',
			handler : this.sayHello,
			scope : this
		}
	]
});