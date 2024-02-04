import { Link } from "react-router-dom";
import Counter from "../Counter";

export default function Index() {
    return (
        <div >
            <h1>Index</h1>
            <Counter />
            <p>
                <Link to="/about">About page</Link>
            </p>
        </div>
    );
}