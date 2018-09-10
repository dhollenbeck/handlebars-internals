'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var VM = require('vm2').VM;
var Konsole = require('@ravdocs/console');
var stdout = Konsole.hook(function (output, obj) {
	output.str += obj.str;
}, process.stdout);


describe.only('Handbars Helpers - private helpers running in (vm2.VM)', function () {

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

	it('can be sandboxed with defined environment', function() {

		// given the following userland function args and function string
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

	it('can be sandboxed with froozen environment', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = ['a','b'];
		var code = 'var x = 23;\n x + a + b;';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);

			var vm = new VM({
				timeout: 1000,
				sandbox: sandbox
			});

			// read-only hbs
			vm.freeze(hbs, 'hbs');

			return vm.run(code);
		};
		var config = {helpers: {untrustedPrivateHelper: helper}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '26');
	});

	it('will NOT be able to invoke SafeString from inside helper (sad face)', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = [];
		var code = 'toHtml("<b>teapot</b>");';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);
			sandbox.toHtml = function(str) {
				return hbs.SafeString(str);
			};

			var vm = new VM({
				timeout: 1000,
				sandbox: sandbox
			});

			return vm.run(code);
		};
		var config = {helpers: {helper: helper}};
		var html = '{{helper}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '');
	});
	it('will be able to invoke options.fn and options.inverse from inside helper', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = ['a', 'options'];
		var code = '(a)? options.fn(this) : options.inverse(this)';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);

			var vm = new VM({
				timeout: 1000,
				sandbox: sandbox
			});

			return vm.run(code);
		};
		var config = {helpers: {is: helper}};
		var html, context, template, actual;

		// true
		html = '{{#is a}}true{{else}}false{{/is}}';
		context = {a: 1};
		template = hbs.compile(html);
		actual = template(context, config);
		Assert.equal(actual, 'true');

		// false
		html = '{{#is a}}true{{else}}false{{/is}}';
		context = {a: 0};
		template = hbs.compile(html);
		actual = template(context, config);
		Assert.equal(actual, 'false');
	});
	it('will setting timeout to protect against `while(true){}` syle attacks', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = [];
		var code = 'while(true){}';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);

			var vm = new VM({
				timeout: 500,
				sandbox: sandbox
			});

			return vm.run(code);
		};
		var config = {helpers: {helper: helper}};
		var html = '{{helper}}';
		var context = {};
		var template = hbs.compile(html);
		try {
			template(context, config);
		} catch (err) {
			Assert.equal(err.toString(), 'Error: Script execution timed out.');
		}
	});
	it('will allow changing primative property (String.length)', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = [];
		var code = 'var x = "xxxx"; x.length;';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);

			var vm = new VM({
				timeout: 500,
				sandbox: sandbox
			});

			return vm.run(code);
		};
		var config = {helpers: {helper: helper}};
		var html = '{{helper}}';
		var context = {};
		var template = hbs.compile(html);
		var actual = template(context, config);
		Assert.equal(actual, '4');
	});
	it('will allow defining utility functions inside untrusted code', function() {

		// given the following userland function args and function string
		// notice the lack of return statement in the code
		var args = ['a'];
		var code = 'function double (y) { return y*y;} double(a);';

		// build the vm2 helper
		var helper = function () {

			// build global object
			var sandbox = toSandbox(args, arguments);
			sandbox.options = toOptions(arguments);

			var vm = new VM({
				timeout: 500,
				sandbox: sandbox
			});

			return vm.run(code);
		};
		var config = {helpers: {helper: helper}};
		var html = '{{helper a}}';
		var context = {a: 16};
		var template = hbs.compile(html);
		var actual = template(context, config);
		Assert.equal(actual, '256');
	});
	it('will not generate memory leak as tested by `leakage`');
});
