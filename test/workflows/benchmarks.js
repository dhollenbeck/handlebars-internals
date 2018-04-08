'use strict';

var Assert = require('assert');
var Handlebars = require('handlebars');
var HTML = require('./html');


function revive(specStr) {
	return new Function('return ' + specStr)();
}

var max = 10000;
var html = HTML.paragraphs(100);
var context = {f1: 'Dan', f2: 'Hollenbeck', f3: 'Zoolander', f4: 'Bannana', f5: 'Love', f6: '$999999999'};
var spec = Handlebars.precompile(html);

// The benchmark tests below only test starting from a template HTML or
// starting from template SPEC. You would only reasonable store the HTML
// or the precompiled template SPEC. For purpose of these tests it is not
// interesting how you get to the template SPEC.

// Results 100 paragraph template:
// √ (1) HTML --> compile() --> RHTML  (464194ms)
// √ (2) SPEC --> revive() --> template() --> RHTML (15359ms)

// Assume 6 paragraphs per page
// Without writing to disk which is expensive
// HTML: 464 seconds, 21 renderings/second, 350 pages/second
// SPEC: 15 seconds, 666 renderings/second, 11,100 pages/second

describe.only('Handbars Workflows Benchmarks', function () {
	this.timeout(0)
	it.only('(1) HTML --> compile() --> RHTML ', function() {
		for (var i = 0; i < max; i++) {
			var template = Handlebars.compile(html);
			var rhtml = template(context);
		}
	});
	it.only('(2) SPEC --> revive() --> template() --> RHTML', function() {
		for (var i = 0; i < max; i++) {
			var template = Handlebars.template(revive(spec));
			var rhtml = template(context);
		}
	});
});