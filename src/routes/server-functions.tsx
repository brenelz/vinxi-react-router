import { useState, useEffect } from 'react';

async function loader(): Promise<string> {
    'use server';

    console.log('Only on the server');

    return new Promise((resolve) => {
        setTimeout(() => resolve('Hello from server'), 500)
    })
}

export default function ServerFunctions() {
    const [loaderData, setLoaderData] = useState('')
    useEffect(() => {
        async function loadData() {
            setLoaderData(await loader());
        }
        loadData();
    }, []);
    return (
        <>
            <h1>Server Functions</h1>
            {loaderData}
        </>

    )
}