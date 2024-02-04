/// <reference types="vinxi/types/server" />
import { eventHandler } from "vinxi/http";
import { renderToPipeableStream } from 'react-dom/server';
import MyApp from "./MyApp";
import { getManifest } from "vinxi/manifest";
import { StaticRouter } from 'react-router-dom/server';

export default eventHandler(async (event) => {
    const clientManifest = getManifest("client");

    const stream = await new Promise(async (resolve) => {
        const stream = renderToPipeableStream(
            <StaticRouter location={event.path}>
                <MyApp />
            </StaticRouter>,
            {
                onShellReady() {
                    resolve(stream);
                },
                bootstrapModules: [
                    clientManifest.inputs[clientManifest.handler].output.path
                ],
            },
        );
    });

    event.node.res.setHeader("Content-Type", "text/html");
    return stream;
})