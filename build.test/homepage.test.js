/* eslint-disable node/no-unpublished-import, no-undef, node/no-process-env, no-shadow */

// import primitives
import process from "node:process";
import console from "node:console";
import {fork} from "node:child_process";
import {stat, rm} from "node:fs/promises";

// import modules
import puppeteer from "puppeteer";
import {getDocument, queries, waitFor} from "pptr-testing-library";
import config from "../config.js";

const
    // destructure config values
    {dirName, VITE_SRV_ENTRYPOINT, APP_HOST, APP_PORT, APP_UPLOAD_DIR} = config,
    // homepage url
    homepageUrl = `https://${ APP_HOST }:${ APP_PORT }`,
    // create abort controller
    controller = new AbortController(),
    // extract testing-library's puppeteer queries ...
    {getByText, getByTestId, getAllByAltText} = queries;

describe(`app integration tests suite`, () => {

    let [ browser, page, response, documentHandle ] = [ null, null, null, null ];

    // setup
    beforeAll(async() => {
        console.log(`starting app ...`);
        const
            // start app
            testapp = fork(`server.js`, {
                // submit to abort controller signal for termination
                signal: controller.signal,
                // not-so-obvious default option
                env: process.env,
                // use SIGTERM
                killSignal: `SIGTERM`,
                // mute app output
                stdio: `ignore`
            });

        testapp
            // termination handler
            .on(`error`, e => {
                console.error(`express server shut down: ${ e.message }\n${ controller.signal.reason }`);
            });

        // let's give the app one second to breathe ...
        await new Promise(r => { setTimeout(() => r(), 1e3); });

        console.log(`starting browser ...`);
        // start browser
        browser = await puppeteer.launch({
            // use new headless mode
            headless: `new`,
            // allow self-signed certificates
            args: [ `--ignore-certificate-errors` ]
        });
        page = await browser.newPage();
        // navigate to home page (all tests will run on a single page load) ...
        response = await page.goto(homepageUrl);
        documentHandle = await getDocument(page);
    });

    describe(`when navigating to the home page`, () => {

        // test response code
        it(`HTTP request should have returned a code 200`, () => {
            expect(response.status()).toBe(200);
        });
        // test /fetch/inline route
        it(`should display a random string of length 64`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByText(documentHandle, /[0-9a-f]{64}/ui));
        });

        // test button
        it(`should display a 'request token' button`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByText(documentHandle, `request a token`));
        });

        // test /protected route (no token)
        it(`should display an 'access to protected resources denied' message`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByText(documentHandle, `you are not allowed to access this resource 😬`));
        });

        // test file input
        it(`should display a 'browse for a file' button`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByTestId(documentHandle, `afile`));
        });

        // test button
        it(`should display an 'upload file' button`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByText(documentHandle, `upload file`));
        });

        // test vite logo
        it(`should display the vite.js logo`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getAllByAltText(documentHandle, `Vite logo`));
        });

        // test pepe
        it(`should display some pepe ASCII art`, async() => {
            // test for the required element to not throw ...
            await waitFor(() => getByTestId(documentHandle, `pepe`));
        });

    });

    describe(`when requesting a token`, () => {
        // test /protected route (with token)
        it(`should display an 'access to protected resources allowed' message`, async() => {
            // request a token ...
            await page.click(`#tokenplease`);
            // test for the required element to not throw ...
            await waitFor(() => getByText(documentHandle, `you now have access to protected resources 😎`));
        });
    });

    describe(`when uploading a file`, () => {
        // test /upload route
        it(`should upload the file to the server "${ APP_UPLOAD_DIR }" folder`, async() => {
            const
                // set upload endpoint location
                uploadEndpoint = `${ homepageUrl }${ VITE_SRV_ENTRYPOINT }/upload`,
                // retrieve an element handle to the file input element
                fileInput = await getByTestId(documentHandle, `afile`),
                // retrieve an element handle to the submit button
                submitButton = await getByText(documentHandle, `upload file`);

            // set file input value to some local file path
            await fileInput.uploadFile(`${ dirName }/README.md`);

            // submit the form
            await submitButton.click();

            // wait for the file upload POST request (tricky operator precedence situation)
            await page.waitForRequest(r => (r.url() === uploadEndpoint) && (r.method() === `POST`), {timeout: 1e3});

            // wait for 302 HTTP response and redirection
            await page.waitForResponse(r => (r.url() === uploadEndpoint) && (r.status() === 302), {timeout: 1e3});

            // stat uploaded file (will throw if file upload failed ...)
            await stat(`${ dirName }${ APP_UPLOAD_DIR }/README.md`);
        });
    });

    // teardown
    afterAll(async() => {
        // remove uploaded file
        await rm(`${ dirName }${ APP_UPLOAD_DIR }/README.md`, {force: true});
        // close browser
        console.log(`stopping browser ...`);
        await browser.close();
        // send abort signal to app
        console.log(`stopping app ...`);
        controller.abort(`tests are completed`);
    });

});