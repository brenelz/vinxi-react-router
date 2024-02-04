/// <reference types="vinxi/types/server" />
import { eventHandler } from "vinxi/http";
import { renderToPipeableStream } from 'react-dom/server';
import MyApp from "./MyApp";
import { getManifest } from "vinxi/manifest";

import { lazyRoute, renderAsset } from "@vinxi/react";
import fileRoutes from "vinxi/routes";
import { StaticRouter } from 'react-router-dom/server';
import { Suspense } from "react";

export default eventHandler(async (event) => {
    const clientManifest = getManifest("client");
    const serverManifest = getManifest("ssr");

    const clientHandler = clientManifest.inputs[clientManifest.handler]
    const scriptSrc = clientHandler.output.path;

    const assets = await clientManifest.inputs[clientManifest.handler].assets()

    const routes = fileRoutes.map((route) => {
        return {
            ...route,
            component: lazyRoute(import.meta.env.DEV, import.meta.env.SSR, route.$component, clientManifest, serverManifest),
        };
    });

    const stream = await new Promise(async (resolve) => {
        const stream = renderToPipeableStream(
            <StaticRouter location={event.path}>
                <MyApp assets={<Suspense>{assets.map((m) => renderAsset(m))}</Suspense>} routes={routes} />
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