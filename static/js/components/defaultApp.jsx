/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import modules
import {useState, useEffect, useRef} from "react";

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReact} from "@fortawesome/free-brands-svg-icons";

// import components
import ResourceFetching from "./resourceFetching.jsx";
import WebTokens from "./webTokens.jsx";
import FileUpload from "./fileUpload.jsx";
import AssetImport from "./assetImport.jsx";
import ModuleBundling from "./moduleBundling.jsx";

// import helpers
import {getContentAsync, getPepe} from "../helpers/helpers.js";

const
    // retrieve environment
    {VITE_SRV_ENTRYPOINT} = import.meta.env,
    // ...
    DefaultApp = props => {
        const
            // extract props
            {nul} = props,

            // lift all individual components states here
            // so they are updated in a single effect ..
            [ content, setContent ] = useState(null),
            [ protectedContent, setProtectedContent ] = useState(null),
            [ pepe, setPepe ] = useState(null),
            // use a ref to mimic some component's "own" property
            interval = useRef();

        // effect hook will be triggered after the DOM updates
        useEffect(() => {
            // update frequency : 2.5 seconds
            interval.current = setInterval(() => {
                // make synchronous calls and pass the state update functions
                getContentAsync(`${ VITE_SRV_ENTRYPOINT }/fetch/inline`, setContent);
                getContentAsync(`${ VITE_SRV_ENTRYPOINT }/protected`, setProtectedContent);
                setPepe(getPepe());
            }, 2.5e3);

            // returned function will execute at component unmount
            return () => clearInterval(interval.current);
        // trigger the effect after the first render only by passing empty deps
        }, []);

        // return component
        return <main>
            {/* title */}
            <span className="large">
                <FontAwesomeIcon icon={faReact} />
                &nbsp;Welcome to the home page&nbsp;
                <FontAwesomeIcon icon={faReact} />
            </span>
            <ResourceFetching content={content}/>
            <WebTokens protectedContent={protectedContent} />
            <FileUpload />
            <AssetImport />
            <ModuleBundling pepe={pepe} />
        </main>;
    };

export default DefaultApp;