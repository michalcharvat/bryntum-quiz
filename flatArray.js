/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 09:57
 * To change this template use File | Settings | File Templates.
 */

/**
 * Option 1. works for ECMAScript 5
 */

var inp = [ [1, 2, 'a'], 3, 'foo', [ 'bar', {} ] ];
console.log(inp);

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

console.log(out);