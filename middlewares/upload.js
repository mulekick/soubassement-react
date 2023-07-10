// import modules
import formidable from "formidable";
import config from "../config.js";

const
    // destructure config values
    {APP_UPLOAD_DIR} = config,
    // file upload middleware function
    // async I/O operation requires try...catch in express 4
    mupload = async(req, res, next) => {
        // form parsing cannot be assessed to be business agnostic, there's also fields
        // in the form that have to be processed according to business logic, that's why
        // I opted to keep the form processing inside a middleware over using a helper ...
        try {

            // rewrite handling of uploads following formidable 3xx breaking changes ...
            // also, the options.maxTotalFileSize exceeded error terminates connections
            // systematically when in dev mode and ONLY ON FIREFOX when in prod mode.
            await formidable({
                keepExtensions: true,
                allowEmptyFiles: false,
                // max upload size
                maxFileSize: 100 * 1024,
                // server upload directory
                uploadDir: APP_UPLOAD_DIR,
                // preserve original file name (existing files will be overwritten ...)
                filename: (n, e, p) => p.originalFilename
            })
                // parse request
                .parse(req);

            return res
                // send response
                .status(200)
                .redirect(`/`);

        } catch (err) {
            // delegate to error handling middleware
            return next(err);
        }
    };

export default mupload;