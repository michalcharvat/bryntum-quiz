/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 13:08
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyGrid', {
	extend : 'Ext.grid.Panel',
	xtype: 'mygrid',

	// Row coloring for normal and alternate rows
	rowColors : {
		normal    : 'blue',
		alternate : 'white'
	},

// Updates the grid row colors
	setRowColors : function(normal, alternate) {
		this.rowColors.normal = color;
		this.rowColors.alternate = alternate;
		this.getView().refresh();
	}
});