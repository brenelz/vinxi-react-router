import { Link } from "react-router-dom";
import Counter from "../Counter";
import { useEffect, useState } from "react";

async function loader(): Promise<string> {
    'use server';

    console.log('Access database');

    return new Promise((resolve) => {
        setTimeout(() => resolve('Hello from server'), 500)
    })
}

export default function Index() {
    const [loaderData, setLoaderData] = useState('')
    useEffect(() => {
        async function loadData() {
            setLoaderData(await loader());
        }
        loadData();
    }, []);

    return (
        <div >
            <h1>Index</h1>
            <Counter />
            <p>
                <Link to="/about">About page</Link>
            </p>
            <h1>Server Functions</h1>
            {loaderData}
        </div>
    );
}