'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');

describe('Handbars.compile() data', function () {
	it('should assign string', function () {
		var context = {foo: 'bar'};
		var source = "{{foo}}";
		var template = Handlebars.compile(source);
		var output = template(context);
		Assert.equal(output, 'bar');
	});
});