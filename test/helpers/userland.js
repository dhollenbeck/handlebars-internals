'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var safeEval = require('notevil');

function toHelper(str) {
	return Function('"use strict";return ' + str)();
}

describe('Handbars Helpers - private helpers from userland (unsafe & sandboxed)', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	it('could run untrusted code', function() {

		var untrusted = 'function(a,b) {return a+b;}';
		var config = {
			helpers: {untrustedPrivateHelper: toHelper(untrusted)}
		};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '3');
	});

	it('could run untrusted code which has access to global context and template context', function() {

		var untrusted = 'function(a,b) {return Object.keys(global).join(",");}';
		var config = {helpers: {untrustedPrivateHelper: toHelper(untrusted)}};
		var html = '{{untrustedPrivateHelper}}';
		var context = {};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, 'console,DTRACE_NET_SERVER_CONNECTION,DTRACE_NET_STREAM_END,DTRACE_HTTP_SERVER_REQUEST,DTRACE_HTTP_SERVER_RESPONSE,DTRACE_HTTP_CLIENT_REQUEST,DTRACE_HTTP_CLIENT_RESPONSE,COUNTER_NET_SERVER_CONNECTION,COUNTER_NET_SERVER_CONNECTION_CLOSE,COUNTER_HTTP_SERVER_REQUEST,COUNTER_HTTP_SERVER_RESPONSE,COUNTER_HTTP_CLIENT_REQUEST,COUNTER_HTTP_CLIENT_RESPONSE,global,process,Buffer,clearImmediate,clearInterval,clearTimeout,setImmediate,setInterval,setTimeout,before,after,beforeEach,afterEach,run,context,describe,xcontext,xdescribe,specify,it,xspecify,xit');
	});

	it('could be passed a local hbs reference', function() {

		hbs.add = function(a,b) {return a+b;};

		// var untrusted = 'function(a,b) {return a+b;}';
		var untrusted = (new Function('hbs', 'a', 'b', 'return hbs.add(a,b);')).bind(undefined, hbs);
		var config = {helpers: {untrustedPrivateHelper: untrusted}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '3');
	});

	it('could be sandboxed', function() {

		var untrusted = safeEval.Function('a', 'b', 'return a+b');
		var config = {helpers: {untrustedPrivateHelper: untrusted}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '3');
	});

	it('could be sandboxed with local reference to hbs', function() {

		hbs.add = function(a,b) {return a+b+1;};

		var untrusted = safeEval.Function('hbs', 'a', 'b', 'return hbs.add(a,b);').bind(undefined, hbs);
		var config = {helpers: {untrustedPrivateHelper: untrusted}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, '4');
	});

	it('could be sandboxed and protect against evil code', function() {
		var err;
		var untrusted = safeEval.Function('hbs', 'a', 'b', 'while(true) {}; return "never";').bind(undefined, hbs);
		var config = {helpers: {untrustedPrivateHelper: untrusted}};
		var html = '{{untrustedPrivateHelper a b}}';
		var context = {a: 1, b: 2};
		var template = hbs.compile(html);
		try {
			template(context, config);
		} catch (e) {
			err = e;
		}
		Assert.equal(err.toString(), 'Error: Infinite loop detected - reached max iterations');
	});


});
