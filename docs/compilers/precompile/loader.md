# Precompile Workflow

The purpose of precompiling the templates is improve performance during execution (normally in the browser). There are many integrations of Handlebars with existing web frameworks. Consider using on of these existing interations before coding your own:

- [Express.js Handlebars](https://github.com/ericf/express-handlebars)
- https://github.com/pcardune/handlebars-loader

# Example Web Server Workflow

At server start up:
- Read templates from persistent memory storage (disk, database, S3).
- Precompile the to produce a templateSpec.
- Save the templateSpec somewhere fast storage (memory, database, disk).

Before or after template render request:
- Read the template specs from fast storage (server memory).
- If need be pass the template specs to the execution environment (browser)
- Revive the template specs back to template functions by call Handlebars.template(templateSpec)
- Render templates Handlebars.templates[name](data).


