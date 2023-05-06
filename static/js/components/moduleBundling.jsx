/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFrog} from "@fortawesome/free-solid-svg-icons";

const
    // ...
    ModuleBundling = props => {
        const
            // extract props
            {pepe} = props;

        // return component
        return <>
            {/* client side npm module */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faFrog} /> This site supports client-side npm module bundling:
            </span>
            <a href="https://www.npmjs.com/package/@mulekick/pepe-ascii" target="_blank" rel="noreferrer">
                <textarea id="pepe" className="pepe" data-testid="pepe" defaultValue={pepe} />
            </a>
        </>;
    };

export default ModuleBundling;