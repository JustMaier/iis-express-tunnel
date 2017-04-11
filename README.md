iis-express-tunnel
====================
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A simple command-line utility that exposes your .NET web applications served by IIS Express to the world for easy testing and sharing. No need to edit config files, firewalls, or DNS settings.

Utilizes [localtunnel](https://github.com/localtunnel/localtunnel) to route traffic from the web to a local [http-proxy](https://github.com/nodejitsu/node-http-proxy) server that acts as a reverse proxy for you web app.

## Installation

```
npm install -g iis-express-tunnel
```

This will install iis-express-tunnel global and add the `iis-lt` client cli tool to your PATH

## Use

Assuming your app is hosted on port 8000, just use the `iis-lt` command to start the tunnel.

```
iis-lt --port 8000
```

Done! It will start the proxy server and use localtunnel to setup a tunnel to the outside world. The url will remain active for the duration of your session.

You can start and stop you IIS Express server without having to restart the tunnel.

### Arguments

Below are the most common arguments (these come from localtunnel). See `iis-lt --help` for additional argument

-  `--subdomain` request a named subdomain on the localtunnel server (default is random characters)
- `--open` open the url in a browser

[npm-image]: https://img.shields.io/npm/v/iis-express-tunnel.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/iis-express-tunnel
[license-image]: http://img.shields.io/npm/l/iis-express-tunnel.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/iis-express-tunnel.svg?style=flat-square
[downloads-url]: https://www.npmjs.com/package/iis-express-tunnel
