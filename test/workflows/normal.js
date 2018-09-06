'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');

// https://github.com/wycats/handlebars.js/issues/1033

function revive(specStr) {
	return new Function('return ' + specStr)();
}

describe('Handbars Workflows', function () {
	it('(1) HTML --> compile() --> RHTML ', function() {
		var html = '{{name}}';
		var context = {name: 'Dan'};
		var template = Handlebars.compile(html);
		var rhtml = template(context);
		Assert.equal(rhtml, 'Dan');
	});
	it('(2) HTML --> precompile() --> revive() --> template() --> RHTML', function() {
		var html = '{{name}}';
		var context = {name: 'Dan'};
		var specStr = Handlebars.precompile(html);
		var specObj = revive(specStr);
		var template = Handlebars.template(specObj);
		var rhtml = template(context);

		Assert.equal(rhtml, 'Dan');
		Assert.equal(typeof specStr, 'string');
		Assert.equal(typeof specObj, 'object');
	});
	it('(3) HTML --> parse() --> compile() --> template() --> RHTML', function() {
		var html = '{{name}}';
		var context = {name: 'Dan'};
		var ast = Handlebars.parse(html);
		var template = Handlebars.compile(ast);
		var rhtml = template(context);

		Assert.equal(rhtml, 'Dan');
		Assert.equal(typeof ast, 'object');
	});
	it('(4) HTML --> parse() --> precompile() --> revive() --> template() --> RHTML', function() {
		var html = '{{name}}';
		var context = {name: 'Dan'};
		var ast = Handlebars.parse(html);
		var specStr = Handlebars.precompile(ast);
		var specObj = revive(specStr);
		var template = Handlebars.template(specObj);
		var rhtml = template(context);

		Assert.equal(rhtml, 'Dan');
		Assert.equal(typeof specStr, 'string');
		Assert.equal(typeof specObj, 'object');
	});
});

var config = {
	helpers: {
		echo: function (str) {
			return str;
		},
		greeting: function () {
			return 'hello';
		}
	}
};
