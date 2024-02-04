import { createApp } from "vinxi";
import path from 'path';
import { serverFunctions } from "@vinxi/server-functions/plugin";
import { MyFileSystemRouter } from "./src/router";

export default createApp({
    routers: [
        {
            name: "public",
            type: "static",
            dir: "./public",
        },
        {
            name: "ssr",
            type: "http",
            handler: "./src/entry-server.tsx",
            target: "server",
            middleware: "./src/middleware.ts",
            routes: (router, app) => {
                return new MyFileSystemRouter(
                    {
                        dir: path.join(__dirname, "src/routes"),
                        extensions: ["jsx", "js", "tsx", "ts"],
                    },
                    router,
                    app
                )
            }
        },
        {
            name: "client",
            type: "client",
            handler: "./src/entry-client.tsx",
            target: "browser",
            base: "/_build",
            routes: (router, app) => {
                return new MyFileSystemRouter(
                    {
                        dir: path.join(__dirname, "src/routes"),
                        extensions: ["jsx", "js", "tsx", "ts"],
                    },
                    router,
                    app
                )
            },
            plugins: () => [serverFunctions.client()],
        },
        serverFunctions.router(),
    ],
});