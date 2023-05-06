/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// import helpers
import {getContentAsync} from "../helpers/helpers.js";

const
    // retrieve environment
    {VITE_SRV_ENTRYPOINT} = import.meta.env,
    // ...
    WebTokens = props => {
        const
            // extract props
            {protectedContent} = props,
            // retrieve token by triggering an async call and disarding return value
            tokenPlease = () => getContentAsync(`${ VITE_SRV_ENTRYPOINT }/protected/token`, () => null);

        // return component
        return <>
            {/* JWT delivery */ }
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> This site supports JSON web tokens:
                <button type="button" id="tokenplease" onClick={ tokenPlease } >request a token</button>
            </span>
            <span className="small">{protectedContent}</span>
        </>;
    };

export default WebTokens;