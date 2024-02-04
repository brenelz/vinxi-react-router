
import { eventHandler } from "vinxi/http";
import { renderToPipeableStream } from 'react-dom/server';
import MyApp from "./MyApp";
import { getManifest } from "vinxi/manifest";

import { lazyRoute } from "@vinxi/react";
import fileRoutes from "vinxi/routes";
import { StaticRouter } from 'react-router-dom/server';

export default eventHandler(async (event) => {
    const clientManifest = getManifest("client");
    const serverManifest = getManifest("ssr");

    const clientHandler = clientManifest.inputs[clientManifest.handler]
    const scriptSrc = clientHandler.output.path;

    const routes = fileRoutes.map((route) => {
        return {
            ...route,
            component: lazyRoute(route.$component, clientManifest, serverManifest),
        };
    });

    const stream = await new Promise(async (resolve) => {
        const stream = renderToPipeableStream(
            <StaticRouter location={event.path}>
                <MyApp routes={routes} />
            </StaticRouter>,
            {
                onShellReady() {
                    resolve(stream);
                },
                bootstrapModules: [
                    scriptSrc
                ],
            },
        );
    });

    event.node.res.setHeader("Content-Type", "text/html");
    return stream;
})