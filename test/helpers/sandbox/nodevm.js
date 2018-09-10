'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var NodeVM = require('vm2').NodeVM;
var Konsole = require('@ravdocs/console');
var stdout = Konsole.hook(function (output, obj) {
	output.str += obj.str;
}, process.stdout);


describe('Handbars Helpers - private helpers running in (vm2.NodeVM)', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	it('should be sandboxed with defined environment', function() {

		// given the following userland function string
		var code = 'function helper(a, b, options) {var x = 23;\nreturn x + a + b;}';

		// define virtual machine
		var vm = new NodeVM({
			console: 'inherit',
			sandbox: {
				SafeString: hbs.SafeString,
				createFrame: hbs.createFrame,
				escapeExpression: hbs.escapeExpression
			}
		});
		var helper = vm.run('module.exports = ' + code);
		var config = {helpers: {helper: helper}};
		var html = '{{helper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '26');
	});

	it('should be sandboxed with defined environment and capture stdout', function() {

		// given the following userland function string
		var code = 'function helper(a, b, options) {var x = 23;\nconsole.log("teapot");\nreturn x + a + b;}';

		// define virtual machine
		var vm = new NodeVM({
			console: 'inherit',
			sandbox: {
				SafeString: hbs.SafeString,
				createFrame: hbs.createFrame,
				escapeExpression: hbs.escapeExpression
			}
		});
		var helper = vm.run('module.exports = ' + code);
		var config = {helpers: {helper: helper}};
		var html = '{{helper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);

		// setup process hook
		stdout.capture();

		var rhtml = template(context, config);

		// release process hook
		stdout.release();

		Assert.equal(rhtml, '26');
		Assert.equal(stdout.str(), 'teapot\n')
	});
});
