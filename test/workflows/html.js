'use strict';

var paragraph = '{{#if f1}} Lorem ipsum dolor sit amet, {{f1}} consectetur adipiscing elit. Vivamus hendrerit sagittis mi, {{f1}} maximus {{f4}}it gravida at. {{f1}} ac vulp{{f3}}ate metus. Interdum et {{f2}} fames ac ante ipsum primis in faucibus. {{#if f8}}Maecenas eget ante erat. {{/if}}Morbi a orci feugiat, lobortis lacus vitae, aliquet risus. {{f1}} ac null{{f1}}a ac augue egestas ultrices quis at erat. Aenean arcu dui, laoreet {{f1}} {{f2}} {{f3}}, vehicula eu nulla. Fusce dictum ante in purus {{#if f10}}lacinia accumsan.{{else}} Mauris nec {{/if}} justo et orci mattis pretium id vitae nulla. Cras tristique sagittis ex, {{f1}} lacinia nisl maximus a. Suspendisse vitae eros tortor. Fusce cursus imperdiet erat {{f3}} scelerisque. Proin ligula massa, laoreet non ex quis, gravida euismod metus. {{/if}}';

exports.paragraphs = function(max) {
	var html
	for (var i = 0; i < max; i++) {
		html = html + paragraph;
	}
	return html;
};
