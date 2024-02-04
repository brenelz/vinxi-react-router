import MyApp from './MyApp';
import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { lazyRoute } from '@vinxi/react';
import { getManifest } from 'vinxi/manifest';
import fileRoutes from 'vinxi/routes'

const clientManifest = getManifest("client");
const serverManifest = getManifest("ssr");


const routes = fileRoutes.map((route) => {
    return {
        ...route,
        component: lazyRoute(route.$component, clientManifest, serverManifest),
    };
});

hydrateRoot(document, <BrowserRouter><MyApp routes={routes} /></BrowserRouter>);