import MyApp from './MyApp';
import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { createAssets, lazyRoute } from '@vinxi/react';
import { getManifest } from 'vinxi/manifest';
import fileRoutes from 'vinxi/routes'
import "vinxi/client";
import { Suspense } from 'react';

const clientManifest = getManifest("client");
const serverManifest = getManifest("ssr");

const Assets = createAssets(
    getManifest("client").handler,
    getManifest("client"),
);

const routes = fileRoutes.map((route) => {
    return {
        ...route,
        component: lazyRoute(import.meta.env.DEV, import.meta.env.SSR, route.$component, clientManifest, serverManifest),
    };
});


hydrateRoot(document, <BrowserRouter>
    <Suspense>
        <MyApp assets={
            <Suspense>
                <Assets />
            </Suspense>
        } routes={routes} />
    </Suspense>
</BrowserRouter>);
