import logo from './logo.svg';
import Home from './pages/home';
import Committees from './pages/committees';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import Navbar from './components/navbar';

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route exact path="/dwmun" element={<Home/>}/>
                <Route path="/committees" element={<Committees/>}/>
            </Routes>
        </Router>
    )
}

export default App;
