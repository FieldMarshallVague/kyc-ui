# Radix KYC 

## Overview

This is based on the Onfido [example](https://github.com/onfido/onfido-sdk-ui).

## Run the app

Create a file `./secrets.json` containing a JSON object with an `apiToken` property.  In a production environment this file should contain a production token, but you must use a sandbox token for development.  These files must not be checked into source control.

Example:

```json
{
  "apiToken":"YOUR_API_TOKEN_HERE"
}

```

Git clone the project and run `npm install` and then `npm run prestart`.

The server generates SSL certificates and defaults to the port 8090.  Visit https://localhost:8090/ to view it.  You'll probably have to accept 'unsafe' access to it as the certs are self-signed.

## Internals

The core app is the `node app/server.js`.
This server will be serving JWTs to the front-end and will also initialize the Webpack server, which in turn provides the front-end code and assets.
This node server will also create https credentials which will be shared with the Webpack server as well.
This credential sharing is particularly important considering that both the JWT endpoint, provided by the node server, and the front-end code, provided by the Webpack server, are different servers on different ports, and since the client will be hitting both (asking for JWTs and for assets), the user would have to accept two sets of credentials in case they had not been shared.

While webpack is set up to watch files, it doesn't have hot reloading yet, and it doesn't do incremental builds.
