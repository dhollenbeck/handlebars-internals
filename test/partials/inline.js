'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var VM = require('vm2').VM;

describe('Handbars Partials - inline partials', function () {

	var hbs;

	beforeEach(function () {
		hbs = Handlebars.create();
	});

	function revive(specStr) {
		return new Function('return ' + specStr)();
	}

	it('can be defined and invoked inside the html template', function() {

		var inline = '{{#*inline "myPartial"}}Content{{/inline}}';
		var html = inline + '{{#each letters}}{{> myPartial}}{{/each}}';

		var context = {letters: ['a', 'b', 'c']};
		var template = hbs.compile(html);
		var rhtml = template(context);
		Assert.equal(rhtml, 'ContentContentContent');
	});
	it('will work with current context', function() {

		var inline = '{{#*inline "myPartial"}}{{this}}{{/inline}}';
		var html = inline + '{{#each letters}}{{> myPartial}}{{/each}}';

		var context = {letters: ['a', 'b', 'c']};
		var template = hbs.compile(html);
		var rhtml = template(context);
		Assert.equal(rhtml, 'abc');
	});
	it('missing inline partials will not error during compile() but will err during runtime', function() {

		var inline = '{{#*inline "myPartial"}}{{this}}{{/inline}}';
		var html = inline + '{{#each letters}}{{> myMissingPartial}}{{/each}}';

		var context = {letters: ['a', 'b', 'c']};
		var template = hbs.compile(html);
		try {
			template(context);
		} catch (err) {
			Assert.equal(err.toString(), 'Error: The partial myMissingPartial could not be found');
		}
	});
	it('missing inline partials will not error during precompile() but will err during runtime', function() {

		var inline = '{{#*inline "myPartial"}}{{this}}{{/inline}}';
		var html = inline + '{{#each letters}}{{> myMissingPartial}}{{/each}}';

		var context = {letters: ['a', 'b', 'c']};
		var specStr = hbs.precompile(html);
		var specObj = revive(specStr);
		var template = hbs.template(specObj);

		try {
			template(context);
		} catch (err) {
			Assert.equal(err.toString(), 'Error: The partial myMissingPartial could not be found');
		}
	});
});
