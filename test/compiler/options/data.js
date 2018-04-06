'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');



describe('Handbars.compile() option data', function () {
	it('helpers are passed context by default.', function() {
		var template = Handlebars.compile('{{hello}}');

		var helpers = {
			hello: function(options) {

				// this = data context
				Assert.deepEqual(this, {noun: 'cat'});

				// options.data has tracking info
				Assert.deepEqual(options.data, {
					adjective: 'happy',
					_parent: { adjective: 'happy' },
					root: { noun: 'cat' } }
				);
			}
		};

		var result = template({noun: 'cat'}, {helpers: helpers, data: {adjective: 'happy'}});
	});
	it('helpers are passed context by default and its not changed by passing params.', function() {
		var template = Handlebars.compile('{{hello noun}}');

		var helpers = {
			hello: function(noun, options) {

				// this = data context
				Assert.deepEqual(this, {noun: 'cat'});

				// options.data has tracking info
				Assert.deepEqual(options.data, {
					adjective: 'happy',
					_parent: { adjective: 'happy' },
					root: { noun: 'cat' } }
				);
			}
		};

		var result = template({noun: 'cat'}, {helpers: helpers, data: {adjective: 'happy'}});
	});
	it('helpers are passed context by default even in loops.', function() {

		var template = Handlebars.compile('{{#each persons}}{{hello}}{{/each}}');

		var helpers = {
			hello: function(options) {

				// this = current data context
				Assert(this.fn);
				Assert(this.ln);
				Assert.equal(this.noun, undefined);

				// options.data does not contain `current` data context
				Assert.equal(options.data.fn, undefined);
				Assert.equal(options.data.ln, undefined);
				Assert.equal(options.data.fn, undefined);

				// options.data does have the root data context
				Assert.equal(options.data.root.noun, 'cat');

				// Therefore, if your

				// if (options.data.first) console.log('options.data', options.data);

				// options.data {
				// 	adjective: 'happy',
				// 	_parent: {
				// 		adjective: 'happy',
				// 		_parent: { adjective: 'happy' },
				// 		root: { noun: 'cat', persons: [Array] }
				// 	},
				// 	root: { noun: 'cat', persons: [[Object], [Object]] },
				// 	key: 0,
				// 	index: 0,
				// 	first: true,
				// 	last: false
				// }

			}
		};
		var context = {
			noun: 'cat',
			persons: [
				{fn: 'Dan', ln: 'Hollenbeck'},
				{fn: 'Yehuda', ln: 'Katz'}
			]
		};
		var result = template(context, {helpers: helpers, data: {}});
	});
	it('helpers should not get data with data tracking off.', function() {
		var template = Handlebars.compile('{{hello}}', {data: false});

		var helpers = {
			hello: function(options) {

				// options.data != data context
				Assert(options.name);
				Assert(options.hash);
				Assert.equal(options.data, undefined);

				// this = data context
			}
		};

		var result = template({noun: 'cat'}, {helpers: helpers, data: {adjective: 'happy'}});
	});
});