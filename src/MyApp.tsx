import { Route, Routes } from "react-router-dom";

export default function MyApp({ routes, assets }: any) {
    return (
        <html>
            <head>
                {assets}
            </head>
            <body>
                <h1>Building a React Metaframework</h1>
                <div id="app">
                    <Routes>
                        {routes.map(route => (
                            <Route key={route.path} path={route.path} element={<route.component />} />
                        ))}
                    </Routes>
                </div>
            </body>
        </html>
    )
}