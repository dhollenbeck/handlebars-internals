'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');

describe('Handbars Helpers - SafeString', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	it('should understand safe strings', function() {

		var str = '<b>teapot</b>';
		var safe = hbs.SafeString(str);

		Assert.equal(typeof safe, 'undefined');
		Assert.equal(typeof str, 'string');
	});
});
