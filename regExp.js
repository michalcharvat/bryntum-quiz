/**
 * Created with JetBrains WebStorm.
 * User: user1
 * Date: 27.12.12
 * Time: 10:58
 * To change this template use File | Settings | File Templates.
 */
var inp = [
	'http://bryntum.com/examples-1.2.3/advanced/advanced.html',
	'http://bryntum.com/doc/1.2.3/foo/bar.html',
	'http://cdn.sencha.io/ext-3.4.0/ext-all-debug.js',
	'http://cdn.sencha.io/ext-3.4.0-beta-1/ext-all.js',
	'http://cdn.sencha.io/extjs-4.1.0-rc-1/ext-all-debug.js'
];

(function quiz2 (ar) {
	ar.forEach(function(item) {
		var re = new RegExp('ext(js)?-(.*)/', 'g');
		var result = re.exec(item);
		console.log(item, '->', result ? result[2] : 'N/A');
	});
}) (inp);
