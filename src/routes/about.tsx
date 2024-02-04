import { Link } from "react-router-dom";

export default function About() {
    return (
        <div >
            <h1>About</h1>
            <p>
                <Link to="/">Home page</Link>
            </p>
        </div>
    );
}