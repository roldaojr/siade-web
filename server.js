// SAIDE local development server
const url = require('url')
const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const path = require('path')

var serverConfig = {
    appName: "SIADE",
    databaseURI: process.env.SIADE_DATABASE_URI || "mongodb://localhost:27017/parse",
    appId: process.env.SIADE_APP_ID || "siade",
    masterKey: process.env.SIADE_MASTER_KEY || "master",
    serverURL: process.env.SIADE_SERVER_URL || 'http://localhost:8080',
    cloud: __dirname + '/cloud/index.js',
}

var api = new ParseServer(serverConfig)
var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": serverConfig.serverURL+"/parse",
            "appId": serverConfig.appId,
            "masterKey": serverConfig.masterKey,
            "appName": serverConfig.appName
        }
    ]
})

var urlObject = url.parse(serverConfig.serverURL, false, true)
var app = express()
// Serve the Parse API on the /parse URL prefix
app.use("/parse", api)
// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard)
// Serve static assets from the /app folder
app.use('/app', express.static(path.join(__dirname, '/app')));
// Serve javascript modules from the /node_modules folder
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// start http server
var httpServer = require('http').createServer(app)
httpServer.listen(urlObject.port || 80, function() {
    console.log("Running SIADE development server")
    console.log("Web App URL: %s/app", serverConfig.serverURL)
    console.log("Parse API URL: %s/parse ", serverConfig.serverURL)
})
