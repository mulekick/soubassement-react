/* eslint-disable react/prop-types, react/react-in-jsx-scope */

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // retrieve environment
    {VITE_SRV_ENTRYPOINT} = import.meta.env,
    // ...
    FileUpload = props => {
        const
            // extract props
            {nul} = props;

        // return component
        return <>
            {/* file upload */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> This site supports file uploads (max size 100 kb):
            </span>
            {/* set form action for uploads */}
            <form encType="multipart/form-data" method="post" action={`${ VITE_SRV_ENTRYPOINT }/upload`}>
                <p><input type="file" name="afile" data-testid="afile" /></p>
                <input type="submit" value="upload file" />
            </form>
        </>;
    };

export default FileUpload;