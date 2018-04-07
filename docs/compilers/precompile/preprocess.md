# Preprocess

Possible preprocessors modifications could be:

- CSS Preprocessor
- Conversion of Compound Logic Support
	- This would only be possible with HTML preprocessor because otherwise Handlebars.parse() would fail.
	- `{{#if f1 = f2 OR f3 != f4}}` ===> `{{#if f1 '=' f2 'AND' f3 '!=' f4}}`
	- `{{else if f1 = f2 OR f3 != f4}}` ===> `{{else if f1 '=' f2 'AND' f3 '!=' f4}}`
- Auto-insert Helpers
	- `{{f1987}}` ===> `{{field 1987}}`
- Case Insensitive Variables
	- Search for and replace all variables with lower case
- Wrapping expressions with decorating spans
	- `{{f1234}}` ==> `<span class="pretty" title="Your custom label">{{f1234}}</span>`
- Cleanup/Remove WYSIWYG Artifacts
