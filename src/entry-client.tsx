import MyApp from './MyApp';
import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import "vinxi/client";


hydrateRoot(document, (
    <BrowserRouter>
        <MyApp />
    </BrowserRouter>
));
