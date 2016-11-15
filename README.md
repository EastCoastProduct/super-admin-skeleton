# SUPERADMIN SKELETON

The repository contains simple superadmin startup application. The technology chosen for the application was React for user interfaces and Redux for state management. Development tool chosen to automate process was Webpack. Further development process is faster and doesn't require basic project setup and functionalities to be written from scratch.

1. [INSTALLATION](#installation)
2. [CONFIGURATION](#configuration)
    - [server.js](#serverjs)
    - [prod.js](#prodjs)
    - [webpack.config.js](#webpackconfigjs)
    - [webpack.prod.config.js](#webpackprodconfigjs)
    - [.babelrc](#babelrc)
    - [.eslintrc](#eslintrc)
3. [DEVELOPMENT](#development)
    - [package.json](#packagejson)
    - [webpack.config.js | webpack.prod.config.js](#webpackconfigjs--webpackprodconfigjs)
    - [src/index.tpl.html](#srcindextplhtml)
    - [src/store/index.js](#srcstoreindexjs)
4. [PRODUCTION](#production)
5. [STRUCTURE](#structure)
6. [MODULES](#modules)
    - [DevDependencies](#devdependencies)
    - [Dependencies](#dependencies)
7. [ROUTES](#routes)
8. [REACT / REDUX SETUP](#react--redux-setup)
9. [UTILS](#utils)
    - [createFormData.js](#createformdatajs)
    - [fetch.js](#fetchjs)
    - [parseErrors.js](#parseerrorsjs)
    - [validator.js](#validatorjs)
10. [LOCAL STORAGE](#local-storage)
11. [GENERIC FORM FUNCTIONALITY](#generic-form-functionality)
12. [STYLES](#styles)
13. [TESTS](#tests)
14. [ISSUES](#issues)


## INSTALLATION

Recommended way to run this project would be to pull [Skeleton](https://github.com/EastCoastProduct/skeleton) repository and follow instructions to setup local environment through Docker. Following those steps wouldn't require a user to make any manual steps to run this project.

This project can also be run as standalone but it depends on existing [API](https://github.com/EastCoastProduct/api-skeleton) to make requests. API should be pulled, installed and configured along with this repository or all requests should be replaced. API requests are held inside */src/actions* folder.

In case of standalone setup, machine needs to have installed:
* Node (version 6)
* npm (version 3)

Pull or download repo to local machine and run these commands from project's root directory:

    npm install
    npm run dev-start

Open browser on link [http://localhost:9000/login](http://localhost:9000/login).


## CONFIGURATION

### server.js
Contains development express server configuration which reads Webpack development configuration (*webpack.config.js*) and sets up a server running our single page application (SPA). This configuration also enables hot reloading by providing Webpack dev and hot middlewares. All configuration for hot reloading is held inside Webpack configuration. Files are held in memory and everytime file inside project structure gets changed browser will refresh and show the latest code.

### prod.js
Contains production express server configuration which serves production-ready *dist* folder in a local environment. This allows developers to test production-ready bundled code locally before deploying bundle. Of course, *dist* folder needs to be built before production server can be run.

### webpack.config.js
Webpack automates development process for us by bundling project files into single JS file. In the configuration, we define entry point of our application which is *src/index.js*. Also, we have to include hot middleware into our bundled project setting reload flag that would reload browser when needed.

Output folder in our case is *dist* folder. In this case, we won't have that folder locally created, it will be held inside memory and hot reloaded on every change.

Plugins section contains optimization plugin along with hot module replacement plugin needed for hot reloading feature. We also define HTML Webpack plugin which creates *index.html* file automatically based out of template file held in *src/index.tpl.html*. This is helpful for us to automatically add bundled script at the end of the body tag and allows us to hash those files like we do in production mode. The last plugin we use defines 2 global variables, one of which we use in our app as constants and one that notifies React and other modules that we are running this bundle in development mode. This enables PropTypes validation, hot reloading and some other features that are not needed in production mode.

List of loaders manipulates certain file types and does specific alterations on them. Most important ones are Babel and Eslint loader run on top of all our JS files that are included in a project. Babel transpiles our ES6 code into ES5 and enables it to work for older browsers that don't fully support ES6 features. Eslint checks out syntax and errors out defined by the *.eslintrc* configuration file. All other loaders are currently used to load our Font Awesome library and embed it in a project through JS and to add our base styles and normalize.css into head tag dynamically. This way we save HTTP requests prefetching fonts and styles from the server.

PostCss and node rules at the end are just there to allow prefixing of our default styles and fix PostCss issues with fs.

### webpack.prod.config.js
Production configuration is similar to development one. The difference is that our output file is going to be hashed so we can prevent file caching in production mode. Source maps are also different from development mode which is defined by *devtool* property.

There're few more plugins in production mode as we want to enable chunking of common files from other project files, lose the duplicate code, minimize our code and allow aggressive merging policy to get more optimized and minified file that we wouldn't in the case of development mode. In this case, one of our global variables we send is notifying React and other modules that we're running code in production mode so we can get rid of hot reloading and any other unnecessary checking and validation that we use in development mode.

Loaders are doing a similar job as in development mode. Some of the differences are that we don't use linting loader and we are minimizing default styles and adding them to the same style tag.

PostCss and node rules at the end are just there to allow prefixing of our default styles and fix PostCss issues with fs.

### .babelrc
This file holds configuration for Babel loader. We have presets defined to allow us to use modern ES6 syntax along with basic React best practices. As a last configuration point, we are defining React hot module replacement preset in case of development mode.

### .eslintrc
This file holds Eslint configuration which is based out of Airbnb configuration alongside with basic recommended Eslint and React configurations. We also define the usage of ES6 syntax and few of our own rules that don't comply with default configuration.


## DEVELOPMENT

To start further development process from this skeleton there are few manual steps that should be made before the start of development.

### package.json
Some data should be changed corresponding to your project. Generic information like *name*, *description*, *author* and *license* should probably be changed to information that closely describes a specific project. Global variables for Jest configuration can be changed if needed, but they don't really produce any value for tests.

### webpack.config.js | webpack.prod.config.js

    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify('http://192.168.50.4:3000'),
    }),

These lines define global variables that get passed to bundled project. We are passing *__API_URL__* as global variable which we use inside the application as Web and API constant. These constants are valid if the local setup has been done through [Skeleton](https://github.com/EastCoastProduct/skeleton), in any other case these global variables should be manually updated to corresponding ones.

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

This would bundle JS code in production mode following configuration defined in *webpack.prod.config.js* and create the *dist* folder. *Dist* folder contains production-ready files which can be deployed and served using the technology of choice. To test production ready code locally run:

    npm run prod

This serves production ready code from *dist* folder and allows it to be tested locally in the browser. Port is changed from 9000 to 9001 to allow development and production mode at the same time.


## STRUCTURE

    .
    ├── src                      # contains all JS React/Redux code
    │   ├── actions              # synchronous action creators and asynchronous actions
    │   ├── components           # reusable React components
    │   ├── constants            # actions, error messages and global app constants
    │   ├── containers           # connected React components, page components which are connected to React Router
    │   ├── reducers             # root reducer setup importing individual reducers
    │   ├── routes               # React Router setup
    │   ├── store                # store setup for development and production
    │   ├── styles               # default styles, mixins and style variables
    │   ├── utils                # reusable modules like validator, error parser...
    │   ├── index.js             # entry point for our React/Redux application
    │   ├── index.tpl.html       # template html from which html-webpack-plugin creates output html file including hashed JS files
    │   └── setupTests.js        # setup testing environment prior to executing tests
    ├── test                     # folder which contains Jest testing cache and coverage reports
    ├── .babelrc                 # babel configuration including ES6 syntax
    ├── .eslintrc                # eslint configuration based on airbnb setup
    ├── .git                     # git configuration file
    ├── .gitignore               # ignore setup for git
    ├── circle.yml               # Circle CI configuration file
    ├── docker-start.sh          # automated script that runs after Docker configuration
    ├── Dockerfile               # Docker configuration file
    ├── package.json             # module dependancy
    ├── prod.js                  # express server to test production-ready bundle
    ├── README.md                # Documentation
    ├── server.js                # express server for development setup including hot reloading
    ├── webpack.config.js        # webpack setup for development, used when running development
    └── webpack.prod.config.js   # webpack setup for production, used when building dist folder


## MODULES

Modules list is defined in *package.json*. Purpose of each module in project is listed:

### DevDependencies
* autoprefixer - parses CSS and adds vendor prefixes
* babel-core - Babel compiler core module
* babel-eslint - module allows linting of all valid Babel code
* babel-jest - Babel plugin for Jest
* babel-loader - Webpack loader for Babel allows code transpiling
* babel-preset-es2015 - preset to install all ES6 plugins
* babel-preset-react - preset to install all React plugins
* babel-preset-react-hmre - preset for React hot module replacement
* babel-preset-stage-0 - preset to install future and experimental plugins that polyfill potential JS language proposals
* connect-history-api-fallback - always serves *index.html* file from express without depending on manual route changes in URL
* css-loader - Webpack CSS loader, resolves imports and URL in CSS
* enzyme - testing utility for React, allows us to test components and it's functions
* eslint - linting utility for JS
* eslint-config-airbnb - Airbnb Eslint configuration
* eslint-loader - Webpack Eslint loader
* eslint-plugin-import - Airbnb's config dependency, supports ES6 import/export syntax
* eslint-plugin-jsx-a11y - Airbnb's config dependency, static analysis linter of JSX and accessibility with screen readers
* eslint-plugin-react - Airbnb's config dependency, provides React specific linting rules
* express - minimalistic Node framework used to serve files in development and allow hot reloading feature
* fetch-mock - library to mock fetch calls in testing environment
* file-api - library that mocks browser's File API for tests that run in node environment
* file-loader - Webpack file loader, constructs MD5 hash filename and emits files
* html-webpack-plugin - simplifies creation of *index.html* file through Webpack
* jest - JS testing framework, best tool to rest React/Redux applications
* postcss-js - PostCss library for CSS-in-JS default styles
* postcss-loader - Webpack PostCss loader
* react-addons-test-utils - package provides React TestUtils add-on, it is also dependency of Enzyme
* react-test-renderer - React package used for snapshot testing
* redux-mock-store - library to mock Redux store for test environment
* style-loader - Webpack style loader, adds CSS to DOM by injecting style tags
* url-loader - Webpack URL loader, returns Data URL if file is smaller than limit
* webpack - JS bundler for tasks automation
* webpack-dev-middleware - dev middleware for Webpack, arguments live bundle to a directory
* webpack-hot-middleware - Webpack hot reloading attached to express server

### Dependencies
* aphrodite - library to write inline styles
* babel-polyfill - provides polyfills for full ES6 environment
* es6-promise - provides Promise polyfill
* font-awesome - Font Awesome library, imported in project entry file and served by Webpack
* immutable - library which allows immutable persistent data collections
* normalize.css - library which collects cross-browser alternative to resets
* query-string - library that constructs query-string for GET requests
* react - JS framework for building user interfaces
* react-dom - React package, allows working with DOM, used to hook up React application to template DOM served by *index.html*
* react-redux - React bindings for Redux
* react-router - React routing library
* redux - persistent state management library
* redux-form - HOC wrapper for form components, allows basic form functionality and reduces boilerplate
* redux-immutablejs - provides integration between Immutable and Redux
* redux-thunk - Redux middleware which allows async actions
* store - localStorage wrapper for all browsers, simplifies writing to and reading from localStorage
* validator - provides data validation
* whatwg-fetch - provides polyfill for Fetch API


## ROUTES

All routes are configured inside *src/routes* folder. Routing inside the application is managed by React Router.

Routes | Container | Description | State data | Requests
------|-----------|-------------|------------|---------
/ | App -> Users | Paginated and filterable list of all users | users | **GET** /superAdmin/users?page&limit&confirmed&search
/user/:userId | App -> ViewUser | View user's profile data | user | **GET** /users/:userId
/user/:userId/edit | App -> EditUser | Edit user profile data | user | **GET** /users/:userId <br/> **POST** /users/:userId
/user | App -> CreateUser | Create user through email | none | **POST** /superAdmin/users
/login | Login | Login form | none | **POST** /authenticate
* | Page404 | Renders in case no other route was matched, shows information to user and offers links to go back to Home or Login | none | none
 | App | Parent component for the application that holds menu and allows user to logout | none | none


## REACT / REDUX SETUP

React on its own is just used to create components which represent user interface. React components are divided into two groups:
* *containers*
* *components*.

Main differences between them are reusability, state access, and route representation. Containers are components that are directly rendered by React Router which means they've been configured inside *routes* folder. Container components have access to state using *connect* decorator and they can dispatch synchronous and asynchronous actions. The only exception to this rule are components that are decorated by Redux Form decorator but they can only access part of the store dedicated to all forms. They also dispatch internal synchronous actions handled by Redux Form module. Simple components are considered reusable and they don't have direct access to the state. They can be wrapped by Redux Form decorator if they are form components, but they still get access to other parts of the state through props from the parent component.

Redux ecosystem is based on Flux proposition. Redux is used as state container and allows us to manage state through actions and reducers. State of the application is held inside the store. The configuration of store depends on our reducers which represent our state.

All reducers are held in *reducers* folder and each one of them represents part of state held under specific property in immutable Map. All reducers are combined in *index.js* file and we also add Redux Form reducer under *form* property name where all forms are held. This configuration returns immutable Map as root reducer to our store configuration. Because we are using immutable data we are importing *combineReducer* function from *redux-immutablejs* module instead of official React bindings for Redux (*react-redux* module).

Redux by design can only dispatch synchronous actions which is why we import *redux-thunk* module that allows us to dispatch asynchronous actions while making requests. Our store configuration is different depending on environment mode. In a case of the production mode we are creating store applying thunk middleware to allow async actions, but in a case of any other environment, we are also applying Redux DevTools extension and hot module replacement for reducers. Configured store is exported and used inside Provider which is the top component of our application provided by React bindings for Redux. Provider component makes state available to connect decorator which in the end passes parts of the state to our container components.

The last thing in the process is actions. Containers dispatch actions based on certain events in the ecosystem. Actions can be synchronous in which case action creator returns action object which is immediately dispatched to our store. Reducers that are listening to certain action will mutate current state and return a new state. All containers that are connected to that part of the state immediately get new state objects and render accordingly. We keep both types of actions in same files. Asynchronous actions have the ability to dispatch synchronous actions after a certain request has been done.

All actions have to be unique so we keep them in the same file as constants, *src/constants/actions*.


## UTILS

Folder contains shareable files that provide functionality on top of current React and Redux logic which is spread across all other folders:

### createFormData.js
A module that creates FormData object used in multipart API POST request and returns it. The function takes iterable as a parameter. Data in our app is immutable and it can be iterated to construct FormData object out of all values that our iterable contains.

### fetch.js
A module which exports Fetch API. We don't call Fetch API immediately from our actions because with every request there is a bunch of repeatable processes through which our request needs to go. That is why this module contains all reusable functionality and configuration. Prior to every request, we have *Authorization* header and usually *Content-Type* header to set. We merge those default headers with other options passed to the module. Upon every successful response we need to parse JSON data into readable objects and we need to check the status of our request. By specification, Fetch API Promises reject only in case of exceptions so we need to manually check the status of response and manually reject in case our API responded with the error. The last thing to check is when our Fetch API Promise gets rejected. In that case, we want to make sure that we redirect all 401 statuses back to Login page because the user doesn't have permissions to access our application.

### parseErrors.js
A module that parses additional error messages returned from API request. Our error response object will always have some generic message but in the case of POST request we can have additional errors contained per each parameter sent in POST request. For instance, we also have validation on API in the case of POST request where we send form values. Upon return, this module parses additional debugInfo data and assigns each field error. Because we use Redux Form to handle our form functionality we are using SubmissionError constructor to create those errors. This way our Redux Form knows exactly which error belongs to which input.

### validator.js
A module that holds multiple functions which validate certain data inside our forms and constructs error messages in case of invalid data. Essential for form validation and it should contain same logic as validation on API.


## LOCAL STORAGE

We hold some data permanently inside local storage. When a user successfully logs in or signs up into the application we store user object returned by API under *user* key. We also get JWT token returned by successful authentication process after login/signup which we store under the token key. With every request, we are obliged to send *Authorization* header which contains JWT token. This allows our API to authenticate a user and allow access to certain endpoints. This token has expiration duration after which it becomes invalid and user is expected to log in again. User object stored in local storage needs to be updated every time we do any update on the user object. This is a manual work that needs to be taken into consideration and keep the user in Redux store and local storage in sync. The only way to clear local storage from within the application is to log out from it which clears all the data stored in local storage.


## GENERIC FORM FUNCTIONALITY

All forms should follow predefined functionalities and flow described here. All forms fields should be called the same name as the name under which API expects POST parameters. This way we enable an easier flow of field values from components through asynchronous actions and making it easier to parse data before and after making the request. Each field can be validated and it's validation errors are displayed beneath given input. Those errors are shown only in a case that certain input is not active and it has been touched at some point. Form submission button is never disabled and allows users to click at any point enabling validation to take place and show errors without doing any request.

If forms are valid and the request has been made we should show appropriate spinners and disable submit button in the process. When we get the response from the API, spinners should disappear and the button should be enabled again. In a case of a successful request, we could optionally show success message which gets removed in case of form resubmission. In a case of failed request, we need to create Redux Form's SubmissionError object out of error object returned by a response. That object will construct generic error message that gets shown beneath form and is directly connected to the form as a whole and it also constructs error for each field in case API has created one. These errors get removed in the same way as validation errors do and generic form error disappears if form gets touched.


## STYLES

Styling is done using Aphrodite module. This is a library that allows writing styles with JS and style each component separately. Each style for each component is held in the same directory. Some reusable styles are held inside *src/styles* folder in mixins file. Also, we are holding all colors, fonts, sizes, etc. in variables file. From here we can import any of these variables and mixins to any of our component styling files and reuse same rules and definitions. Aphrodite inserts style tag in the head of HTML page asynchronously after HTML gets generated. This makes all CSS pseudo-elements workable and no bad JS fixes are needed.

To insert default styles like *normalize.css* and resets we need to use something other than Aphrodite. In this case, we have PostCss loader and some other modules (postcss-js, autoprefixer...) wrapped together to parse default styles that are held inside *src/styles* folder. We have configured to parse *default.base.styles.js* file to CSS and insert it along with *normalize.css* into style tag held inside head tag. All of this is configured through Webpack.


## TESTS

Testing is done using Jest framework. All tests are held in the same folder with files that are being tested. Tests should be named same as files that are tested with additional *test* keyword in the name. Due to inability to run Enzyme and snapshot tests in the same file we have to keep snapshot tests in a separate file and add additional *snapshot* keyword in the name of the file. A snapshot will be held in the same folder where snapshot test has been called inside the *__snapshot__* folder. If any module needs to be mocked there should be a folder named *__mocks__* created in the same folder. Then, when we call that module in the tests, we can mock it by using that mocked file stored in *__mocks__* folder. To run all tests run:

    npm run test

Coverage should be above 90% if possible. To create or update snapshots at any point run:

    npm run snapshots

Snapshot testing is manual work at first run. It should render components that need to be checked manually until considered valid. After all subsequent runs snapshot will not be created and our tests would be able to fail if something is changed in a component that renders different snapshot. In a case of updating snapshot, the same manual check is needed.


## ISSUES

Currently, we keep all issues in [Taiga](https://tree.taiga.io/project/bumblebee24-boilerplate-2/issues) (this will probably change in the future).
