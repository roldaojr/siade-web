System.config({
    transpiler: "typescript",
    defaultJSExtensions: false,

    // Set the Base URL that files will be loaded from to /dist (instead of /app)
    baseURL: "/app",

    packages: {
        ".": {
            defaultExtension: "ts"
        }
    },

    // Tell it how to find our Angular dependencies
    map: {
        "angular": "../node_modules/angular/angular.js",
        "angular-animate": "../node_modules/angular-animate/angular-animate.js",
        "angular-aria": "../node_modules/angular-aria/angular-aria.js",
        "angular-material": "../node_modules/angular-material/angular-material.js",
        "angular-messages": "../node_modules/angular-messages/angular-messages.js",
        "angular-sanitize": "../node_modules/angular-sanitize/angular-sanitize.js",
        "parse": "../node_modules/parse/dist/parse.js",
        "angular-parse": "../node_modules/angular-parse/src/index.js",
        "angular-ui-router": "../node_modules/angular-ui-router/release/angular-ui-router.js",
        "angular-ui-validate": "../node_modules//angular-ui-validate/dist/validate.js",
        "angular-material-sidemenu": "../node_modules/angular-material-sidemenu/index.js",
        "angular-busy2": "../node_modules/angular-busy2/dist/angular-busy.js"
    },
    
    meta: {
        "angular": { format: "global" },
        "angular-animate": { format: "global" },
        "angular-aria": { format: "global" },
        "angular-material": { format: "global" },
        "angular-messages": { format: "global" },
        "angular-sanitize": { format: "global" }
    }
})
