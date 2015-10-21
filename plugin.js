Ext.define('MyGridPlugin', {
    extend : 'Ext.AbstractPlugin',

    init : function(grid) {
        grid.getStore().on({
            load : function() {
                // Some cool fx to bring attention to the grid
                var el = grid.getEl();
                if (el) {
                    el.highlight();
                    console.log('Case 1) Highlighting synced')
                } else {
                    grid.on('afterrender', function(ct) {
                        ct.getEl().highlight();
                        console.log('Case 2) Highlighting postponed via "afterrender" event')
                    }, this, {single: true});
                }
            }
        });
    }
});
