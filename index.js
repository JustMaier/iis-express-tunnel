var proxy = require('http-proxy'),
	localtunnel = require('localtunnel'),
	yargs = require('yargs'),
	openurl = require('openurl');

// CLI Args
var argv = yargs
	.usage('Usage: $0 --port [num] <options>')
	.options({
		'h': {
			alias: 'host',
			describe: 'Upstream server providing forwarding',
			default: 'http://localtunnel.me'
		},
		's': {
			alias: 'subdomain',
			describe: 'Request this subdomain'
		},
		'l': {
			alias: 'local-host',
			describe: 'Tunnel traffic to this host instead of localhost, override Host header to this host'
		},
		'o': {
			alias: 'open',
			describe: 'opens url in your browser',
			type: 'boolean'
		},
		'p': {
			alias: 'port',
			describe: 'IIS Express application port',
			required: 'port must be a number',
			type: 'number'
		},
		'd': {
			alias: 'proxy',
			describe: 'The proxy port',
			default: 1227,
			type: 'number'
		}
	})
	.help('help','Show this help and exit')
	.version(require('./package').version)
	.argv;

var options = {
	host: argv.host,
	local_host: argv['local-host'],
	port: argv.proxy,
	subdomain: argv.subdomain
};

// Setup IIS Express Proxy
var target = 'http://' + (options.local_host || 'localhost') + ':' + argv.port
proxy.createProxyServer({
	target: target,
	changeOrigin: true
}).listen(argv.proxy, function() {
	// Setup localtunnel
	localtunnel(options.port, options, function(err, tunnel){
		if(err) throw err;
		console.log('your url is: %s', tunnel.url);
		console.log('[press Ctrl-C to exit]');

		if(argv.open) openurl.open(tunnel.url);

		tunnel.on('error', function(err){
			throw err;
		})
	})
}).on('error', function (err, req, res) {
	res.writeHead(500, { 'Content-Type': 'text/plain' });
	var fullUrl = target+req.url;
	res.end('Error while trying to reach ' + fullUrl + '.\n\n'+err.stack);
});

