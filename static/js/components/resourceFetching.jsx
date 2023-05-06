/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // ...
    ResourceFetching = props => {
        const
            // extract props
            {content} = props;

        // return component
        return <>
            { /* fetching */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> This site supports resource fetching:
            </span>
            <span className="small">{content}</span>
        </>;
    };

export default ResourceFetching;