'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');

describe('Handbars Helpers - private helpers', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	it('should be accessible in the current template context', function() {
		var config = {helpers: {privateHelper: function(str) {return str;}}};
		var html = '{{privateHelper name}}';
		var context = {name: 'Dan'};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, 'Dan');
	});
	it('should be acccessible in a global partial template context', function() {

		hbs.registerPartial('globalPartial', '{{privateHelper name}}');

		var config = {helpers: {privateHelper: function(str) {return str;}}};
		var html = '{{> globalPartial }}';
		var context = {name: 'Dan'};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, 'Dan');
	});
	it('should be acccessible in a private partial template context', function() {

		var config = {
			helpers: {privateHelper: function(str) {return str;}},
			partials: {privatePartial: '{{privateHelper name}}'}
		};
		var html = '{{> privatePartial }}';
		var context = {name: 'Dan'};
		var template = hbs.compile(html);
		var rhtml = template(context, config);
		Assert.equal(rhtml, 'Dan');
	});
});
