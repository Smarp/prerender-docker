#!/usr/bin/env node
var prerender = require('prerender');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
/**/
var plugins = require('prerender-contrib');
server.use(plugins.baseHref);
server.use(plugins.inlineCss);
server.use(plugins.urlInParam);
/**/
// server.use(prerender.inMemoryHtmlCache());
if (process.env.AWS_ACCESS_KEY_ID) {
	console.log("Using s3HtmlCache")
    server.use(prerender.s3HtmlCache());
} else {
	console.log("Not using s3HtmlCache")
}

server.start();
