/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// vite supports importing any asset as an url - in this case it is mandatory
// to use a named import and access the asset programatically for it to be included
// in the build (eg. set the img src attribute programatically) ...
import viteLogo from "../../img/vite.svg";

const
    // ...
    AssetImport = props => {
        const
            // extract props
            {nul} = props;

        // return component
        return <>
            {/* assets import */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> This site supports assets import as urls (powered by vite.js):
            </span>
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
        </>;
    };

export default AssetImport;