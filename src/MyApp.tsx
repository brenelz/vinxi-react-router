import { createAssets, lazyRoute } from "@vinxi/react";
import { Route, Routes } from "react-router-dom";
import { getManifest } from "vinxi/manifest";
import fileRoutes from "vinxi/routes";
import { Suspense } from "react";
import "vinxi/client";

const Assets = createAssets(
    getManifest("client").handler,
    getManifest("client"),
);

const clientManifest = getManifest("client");
const serverManifest = getManifest("ssr");

const routes = fileRoutes.map((route) => {
    return {
        ...route,
        component: lazyRoute(route.$component, clientManifest, serverManifest),
    };
});

export default function MyApp() {
    return (
        <html>
            <head>
                <Suspense>
                    <Assets />
                </Suspense>
            </head>
            <body>
                <h1>Building a React Metaframework</h1>
                <div id="app">

                    <Suspense fallback="Loading...">
                        <Routes>
                            {routes.map(route => (
                                <Route key={route.path} path={route.path} element={
                                    <route.component />} />
                            ))}
                        </Routes>
                    </Suspense>
                </div>
            </body>
        </html>
    )
}