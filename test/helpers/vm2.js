'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var VM = require('vm2').VM;
var NodeVM = require('vm2').NodeVM;

var Konsole = require('@ravdocs/console');

var stdout = Konsole.hook(function (output, obj) {
	output.str += obj.str;
}, process.stdout);


function toHelper(str) {
	return Function('"use strict";return ' + str)();
}

describe('Handbars Helpers - private helpers from userland (vm2)', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	function toSandbox (names, values) {
		var sandbox = {};
		names.forEach(function(name, i) {
			sandbox[name] = values[i];
		});
		return sandbox;
	}

	function toOptions (args) {
		return args[args.length - 1];
	}

	it.only('could be sandboxed by and allow us to define environment (vm2.VM)', function() {

		// given the following userland function data
		// notice the lack of return statement in the code
		var args = ['a','b'];
		var code = 'var x = 23;\n x + a + b;';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.hbs = hbs;
			sandbox.options = toOptions(arguments);
			sandbox.SafeString = hbs.SafeString;
			sandbox.createFrame = hbs.createFrame;
			sandbox.escapeExpression = hbs.escapeExpression;

			return new VM({
				timeout: 1000,
				sandbox: sandbox
			}).run(code);
		};
		var config = {helpers: {untrustedPrivateHelper: helper}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '26');
	});

	it.only('could be sandboxed by and allow us to define environment (vm2.NodeVM)', function() {
		// given the following userland function data
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

	it.only('could be sandboxed by and allow us to define environment (vm2.NodeVM) and capture stdout', function() {
		// given the following userland function data
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
		stdout.clean();
		stdout.disable();

		var rhtml = template(context, config);

		// shutdown & cleanup process hook
		stdout.enable();
		stdout.restore();

		Assert.equal(rhtml, '26');
		Assert.equal(stdout.str(), 'teapot\n')
	});
});
