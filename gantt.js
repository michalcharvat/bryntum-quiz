/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 09:57
 * To change this template use File | Settings | File Templates.
 */

/**
 * Question 11. Gantt calculations
 */

var input1 = [
    {start: 1, end: 2, value: 1},
    {start: 2, end: 3, value: 1}
];

var output1 = [
    {start: 1, end: 3, value: 1}
];

var input2 = [
    {start: 1, end: 3, value: 1},
    {start: 2, end: 4, value: 1}
];

var output2 = [
    {start: 1, end: 2, value: 1},
    {start: 2, end: 3, value: 2},
    {start: 3, end: 4, value: 1}
];

var input3 = [
    {start: 1, end: 3, value: 1},
    {start: 2, end: 4, value: 1},
    {start: 2, end: 5, value: 2},
    {start: 4, end: 5, value: 1}
];

var output3 = [
    {start: 1, end: 2, value: 1},
    {start: 2, end: 3, value: 4},
    {start: 3, end: 5, value: 3}
];

var input4 = [
    {start: 1, end: 2, value: 1},
    {start: 3, end: 4, value: 1}
];

var input5 = [];

var input6 = null;

var input7 = [
    {start: 1, end: 2, value: 1},
    {start: 4, end: 5, value: 1}
];


var input8 = [
    {start: 1, end: 2, value: 1},
    {start: 3, end: 5, value: 1}
];

var input9 = [
    {start: 1, end: 2, value: 1},
    {start: 4, end: 6, value: 2},
    {start: 5, end: 7, value: 1}
];

var  output9 = [
    {"start":1,"end":2,"value":1},
    {"start":4,"end":5,"value":2},
    {"start":5,"end":6,"value":3},
    {"start":6,"end":7,"value":1}
];

var suite = [input1, input2, input3, input4, input5, input6, input7, input8, input9];

var suiteCheck = [output1, output2, output3, input4, input5, [], input7, input8, output9];


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


(function() { for (var testIndex = 0; testIndex < suite.length; testIndex++) {
    var logMsg = '\n==========================> \nInput %s, \nexpected %s, \ntest passed? %s';
    var testCase = suite[testIndex];
    var got = gantt(testCase);
    var expected = suiteCheck[testIndex];

    var accepted = objectEquals(expected, got);
    var logParams = [JSON.stringify(testCase), JSON.stringify(expected), accepted.toString().toUpperCase()];

    if (!accepted) {
        logMsg += '\n ... sad got %s';
        logParams.push(JSON.stringify(got));
    }

    logMsg += '\n <-------------------------- \n';

    logParams.unshift(logMsg);

    console.log.apply(console, logParams);
}}());


function objectEquals(v1, v2) {
    if (v1 === v2) return true;

    if (typeof(v1) !== typeof(v2)) {
        return false;
    }

    if (typeof(v1) === "function") {
        return v1.toString() === v2.toString();
    }

    if (v1 instanceof Object && v2 instanceof Object) {
        if (countProps(v1) !== countProps(v2)) {
            return false;
        }

        var key;
        for (key in v1) {
            var r = objectEquals(v1[key], v2[key]);
            if (!r) {
                return false;
            }
        }
        return true;
    }


    function countProps(obj) {
        var count = 0,
            k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                count++;
            }
        }
        return count;
    }
}

/**
 * Ext.Array.each from sencha distro
 *
 * @param array
 * @param fn
 * @param scope
 * @param reverse
 * @returns {*}
 */
function extEach(array, fn, scope, reverse) {
//    array = ExtArray.from(array);

    if (!array) {
        return;
    }
    var i,
        ln = array.length;

    if (reverse !== true) {
        for (i = 0; i < ln; i++) {
            if (fn.call(scope || array[i], array[i], i, array) === false) {
                return i;
            }
        }
    }
    else {
        for (i = ln - 1; i > -1; i--) {
            if (fn.call(scope || array[i], array[i], i, array) === false) {
                return i;
            }
        }
    }

    return true;
}
