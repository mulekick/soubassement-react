# [soubassement-react](https://www.wordscope.com/soubassement+en+anglais.html)

Basic express use case that embarks all the necessary boilerplate stuff to support :

* File uploads and multipart form data handling (using <code>[formidable](https://github.com/node-formidable/formidable)</code>)
* Stateless client-side sessions management with <code>[JSON web tokens](https://jwt.io/)</code> (using <code>[jose](https://github.com/panva/jose)</code> and <code>[cookie-parser](https://www.npmjs.com/package/cookie-parser)</code>)
* Bundling code / dependencies into builds that target every TLSv1.2+ compatible browsers (using <code>[vite](https://vitejs.dev/)</code> and <code>[postcss](https://postcss.org/)</code>)
* Server-side business logic automated tests (using <code>[jest](https://jestjs.io/)</code>)
* Client-side UX/UI automated tests (using <code>[jest](https://jestjs.io/)</code>, <code>[testing-library](https://testing-library.com/)</code> and <code>[puppeteer](https://pptr.dev/)</code>)
* Server auto-restart on file changes during development (using <code>[nodemon](https://nodemon.io/)</code>)
* HMR and browser auto-reload on file change during development (using <code>[vite](https://vitejs.dev/)</code>)
* Declarative and component-based user interface development (using <code>[react](https://react.dev/)</code>)

## ⚛️ React support ⚛️

This project is a variation of the ["vanilla"](https://github.com/mulekick/soubassement) soubassement, the only difference being that the toolchain here includes support for JSX and react. It's actually a case of having done exactly [this](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework) even before the new framework-oriented react docs came out :

![This is a alt text.](https://i.imgur.com/Vk6XfpZ.png "The react team approves 😁")

## Why this

1. The idea is to create a full-stack development environment following these principles :

   ✅ Remain as simple and generic as possible by not doing any integration of any frontend or backend frameworks, websockets library, ORM modules etc ... by default (react being the only exception)

   ✅ Remain as simple and manageable as possible, noticeably by relying on a single package.json file

   ✅ Silo the back-end and frontend during development by having the vite dev server and the express server run in separate processes

2. This project guarantees a smooth and enjoyable development experience and can be used as a starting point in the event you want to do the integrations mentioned above by yourself in a controlled way instead of just typing "npx create-my-framework-app" in the terminal.

3. *In my opinion, basic understanding of how things work and interact with each other in a self-contained development solution is critical : your app may still be 95% functional if something in the business logic code breaks, but when something breaks in the boilerplate code or in the framework, your app instantly becomes 0% functional.*

4. Finally, you can be sure that all the dependencies included are the go-to modules of the ecosystem in their respective areas.

## Prerequisites
   - Linux distro or WLS2 (debian 11 recommended)
   - GNU Bash shell (version 5.1.4 recommended)
   - Openssl (version 1.1.1 recommended)
   - Node.js (version 18.14.2 recommended)
   
## Project scaffolding

1. Use the following commands to scaffold a new project using this repo :
```bash
# clone the repository using degit
npx degit https://github.com/mulekick/soubassement-react.git my-new-project
# cd into your project's directory
cd my-new-project
# install dependencies
npm install
```

2. Since everything is served over HTTPS, you'll have to create a key pair for the server _**(do not change the command arguments)**_ : 
    
    * **create a private key :**
    
    <code>openssl ecparam -param_enc named_curve -name prime256v1 -genkey -noout -outform PEM -out .server.key</code>
    
    * **create a self-signed certificate :**
    
    <code>openssl req -x509 -key .server.key -new -outform PEM -out .server.crt -verbose</code>
    
3. You can then copy/paste the contents of ```.server.key``` and ```.server.crt``` in the dotenv config file of your choice.

*Disclaimer : the point here is not to deliver a lecture on TLS best practices, so I assume you are comfortable enough to decide by yourself how you'll manage your key pairs - in the event you aren't, a dummy key pair is provided in the .env files so HTTPS works out of the box (in those circumstances, seek assistance on the matter prior to pushing anything in production)*

## Available commands

*for people familiar with vite, I stress that the vite project root here is ```/static``` instead of the default  ```/```. For others, it means that vite.js is only used to build the browser part of the code and not the code running in the express app, thus the below terminology of "source files", "build files" and "app files".*

- `npm run dev`
   - starts the app in development mode (vite.js serves the source files)
   - the vite.js dev server listens at ```https://${ VITE_HOST }:${ VITE_PORT }```
   - source files are served at ```/```
   - HMR and auto-reload are enabled, and vite.js proxies requests to the app's api
- `npm run build`
   - builds (transpiles, treeshakes and bundles) the source files using vite.js
- `npm run test`
   - runs all jest tests against the build files and the app files
- `npm run cover`
   - outputs the jest code coverage report for the build files and the app files
- `npm run prod`
   - starts the app in production mode (the app serves the build files)
   - the app listens at ```https://${ APP_HOST }:${ APP_PORT }```
   - build files are served at ```/```
- `npm run dockerize` *(only works if docker is installed)*
   - creates a docker image and packs the build and the app in it
   - starts an interactive container from the image with ```APP_PORT``` mapped to the corresponding host port 

All the ```VITE_*``` and ```APP_*``` environment variables can be configured in the dotenv config files.

## App file system

| path                         | comments                                                                                   |
|------------------------------|--------------------------------------------------------------------------------------------|
| ```/server.js```             | express.js app main file                                                                   |
| ```/config.js```             | express.js app config file                                                                 |
| ```/routes/routes.js```      | export a single router that will be mounted on ```/${ VITE_SRV_ENTRYPOINT }```             |
| ```/routes/*.js```           | export routers that you will import in ```routes.js```                                     |
| ```/middlewares/*.js```      | export middlewares that implement your business logic                                      |
| ```/middlewares/*.test.js``` | jest test units files for your business logic                                              |
| ```/helpers/*.js```          | export your business agnostic code                                                         |
| ```/static/*```              | statically served source files (development) ie. the react app implementing the frontend   |
| ```/build/*```               | statically served build files (production)                                                 |
| ```/build.test/*.test.js```  | jest + puppeteer test units files for your app's UX/UI build                               |
| ```/.env.files/.env.*```     | dotenv config files for environment and production                                         |
| ```/nodemon.json```          | nodemon config file                                                                        |
| ```/vite.config.js```        | vite.js config file (specifies rollup entrypoints for vite build)                          |
| ```/jest.config.json```      | jest config file (specifies transforms to apply to code before tests)                      |
| ```/babel.config.json```     | babel config file (preset-env config used by the babel-jest transform)                     |
| ```/.postcssrc.json```       | postcss config file (includes postcss plugins that will be leveraged by vite)              |
| ```/.browserslistrc```       | <code>[browserslist](https://browsersl.ist/)</code> file used by babel and autoprefixer    |

## Dependencies

| Module                                                                                                                | Usage                                             |
| --------------------------------------------------------------------------------------------------------------------  |---------------------------------------------------|
| <code>[@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)</code>             | fontawesome free icons package                    |
| <code>[@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)</code>     | core svg library for fontawesome                  |
| <code>[@fortawesome/free-brands-svg-icons](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons)</code>   | free fontawesome icons (brands family)            |
| <code>[@fortawesome/free-regular-svg-icons](https://www.npmjs.com/package/@fortawesome/free-regular-svg-icons)</code> | free fontawesome icons (regular family)           |
| <code>[@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)</code>     | free fontawesome icons (solid family)             |
| <code>[@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)</code>           | fontawesome 5 react component using svg with js   |
| <code>[@mulekick/pepe-ascii](https://www.npmjs.com/package/@mulekick/pepe-ascii)</code>                               | used as an example of client-side module bundling |
| <code>[cookie-parser](https://www.npmjs.com/package/cookie-parser)</code>                                             | parse cookies from HTTP requests header           |
| <code>[cors](https://www.npmjs.com/package/cors)</code>                                                               | serve or reject cross origin requests             |
| <code>[dotenv](https://www.npmjs.com/package/dotenv)</code>                                                           | load server environment variables                 |
| <code>[express](https://www.npmjs.com/package/express)</code>                                                         | node.js web server framework                      |
| <code>[formidable](https://www.npmjs.com/package/formidable)</code>                                                   | handle multipart data and file uploads            |
| <code>[helmet](https://www.npmjs.com/package/helmet)</code>                                                           | add security-related headers to HTTP responses    |
| <code>[jose](https://www.npmjs.com/package/jose)</code>                                                               | JSON web tokens javascript implementation         |
| <code>[morgan](https://www.npmjs.com/package/morgan)</code>                                                           | HTTP logger for express.js                        |
| <code>[react](https://www.npmjs.com/package/react)</code>                                                             | javascript library for creating user interfaces   |
| <code>[react-dom](https://www.npmjs.com/package/react-dom)</code>                                                     | react entry point to the DOM and server renderers |

## Dev dependencies
                        
| Module                                                                                                              | Usage                                                                |
| --------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| <code>[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)</code>                                   | required by babel-jest to compile the code before tests              |
| <code>[@mulekick/eslint-config-muleslint](https://www.npmjs.com/package/@mulekick/eslint-config-muleslint)</code>   | Mulekicks's base JS / Node ESLint configuration                      |
| <code>[@vitejs/plugin-legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy)</code>                           | enable legacy browsers support in vite.js builds                     |
| <code>[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)</code>                             | the all-in-one Vite plugin for React projects                        |
| <code>[autoprefixer](https://github.com/postcss/autoprefixer)</code>                                                | postcss plugin that adds vendor-specific prefixes to CSS rules       |
| <code>[babel-plugin-transform-import-meta](https://www.npmjs.com/package/babel-plugin-transform-import-meta)</code> | babel transforms import.meta into legacy code in node.js             |
| <code>[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)</code>                               | react specific linting rules for eslint                              |
| <code>[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)</code>                   | enforces the rules of hooks in react functions                       |
| <code>[jest](https://www.npmjs.com/package/jest)</code>                                                             | delightful javascript testing                                        |
| <code>[nodemon](https://www.npmjs.com/package/nodemon)</code>                                                       | watch server files and auto restart on file change                   |
| <code>[postcss](https://postcss.org/)</code>                                                                        | a tool for transforming CSS with JavaScript                          |
| <code>[pptr-testing-library](https://www.npmjs.com/package/pptr-testing-library)</code>                             | testing-library based querying functions for puppeteer               |
| <code>[puppeteer](https://www.npmjs.com/package/puppeteer)</code>                                                   | high-level API to control Chrome/Chromium over the DevTools Protocol |
| <code>[sass](https://www.npmjs.com/package/sass)</code>                                                             | auto-compile SCSS files to CSS in vite.js builds                     |
| <code>[terser](https://www.npmjs.com/package/terser)</code>                                                         | required for minification during the vite.js build process           |
| <code>[vite](https://www.npmjs.com/package/vite)</code>                                                             | next generation froontend tooling                                    |
| <code>[vite-plugin-webfont-dl](https://www.npmjs.com/package/vite-plugin-webfont-dl)</code>                         | extracts, downloads and injects fonts during the build               |
