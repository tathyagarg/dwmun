import Contact from "../components/contact"
import '../styles/not_found.css'

export default function NotFound() {
    return <div className="not-found-parent">
        <div className="not-found-content">
            <h1>404</h1>
            <p>The page you are looking for could not be found. Please contact us if you think this is a mistake.</p>
        </div>
        <Contact></Contact>
    </div>
}