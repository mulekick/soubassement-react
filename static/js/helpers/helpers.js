// vite supports client-side npm modules bundling ...
import pepe from "@mulekick/pepe-ascii";

const
    // use an async hook to make stateful logic code modular ...
    getContentAsync = async(route, hydrate) => {
        try {
            const
                // fetch a piece of content
                readable = await fetch(route, {method: `GET`});
            // parse response stream into a string, update state, render
            hydrate(await readable.text());
        } catch (e) {
            // let's throw
        }
    },
    // random number between 2 values
    rnd = (lb, ub) => lb + Math.round(Math.random() * (ub - lb)),
    // use an npm module client side
    getPepe = () => {
        const
            // all pepes
            pepes = Object.values(pepe);
        // return a random pepe
        return pepes.at(rnd(0, pepes.length - 1));
    };

export {getContentAsync, getPepe};