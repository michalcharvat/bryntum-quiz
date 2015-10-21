// Bryntum JS / Ext JS QUIZ



/**
 * 1. Given an arbitrary array which potentially contains other flat arrays:
 */

// How do you transform this into a completely flat array as seen below?
var arr = [ [1, 2, "a"], 3, "foo", [ "bar", {} ] ];

var flatArr = [ 1, 2, "a", 3, "foo", "bar", {} ];

// Try to find the shortest simplest code to solve this task.


// Answer:
var out = [];
(function quiz1(ar) {

    ar.forEach(function (item) {
        if (item instanceof Array) {
            quiz1(item);
        } else {
            out.push(item);
        }
    });
}) (inp);




/**
 * 2. Write a single RegExp to extract the Ext JS version identifier (e.g. “3.4.0”,
 * or “4.1.1-rc-1”) out of the URLs below. URLs potentially can point to some other
 * resource, in which case the RegExp should not match.
 */

var strings = [
    "http://bryntum.com/examples-1.2.3/advanced/advanced.html",
    "http://bryntum.com/doc/1.2.3/foo/bar.html",
    "http://cdn.sencha.io/ext-3.4.0/ext-all-debug.js",
    "http://cdn.sencha.io/ext-3.4.0-beta-1/ext-all.js",
    "http://cdn.sencha.io/extjs-4.1.0-rc-1/ext-all-debug.js"
];

// Answer:

(function quiz2 (ar) {
    ar.forEach(function(item) {
        var re = new RegExp('ext(js)?-(.*)/', 'g');
        var result = re.exec(item);
        var version = result ? result[2] : 'N/A';
        out.push(version);
        console.log(item, '->', version);
    });
} (inp));



/**
 * 3. You need to add a visual effect to items in a long list when the user is hovering the mouse over it.
 *    how do you solve it (x-browser incl. IE7)?

 <ul class=”somelist”>
 <li>1</li>
 <li>2</li>
 <li>3</li>
 ...
 <li>999</li>
 </ul>
 */

// Answer:

// Need to add some style definition
// run http://localhost/~user1/bquiz/question-3.html
/*
<style type="text/css">
    ul.somelist li:hover {
    background-color: lightgray;
}
</style>
*/





/**
 * 4.	What is wrong with the following Ext JS 4 class definition:
 */

Ext.define('MyPanel', {
    extend : 'Ext.Panel',

    sayHello : function() { console.log('Hello world'); },

    tbar : [
        {
            text    : 'Click to say hello',
            handler : this.sayHello,
            scope   : this
        }
    ]
});

// Corrected class definition:

//  By class declaration *this* inside the function points to the Window object, rather than to the Class instance as it might expected.
//  To work around need to add listener at the other place, eg. at initComponent callback.

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


/**
 * 5.	One of your grids require dynamic cell/row coloring capabilities.
 *      What is problematic with the following Ext JS 4 class definition?
 *      Hint: Assume that there will be multiple instances of this grid class on the page.
 */

Ext.define('MyGrid', {
    extend : 'Ext.grid.Panel',

    columns : [
        {
            text      : 'Some column',
            dataIndex : 'foo',
            renderer  : function(value, meta, record, row, column, store, view) {
                meta.style = "background-color:" + view.getCellColor();

                return value;
            }
        }
    ],

    viewConfig: {
        colors : {
            cell : '#00ff00'
        },

        setCellColor : function(color) {
            this.colors.cell = color;

            this.refresh();
        },

        getCellColor : function() {
            return this.colors.cell;
        }
    }
});


// Corrected class definition:

// viewConfig property is placed in the Class prototype, then it shared between all MyGrid instancies
// changing any of its property will affect on all grid.
// Solution: move cellColors property to the class definition.

Ext.define('MyGridNoBug', {
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

    cellColors : {
        cell : '#00ff00'
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


/**
 * 6.	Why should we avoid using Ext.getCmp in a real Ext JS application?
 */

// Answer:
/**
 Main concerns, that Ext.getCmp() encourages to use static ids of the components. It could in turns causes bad programming
 practice, particularly:

     Limited to one instance of Component per ID
     Bloats code
     Messy/harder to read
     Slower due to execution stack
     Can generate invalid HTML (duplicate ids)
 */


/**
 * 7. Our scheduler component supports both grid view and tree view row representation. We don't know which
 *    version our clients end up using. One of our clients reports an exception using a Bryntum Scheduler
 *    component in his application. He points to this line in our source code, what could be the issue?
 */

var isTree = this.store instanceof Ext.data.TreeStore;

// Answer and corrected line:

//    I guess on some circumstances this.store can be a string storeId, or ever null.
//    In its turn null instanceof Ext.data.TreeStore, does not produce exception.
//    Then need to foresee all three cases: null, string or Ext.data.Store

var store = this.store;

// Ext.getStore(null) produces exception!
if (store != null) {
    store = Ext.getStore(this.store);
}

var isTreeProof = store instanceof Ext.data.TreeStore;



/**
 * 8. You need to react to clicks on individual LI items in the list below, how do you solve it?

 <ul class=”somelist”>
 <li>1</li>
 <li>2</li>
 <li>3</li>
 ...
 <li>999</li>
 </ul>

 *
 */


// Answer:
//Have to use delegate option.
Ext.onReady(function() {
    var body = Ext.getBody();
    // quiz 8
    var ul = body.query('ul.somelist')[0];

    Ext.fly(ul).on('click', function(e, target) {
        console.log(arguments);
        alert(target.innerText + ' pressed');
    }, null, {
        delegate: 'li'
    });
});


/**
 * 9. List the potential issues with the following Ext JS plugin definition:
 */

// Cool plugin that highlights the grid element after its store is loaded
Ext.define('MyGridPlugin', {
    extend : 'Ext.AbstractPlugin',

    init : function(grid) {
        grid.getStore().on({
            load : function() {
                // Some cool fx to bring attention to the grid
                grid.getEl().highlight();
            }
        });
    }
});

// Let’s try it out
var myGrid = new Ext.grid.Panel({
    columns  : [
        {
            text : 'foo'
        }
    ],
    store    : new Ext.data.Store({
        fields : ['foo'],
        proxy : 'memory'
    }),
    plugins  : new MyGridPlugin()
});

myGrid.store.loadData([
    { foo : 'bar' }
]);

// Answer & corrected plugin definition:



/**
 * 10. Designing complex and re-usable ExtJS UI widgets (potentially consisting from other re-usable
 *     widgets), what will be your design principles / best practices / etc?
 */

// Answer

/*
* 1. Use sencha packages
* 2. Very well documentation
* 3. Very careful rendering policy
* 4. Do not use undocumented features
* 5. Thoroughly units and integration testing
*
*/

/**
 * 11. You are given an input array of intervals on a number axis. For each
 * interval, a start point, an end point and some “value” is known. Write a
 * function in pure JavaScript, that will transform the input array to another
 * array of the objects with the same structure. The function should sum the
 * “values” of all intersecting intervals and include in the result all intervals
 * with different sum of “values”. See the examples of input and expected output.
 * Note that the start and end point coordinates may have fractional values.
 */

var input1 = [
    { start :1, end :2, value :1 },
    { start :2, end :3, value :1 }
];

var output1 = [
    { start :1, end : 3, value :1 }
];


var input2 = [
    { start :1, end :3, value :1 },
    { start :2, end :4, value :1 }
];

var output2 = [
    { start :1, end :2, value :1 },
    { start :2, end :3, value :2 },
    { start :3, end :4, value :1 }
];

var input3 = [
    { start :1, end :3, value :1 },
    { start :2, end :4, value :1 },
    { start :2, end :5, value :2 },
    { start :4, end :5, value :1 }
];

var output3 = [
    { start :1, end :2, value :1 },
    { start :2, end :3, value :4 },
    { start :3, end :5, value :3 }
];


// Answer

var suite = [input1, input2, input3];

var suiteCheck = [output1, output2, output3];


function gantt(inp) {
    var out = [];
    var boundsObj = {};


//    figure out all possible boundaries;
    extEach(inp, function(room) {
        extEach(['start', 'end'], function(border) {
            var boundary = room[border];

            boundsObj[boundary] = 0;
        })
    });

    // create boundaries array ordered
    var boundsArr = Object.keys(boundsObj);
    for (var index = 0; index < boundsArr.length; index++) {
        var strBoundary = boundsArr[index];
        boundsArr.splice(index, 1, Number(strBoundary))
    }
    boundsArr.sort();

    console.log('All possible boundaries: %s' , JSON.stringify(boundsArr));

    // evaluate values on boundaries
    extEach(inp, function(room) {
        var start = room.start,
            end = room.end,
            value = room.value,
            boundaryStartIndex = boundsArr.indexOf(start),
            boundaryEndIndex = boundsArr.indexOf(end);

        for (var index = boundaryStartIndex; index < boundaryEndIndex; index++) {
            var boundary = boundsArr[index];

            boundsObj[boundary] += value;
        }
    });

    console.log('Boundaries values: %s' , JSON.stringify(boundsObj));

    // convert to continues single-dimensioned rooms
    var startBoundaryIndex = boundsArr[0],
        startBoundary = boundsObj[startBoundaryIndex],
        startRoomValue = startBoundary,
        boundaries = boundsArr.length;

    for (var boundaryIndex = 1; boundaryIndex < boundaries; boundaryIndex++) {
        var endBoundaryIndex = boundsArr[boundaryIndex],
            endRoomValue = boundsObj[endBoundaryIndex];

        if (endRoomValue !== startRoomValue) {
            if (startRoomValue > 0) {
                out.push({
                    start: startBoundaryIndex,
                    end: endBoundaryIndex,
                    value: startRoomValue
                });

            }

            startBoundaryIndex = endBoundaryIndex;
            startRoomValue = endRoomValue;
        }
    }

    return out;
}


// TestSuite driver
(function() {
    for (var testIndex = 0; testIndex < suite.length; testIndex++) {
        var testCase = suite[testIndex];
        var got = gantt(testCase);
        var expected = suiteCheck[testIndex];

        // expected should be equals got
        // try http://localhost/~user1/bquiz/question-11.html to view debugging information
    }
}());
