/* eslint-disable function-paren-newline */

// import modules
import React from "react";
// eslint-disable-next-line node/file-extension-in-import
import {createRoot} from "react-dom/client";

// import components
import DefaultApp from "./components/defaultApp.jsx";

// use the built-in vite functionalities to flat import scss files ...
import "../scss/main.scss";

// in this case, since we use the fontawesome react primitives, the
// fontawesome styles will compile into a dedicated <style> tag in the final build.

const
    // retrieve environment
    {BASE_URL, MODE, VITE_SHA_256_HASH, VITE_HOST, VITE_PORT} = import.meta.env;

// render app
createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <DefaultApp />
        </React.StrictMode>
    );

// eslint-disable-next-line node/prefer-global/console
console.log(`application running in ${ MODE } mode at ${ VITE_HOST }:${ VITE_PORT }${ BASE_URL }\nenvironment public hash: ${ VITE_SHA_256_HASH }`);