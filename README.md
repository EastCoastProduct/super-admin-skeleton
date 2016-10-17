# SUPERADMIN SKELETON

The repository contains simple superadmin startup application. The technology chosen for the application was React for user interfaces and Redux for state management. Development tool was chosen to automate process was Webpack. Further development process is faster and doesn't require basic project setup and functionalities to be written from scratch.


## INSTALLATION

Recommended way to run this project would be to pull [Skeleton](https://github.com/EastCoastProduct/skeleton) repository and follow instructions to setup local environment. Following those steps wouldn't require a user to make any manual steps to run this project.

This project can also be run as standalone but it depends on existing [API](https://github.com/EastCoastProduct/api-skeleton) to make requests. API should be pulled, installed and configured along with this repository or all requests should be replaced. API requests are held inside */src/actions* folder.

In case of standalone setup, machine needs to have installed:
* Node (we recommend latest stable node version 6)
* npm (version 3)

Pull or download repo to local machine and run these commands from project's root directory:

    npm install
    npm start

Open browser on link [http://localhost:7000/login](http://localhost:7000/login).


## CONFIGURATION

### server.js
Contains development express server configuration which reads Webpack development configuration (*webpack.config.js*) and sets up a server running our single page application (SPA). This configuration also enables hot reloading by providing Webpack dev and hot middlewares. All configuration for hot reloading is held inside Webpack configuration. Files are held in memory and everytime file inside project structure gets changed browser will refresh and show the latest code.

### prod.js
Contains production express server configuration which serves production-ready *dist* folder in local environment. This allows developers to test production-ready bundled code locally before deploying bundle. Of course, *dist* folder needs to be built before production server can be run.

### webpack.config.js
Webpack automates development process for us by bundling whole project files into single JS file. In the configuration, we define entry point of our application which is *src/index.js*. Also, we have to include hot middleware into our bundled project setting reload flag that would reload browser when needed.

Output folder in our case is *dist* folder. In this case, we won't have that folder locally created, it will be held inside memory and hot reloaded on every change.

Plugins section contains optimization plugin along with hot module replacement plugin needed for hot reloading feature. We also define HTML Webpack plugin which creates *index.html* file automatically based out of template file held in *src/index.tpl.html*. This is helpful for us to automatically add bundled script at the end of the body tag and allows us to hash those files like we do in production mode. The last plugin we use defines 3 global variables, 2 of which we use in our app as constants and one that notifies React and other modules that we are running this bundle in development mode. This enables PropTypes validation, hot reloading and some other features that are not needed in production mode.

List of loaders manipulates certain file types and does specific alterations on them. Most important ones are Babel and Eslint loader run on top of all our JS files that are included in a project. Babel transpiles our ES6 code into ES5 and enables it to work for older browsers that don't fully support ES6 features. Eslint checks out syntax and errors out defined by *.eslintrc* file. All other loaders are currently used just to load our Font Awesome library and embed it in a project through JS. This way we save one HTTP request prefetching fonts from the server.

### webpack.prod.config.js
Production configuration is similar to development one. The difference is that our output file is going to be hashed so we can prevent file caching in production mode. Source maps are also different from development mode which is defined by *devtool* property.

There're few more plugins in production mode as we want to enable chunking of common files from other project files, lose the duplicate code, minimize our code and allow aggressive merging policy to get more optimized and minified file that we wouldn't in the case of development mode. In this case, one of our global variables we send is notifying React and other modules that we're running code in production mode so we can get rid of hot reloading and any other unnecessary checking and validation that we use in development mode.

### .babelrc
This file holds configuration for Babel loader. We have presets defined to allow us to use modern ES6 syntax along with basic react best practices. We are using decorators which are an experimental ES7 plugin so it needs to be added manually. As a last configuration point, we are defining React hot module replacement preset in case of development mode.

### .eslintrc
This file holds Eslint configuration which is based out of Airbnb configuration alongside with basic recommended Eslint and React configurations. We also define the usage of ES6 syntax and few of our own rules that don't comply with default configuration.


## DEVELOPMENT

To start further development process from this skeleton there are few manual steps that should be made before the start of development.

### package.json
Some data should be changed corresponding to your project. Generic information like *name*, *description*, *author* and *license* should probably be changed to information that closely describes specific project.

### webpack.config.js | webpack.prod.config.js

    new webpack.DefinePlugin({
      __APP_URL__: JSON.stringify('http://192.168.50.4:7000'),
      __API_URL__: JSON.stringify('http://192.168.50.4:3000'),
    }),

These lines define global variables that get passed to bundled project. We are passing *__APP_URL__* and *__API_URL__* as global variables which we use inside the application as Web and API constants. These constants are valid if the local setup has been done through [Skeleton](https://github.com/EastCoastProduct/skeleton), in any other case these global variables should be manually updated to corresponding ones.

### src/index.tpl.html
Title inside template should be updated to the corresponding one instead of generic one. Favicon link doesn't exist with skeleton example which should probably be added manually.

### src/store/index.js
This file contains store configuration which also expects Redux DevTools to be installed:

    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

This setup expects [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension) to be installed in the browser. Follow instructions to install the extension which will be enabled immediately by this setup. Extensions are not supported by all browser but there is another [Redux DevTools](https://github.com/gaearon/redux-devtools) module that isn't part of extension which can be used in case another browser support is needed.


## PRODUCTION

To build your code in production mode run:

    npm run build

This would bundle JS code in production mode following configuration defined in *webpack.prod.config.js* and create the *dist* folder. Dist folder contains production-ready files which can be deployed and served using technology of choice. To test production ready code locally run:

    npm run prod

This serves production ready code from *dist* folder and allows it to be tested locally in browser.


## STRUCTURE

    .
    ├── src                      # contains all JS React/Redux code
    │   ├── containers           # connected React components, page components which are connected to React Router
    │   ├── reducers             # root reducer setup importing individual reducers
    │   ├── routes               # React Router setup
    │   ├── store                # store setup for development and production
    │   ├── index.js             # entry point for our React/Redux application
    │   └── index.tpl.html       # template html from which html-webpack-plugin creates output html file including hashed JS files
    ├── .babelrc                 # babel configuration including ES6 syntax
    ├── .eslintrc                # eslint configuration based on airbnb setup
    ├── .gitignore               # ignore setup for git
    ├── package.json             # module dependancy
    ├── prod.js                  # express server to test production-ready bundle
    ├── README.md                # Documentation
    ├── server.js                # express server for development setup including hot reloading
    ├── webpack.config.js        # webpack setup for development, used when running development
    └── webpack.prod.config.js   # webpack setup for production, used when building dist folder


## TEST

In development...


## ISSUES

Currently, we keep all issues in [Taiga](https://tree.taiga.io/project/bumblebee24-boilerplate-2/issues) (this will probably change in the future).
